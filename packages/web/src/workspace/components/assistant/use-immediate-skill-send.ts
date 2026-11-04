import { useEffect } from "react";


export function useImmediateSkillSend(requested: boolean, setRequested: (value: boolean) => void, send: () => void) {
    useEffect(() => {
        if (!requested)
            return;

        setRequested(false);
        send();
    }, [requested, setRequested, send]);
}
