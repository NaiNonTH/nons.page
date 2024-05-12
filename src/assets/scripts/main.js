(function() {
    let preferences = localStorage.getItem("preferences");
    if (!preferences) return;
    
    preferences = JSON.parse(preferences);
    
    const html = document.documentElement;

    html.setAttribute("theme", preferences.theme || "broken-hoe");
    preferences.tritanopia && html.setAttribute("tritanopia", "");
})();