import { parse, TYPE, type MessageFormatElement } from "@formatjs/icu-messageformat-parser";
import { messages, type MessageId } from "./messages.js";


export function validateCatalog(catalog: Record<string, string>): asserts catalog is Record<MessageId, string> {
    const expected = Object.keys(messages).sort();
    const actual = Object.keys(catalog).sort();
    if (expected.join("\n") !== actual.join("\n"))
        throw new Error("Locale catalog must contain exactly the canonical message IDs.");

    for (const [id, message] of Object.entries(messages)) {
        const expectedArguments = getArguments(parse(message));
        const actualArguments = getArguments(parse(catalog[id]));
        if (expectedArguments !== actualArguments)
            throw new Error(`Locale message ${id} must preserve ICU arguments and rich-text tags.`);
    }
}


function getArguments(elements: MessageFormatElement[]): string {
    const argumentsUsed = new Set<string>();


    function collect(nodes: MessageFormatElement[]): void {
        for (const node of nodes) {
            if (node.type === TYPE.literal || node.type === TYPE.pound)
                continue;

            argumentsUsed.add(`${node.type}:${node.value}`);
            if (node.type === TYPE.tag)
                collect(node.children);

            if (node.type === TYPE.plural || node.type === TYPE.select)
                for (const option of Object.values(node.options))
                    collect(option.value);
        }
    }


    collect(elements);
    return [...argumentsUsed].sort().join("\n");
}
