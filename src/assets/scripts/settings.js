(function() {
    let preferences = localStorage.getItem("preferences");
        preferences = preferences ? JSON.parse(preferences) : {};

    const html = document.documentElement;

    const themes = document.getElementsByName("themes");
    const currentTheme = 
        preferences.theme || (
            window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "bedtime"
            : "broken-hoe"
        );

    themes.forEach((theme) => {
        if (currentTheme === theme.value) {
            theme.checked = true;
        }

        theme.addEventListener("change", () => {
            html.setAttribute("theme", theme.value);
            setPreference("theme", theme.value);
        })
    });

    function setPreference(name, value) {
        preferences[name] = value;
        localStorage.setItem("preferences", JSON.stringify(preferences));
    }

    const resetBtn = document.getElementById("reset");
    resetBtn.onclick = () => {
        const confirm = window.confirm('Are you sure to Reset "ALL" of your preferences?');

        if (confirm) {
            localStorage.removeItem("preferences");
            resetBtn.innerText = "Resetting...";
            resetBtn.disabled = true;
            html.style.cursor = "progress";
            location.reload();
        }
    }
})();