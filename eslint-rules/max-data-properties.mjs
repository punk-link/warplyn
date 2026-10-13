import ts from "typescript";


export default {
    meta: {
        type: "suggestion",
        docs: {
            description: "Keep data shapes below 10 properties, including inherited and intersected properties.",
        },
        messages: {
            tooMany: "This data shape has {{count}} properties; keep it below 10 by splitting coherent domain responsibilities. Generic wrapper objects do not satisfy this rule.",
        },
        schema: [],
    },

    create(context) {
        const services = context.sourceCode.parserServices;
        if (!services.program)
            throw new Error("max-data-properties requires TypeScript parserOptions.projectService or project.");

        const checker = services.program.getTypeChecker();
        const dataFlags = ts.SymbolFlags.Property | ts.SymbolFlags.GetAccessor | ts.SymbolFlags.SetAccessor;


        function propertyCount(type) {
            if (checker.isArrayType(type) || checker.isTupleType(type))
                return 0;

            if (type.isUnion())
                return Math.max(0, ...type.types.map(propertyCount));

            return checker.getPropertiesOfType(type).filter((property) => (property.flags & dataFlags) !== 0).length;
        }


        function report(node, count) {
            if (count >= 10)
                context.report({ node, messageId: "tooMany", data: { count } });
        }


        function check(node) {
            const declaration = services.esTreeNodeToTSNodeMap.get(node);
            report(node, propertyCount(checker.getTypeAtLocation(declaration)));
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
