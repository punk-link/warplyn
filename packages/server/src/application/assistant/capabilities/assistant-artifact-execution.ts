import { EDITORIAL_ENGINE_ERROR } from "../../editorial/engine/editorial-engine-errors.js";
import { EditorialEngineError } from "../../editorial/engine/editorial-engine-error.js";


export class AssistantArtifactExecution {
    private call?: { key: string; result: Promise<unknown> };


    execute(capability: string, input: Readonly<Record<string, string>>, run: () => Promise<unknown>): Promise<unknown> {
        const key = JSON.stringify([capability, Object.entries(input).sort(([left], [right]) => left.localeCompare(right))]);
        if (this.call) {
            if (this.call.key !== key)
                throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT, EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT);

            return this.call.result;
        }

        const result = run();
        this.call = { key, result };
        return result;
    }
}
