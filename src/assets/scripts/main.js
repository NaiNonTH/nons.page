(function() {
    let preferences = localStorage.getItem("preferences");
    if (!preferences) return;
    
    const { theme, tritanopia } = JSON.parse(preferences);
    
    const html = document.documentElement;

    theme && html.setAttribute("theme", theme);
    tritanopia && html.setAttribute("tritanopia", "");
})();