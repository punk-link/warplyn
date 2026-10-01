import lightIcon from "./warplyn-light.svg";
import darkIcon from "./warplyn.svg";


export function WarplynIcon() {
    return <span aria-hidden="true" className="inline-block size-7 shrink-0">
        <img src={lightIcon} alt="" className="size-full dark:hidden" />
        <img src={darkIcon} alt="" className="hidden size-full dark:block" />
    </span>;
}
