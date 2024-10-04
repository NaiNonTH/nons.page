(function() {
    let preferences = localStorage.getItem("preferences");
    if (!preferences) return;
    else preferences = JSON.parse(preferences);

    for (let props in preferences) {
        document.documentElement.setAttribute(props, preferences[props]);
    }
})();
(function() {
    const siteInfoTopic = {
        id: "Site ID",
        username: "Username",
        updates: "Updates",
        followers: "Followers",
        views: "Views",
        created_at: "Created",
        updated_at: "Last Updated"
    }
    const siteInfo = document.getElementById("site-info");
    const siteInfoBtn = document.getElementById("site-info-req");

    siteInfoBtn.addEventListener("click", () => {
        if (siteInfoBtn.dataset.clicked) return;

        siteInfoBtn.dataset.clicked = "true";

        const siteInfoContent = sessionStorage.getItem("site-info");

        if (siteInfoContent) {
            renderSiteInfoContent(JSON.parse(siteInfoContent));

            siteInfoBtn.innerText = "Site Info";
            siteInfoBtn.style.opacity = null;
        }
        else {
            siteInfoBtn.innerText = "Requesting...";
            siteInfoBtn.style.opacity = 0.3;

            fetch("https://nekoweb.org/api/site/info/non")
                .then((res) => res.json())
                .then((json) => {
                    renderSiteInfoContent(json);
                    sessionStorage.setItem("site-info", JSON.stringify(json));
                })
                .catch((err) => {
                    console.error(err);
                    siteInfo.insertAdjacentHTML("beforeend", `<tr><td><strong>There was an Error:</strong><br>${err}</td></tr>`);
                })
                .finally(() => {
                    siteInfoBtn.innerText = "Site Info";
                    siteInfoBtn.style.opacity = null;
                });
        }

        function renderSiteInfoContent(content) {
            for (const prop in content) {
                const topic = siteInfoTopic[prop];
    
                if (topic) {
                    let value = content[prop];
    
                    if (prop.endsWith("_at")) {
                        const date = new Date(value);
                        value = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`
                    }
    
                    siteInfo.insertAdjacentHTML("beforeend", `<tr><th>${topic}</th><td>${value}</td></tr>`);
                }
            }
        }
    });
})();