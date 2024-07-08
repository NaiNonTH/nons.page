const sass = require("sass");
const uglifyjs = require("uglify-js");
const htmlmin = require("html-minifier");
const mdImplicitFigures = require("markdown-it-image-figures");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const CleanCSS = require("clean-css");
const mdAnchor = require("markdown-it-anchor");
const { statSync } = require("fs");

function minifyjs(inputContent) {
    const minified = uglifyjs.minify(inputContent, {
        toplevel: true,
        mangle: {
            toplevel: true
        }
    });

    return minified;
}
function toDateString(dateFormat) {
    const months = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    const date = dateFormat.getDate();
    const dateSuffixes = ["st", "nd", "rd"];
    const dateSuffix =
        ([1, 2, 3].includes(date % 10)) &&
        (Math.trunc(date / 10) !== 1)
            ? dateSuffixes[(date % 10) - 1]
            : "th";

    return `${date}${dateSuffix} ${months[dateFormat.getMonth()]}, ${dateFormat.getFullYear()}`;
}

module.exports = function(config) {
    config.addPlugin(pluginRss);

    config.amendLibrary("md", (markdownIt) => markdownIt.use(mdAnchor, {
        level: 2,
        tabIndex: false,
        slugify: (text) => text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        permalink: mdAnchor.permalink.linkInsideHeader({
            symbol: "§",
        })
    }))
    config.amendLibrary("md", (markdownIt) => markdownIt.use(mdImplicitFigures, {
        figcaption: true,
        lazy: true,
        async: true
    }));

    config.addShortcode("lastModifiedDate", function(src) {
        const { mtime } = statSync(src);
        const dateString = toDateString(mtime);
        
        return `${dateString} (${mtime.getUTCHours().toString().padStart(2, "0")}:${mtime.getUTCMinutes().toString().padStart(2, "0")} UTC)`;
    });
    config.addFilter("cacheBust", function(url) {
        return url + `?t=${Date.now()}`;
    });
    config.addFilter("formatDateSlug", function(dateFormat) {
        return `${dateFormat.getFullYear()}-${dateFormat.getMonth().toString().padStart(2, "0")}-${dateFormat.getDate().toString().padStart(2, "0")}`
    });
    config.addFilter("formatDate", toDateString);

    config.addTemplateFormats("scss");
    config.addExtension("scss", {
        outputFileExtension: "css",
        compile: async function (_, inputPath) {
            if (inputPath.split("/").at(-1).startsWith("_")) return;

            const { css } = await sass.compileAsync(inputPath, { charset: "UTF-8" });

            return () => {
                return css;
            };
        }
    });

    config.addTemplateFormats("js");
    config.addExtension("js", {
        outputFileExtension: "js",
        compile: function (inputContent, inputPath) {
            if (inputPath.endsWith(".11tydata.js")) return;

            return () => {
                return minifyjs(inputContent).code;
            }
        }
    })

    config.addTransform("minify", function(content) {
        if (!this.page.outputPath) return content;

        const fileExtension = this.page.outputPath.split(".").pop();

        switch (fileExtension) {
            case "html":
            case "xml":
                {
                    let minified = htmlmin.minify(content, {
                        collapseWhitespace: true,
                        removeComments: true
                    })
        
                    return minified;
                }
            case "css":
                {
                    // Ignore the one that is a library. Fell into a pitfall because of not adding this bleh
                    if (this.page.inputPath.split("/").at(-1).startsWith("_")) 
                        return content;
                
                    const { styles } = new CleanCSS({
                            level: {
                                2: {
                                    all: true
                                }
                            },
                            compatibility: {
                                colors: {
                                    hexAlpha: true
                                }
                            }
                        }).minify(content);
                    
                    return styles;
                }
            case "js":
                return minifyjs(content).code;
            default:
                return content;
        }
    });

    config.addGlobalData("sitesLastModified", function () {
        return toDateString(new Date());
    });
    config.addGlobalData("myAge", function() {
        const now = new Date();
        const birthday = new Date("2005-03-21");

        return {
            age: new Date(now - birthday).getFullYear() - 1970,
            date: toDateString(now)
        };
    });

    config.addPassthroughCopy({ "src/_assets/images": "assets/images" });
    config.addPassthroughCopy("src/!(_assets)**?/**/**/*.{jpg,webp,svg,png,gif}");
    config.addPassthroughCopy("src/*.{jpg,webp,svg,png,gif}");

    return {
        dir: {
            input: "src",
            output: (process.env.ELEVENTY_RUN_MODE === "serve") ? "_dev" : "_site"
        }
    }
}