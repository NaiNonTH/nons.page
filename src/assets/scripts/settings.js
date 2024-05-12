(function() {
    let preferences = localStorage.getItem("preferences");
        preferences = preferences ? JSON.parse(preferences) : {};

    const html = document.documentElement;
    const tritanopia = document.getElementById("tritanopia-links");

    if (preferences.tritanopia) tritanopia.checked = true;
    
    tritanopia.onchange = () => {
        if (tritanopia.checked) {
            html.setAttribute("tritanopia", "")
            setPreference("tritanopia", true);
        }
        else {
            html.removeAttribute("tritanopia");
            setPreference("tritanopia", false);
        }
    };

    const themes = document.getElementsByName("themes");
    const currentTheme = preferences.theme || "broken-hoe";

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
            location.reload();
        }
    }
})();