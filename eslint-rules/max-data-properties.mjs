import ts from "typescript";


const propertyLimit = 20;


export default {
    meta: {
        type: "suggestion",
        docs: {
            description: "Limit structured objects to 20 data properties, including inherited, intersected, and spread properties.",
        },
        messages: {
            tooMany: "This data shape has {{count}} properties; keep it at 20 or fewer by splitting coherent domain responsibilities.",
        },
        schema: [],
    },

    create(context) {
        const services = context.sourceCode.parserServices;
        if (!services.program)
            throw new Error("max-data-properties requires TypeScript parserOptions.projectService or project.");

        const checker = services.program.getTypeChecker();
        const dataFlags = ts.SymbolFlags.Property | ts.SymbolFlags.GetAccessor | ts.SymbolFlags.SetAccessor;


        function isLookupTable(type) {
            if (!type)
                return false;

            if (checker.getIndexInfosOfType(type).length > 0)
                return true;

            const declaration = type.declaration ?? type.target?.declaration;
            if (!declaration || !ts.isMappedTypeNode(declaration) || !declaration.type)
                return false;

            if (!ts.isIndexedAccessTypeNode(declaration.type))
                return true;

            return type.aliasTypeArguments?.some(isLookupTable) ?? false;
        }


        function isDataProperty(property) {
            if ((property.flags & dataFlags) === 0)
                return false;

            const value = checker.getNonNullableType(checker.getTypeOfSymbol(property));
            return value.getCallSignatures().length === 0;
        }


        function propertyCount(type) {
            if (checker.isArrayType(type) || checker.isTupleType(type))
                return 0;

            if (type.isUnion())
                return Math.max(0, ...type.types.map(propertyCount));

            return checker.getPropertiesOfType(type).filter(isDataProperty).length;
        }


        function report(node, count) {
            if (count > propertyLimit)
                context.report({ node, messageId: "tooMany", data: { count } });
        }


        function check(node) {
            const declaration = services.esTreeNodeToTSNodeMap.get(node);
            const type = checker.getTypeAtLocation(declaration);
            if (!isLookupTable(type))
                report(node, propertyCount(type));
        }


        function checkObject(node) {
            const expression = services.esTreeNodeToTSNodeMap.get(node);
            if (!isLookupTable(checker.getContextualType(expression)))
                check(node);
        }


        function checkClass(node) {
            const declaration = services.esTreeNodeToTSNodeMap.get(node);
            const type = checker.getTypeAtLocation(declaration);
            const instanceType = checker.getDeclaredTypeOfSymbol(type.symbol);
            const staticType = checker.getTypeOfSymbolAtLocation(type.symbol, declaration);
            const staticCount = propertyCount(staticType) - Number(!!staticType.getProperty("prototype"));
            report(node, propertyCount(instanceType) + staticCount);
        }


        return {
            ObjectExpression: checkObject,
            TSInterfaceDeclaration: check,
            TSTypeLiteral: check,
            TSTypeAliasDeclaration(node) {
                if (node.typeAnnotation.type !== "TSTypeLiteral")
                    check(node);
            },
            ClassDeclaration: checkClass,
            ClassExpression: checkClass,
        };
    },
};
