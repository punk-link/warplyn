for (const languagePicker of document.querySelectorAll(".guide-languages")) {
    document.addEventListener("click", (event) => {
        if (!languagePicker.contains(event.target))
            languagePicker.open = false;
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && languagePicker.open) {
            languagePicker.open = false;
            languagePicker.querySelector("summary").focus();
        }
    });
}
