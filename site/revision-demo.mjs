const steps = [
    [0, 5000, "Write in your own voice."],
    [1, 4400, "Ask for help with a passage.", "request"],
    [2, 3000, "Open the completed proposal.", "open"],
    [3, 7500, "Compare the proposed edit.", "review"],
    [3, 1250, "You decide what changes.", "accept"],
    [3, 1250, "You decide what changes.", "apply"],
    [3, 700, "You decide what changes.", "applied"],
    [4, 3000, "The accepted edit is now in your Article.", "saved"],
];


function initializeRevisionDemo(demo, motion) {
    const scenes = [...demo.querySelectorAll("[data-revision-scene]")];
    const caption = demo.querySelector("[data-revision-caption]");
    const playback = demo.querySelector("[data-revision-playback]");
    const decisions = demo.querySelector(".revision-demo-decisions");
    const accept = decisions.querySelector("[data-demo-accept]");
    const apply = decisions.querySelector("[data-demo-apply]");
    const fallbackCaption = caption.textContent;
    for (const copy of new Set(steps.map(([, , text]) => text))) {
        const spacer = document.createElement("p");
        spacer.className = "revision-demo-caption-spacer";
        spacer.setAttribute("aria-hidden", "true");
        spacer.textContent = copy;
        caption.after(spacer);
    }

    let step = 0;
    let remaining = 0;
    let deadline = 0;
    let timer;


    function schedule() {
        demo.classList.remove("revision-demo-paused");
        playback.textContent = "Pause";
        deadline = performance.now() + remaining;
        timer = setTimeout(() => show((step + 1) % steps.length), remaining);
    }


    function show(index) {
        step = index;
        const [scene, duration, copy, action = "write"] = steps[step];
        demo.dataset.revisionStep = action;
        scenes.forEach((element, position) => {
            element.hidden = position !== scene;
        });
        const accepted = action === "apply" || action === "applied";
        decisions.hidden = !["review", "accept", "apply", "applied"].includes(action);
        accept.textContent = accepted ? "✓ Accept" : "Accept";
        apply.textContent = action === "applied" ? "✓ Applied" : "Apply";
        apply.classList.toggle("revision-demo-action-current", accepted);
        caption.textContent = copy;
        remaining = duration;
        schedule();
    }


    playback.addEventListener("click", () => {
        if (playback.textContent === "Resume") {
            schedule();
        } else {
            clearTimeout(timer);
            demo.classList.add("revision-demo-paused");
            remaining = Math.max(0, deadline - performance.now());
            playback.textContent = "Resume";
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
