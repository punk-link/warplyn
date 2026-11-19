const steps = [
    [0, 5000, "demoWrite"],
    [1, 4400, "demoAsk", "request"],
    [2, 3000, "demoOpen", "open"],
    [3, 7500, "demoCompare", "review"],
    [3, 1250, "demoDecide", "accept"],
    [3, 1250, "demoDecide", "apply"],
    [3, 700, "demoDecide", "applied"],
    [4, 3000, "demoSaved", "saved"],
];
const confirmedPrefix = "✓ ";


function initializeRevisionDemo(demo, motion) {
    const scenes = [...demo.querySelectorAll("[data-revision-scene]")];
    const caption = demo.querySelector("[data-revision-caption]");
    const playback = demo.querySelector("[data-revision-playback]");
    const decisions = demo.querySelector(".revision-demo-decisions");
    const accept = decisions.querySelector("[data-demo-accept]");
    const apply = decisions.querySelector("[data-demo-apply]");
    const fallbackCaption = caption.textContent;
    const [pauseLabel, acceptLabel, applyLabel] = [playback, accept, apply].map((element) => element.textContent);
    const copy = Object.fromEntries([...demo.querySelectorAll("[data-demo-copy] [data-message]")]
        .map((element) => [element.dataset.message, element.textContent]));
    for (const key of new Set(steps.map(([, , message]) => message))) {
        const spacer = document.createElement("p");
        spacer.className = "revision-demo-caption-spacer";
        spacer.setAttribute("aria-hidden", "true");
        spacer.textContent = copy[key];
        caption.after(spacer);
    }

    let step = 0;
    let remaining = 0;
    let deadline = 0;
    let timer;


    function schedule() {
        demo.classList.remove("revision-demo-paused");
        playback.textContent = pauseLabel;
        deadline = performance.now() + remaining;
        timer = setTimeout(() => show((step + 1) % steps.length), remaining);
    }


    function show(index) {
        step = index;
        const [scene, duration, message, action = "write"] = steps[step];
        demo.dataset.revisionStep = action;
        scenes.forEach((element, position) => {
            element.hidden = position !== scene;
        });
        const accepted = action === "apply" || action === "applied";
        decisions.hidden = !["review", "accept", "apply", "applied"].includes(action);
        accept.textContent = accepted ? confirmedPrefix + acceptLabel : acceptLabel;
        apply.textContent = action === "applied" ? confirmedPrefix + copy.demoApplied : applyLabel;
        apply.classList.toggle("revision-demo-action-current", accepted);
        caption.textContent = copy[message];
        remaining = duration;
        schedule();
    }


    playback.addEventListener("click", () => {
        if (demo.classList.contains("revision-demo-paused")) {
            schedule();
        } else {
            clearTimeout(timer);
            demo.classList.add("revision-demo-paused");
            remaining = Math.max(0, deadline - performance.now());
            playback.textContent = copy.demoResume;
        }
    });

    const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting))
            return;

        observer.disconnect();
        playback.hidden = false;
        show(0);
    }, { threshold: 0.3 });


    function updateMotion() {
        clearTimeout(timer);
        delete demo.dataset.revisionStep;
        demo.classList.remove("revision-demo-paused");
        observer.disconnect();
        playback.hidden = true;
        decisions.hidden = true;
        scenes.forEach((element, index) => {
            element.hidden = index !== 3;
        });
        caption.textContent = fallbackCaption;
        if (!motion.matches)
            observer.observe(demo);
    }


    motion.addEventListener("change", updateMotion);
    updateMotion();
}


const demo = document.querySelector(".revision-demo");
if (demo && "IntersectionObserver" in window)
    initializeRevisionDemo(demo, matchMedia("(prefers-reduced-motion: reduce)"));
