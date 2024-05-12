(function() {
    let preferences = localStorage.getItem("preferences");
    if (!preferences) return;
    else preferences = JSON.parse(preferences);

    for (let props in preferences) {
        document.documentElement.setAttribute(props, preferences[props]);
    }
})();