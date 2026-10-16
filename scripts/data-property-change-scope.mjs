import ts from "typescript";


export function getDataPropertyChangeScope(path, sourceText, changedLines) {
    const source = ts.createSourceFile(path, sourceText, ts.ScriptTarget.Latest, true);
    const originalLines = [...changedLines];
    const scope = new Set(changedLines);


    function visit(node) {
        if (ts.isFunctionLike(node) && node.body) {
            const firstLine = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
            const lastLine = source.getLineAndCharacterOfPosition(node.end).line + 1;
            if (originalLines.some((line) => line >= firstLine && line <= lastLine))
                for (let line = firstLine; line <= lastLine; line++)
                    scope.add(line);
        }

        ts.forEachChild(node, visit);
    }


    visit(source);
    return scope;
}
