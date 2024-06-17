const sass = require("sass");
const uglifyjs = require("uglify-js");
const htmlmin = require("html-minifier");
const mdImplicitFigures = require("markdown-it-image-figures");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const CleanCSS = require("clean-css");

function minifyjs(inputContent) {
    const minified = uglifyjs.minify(inputContent, {
        toplevel: true,
        mangle: {
            toplevel: true
        }
    });

    return minified;
}

module.exports = function(config) {
    config.addPlugin(pluginRss);

    config.amendLibrary("md", (markdownIt) => markdownIt.use(mdImplicitFigures, {
        figcaption: true,
        lazy: true,
        async: true
    }));

    config.addFilter("cacheBust", function(url) {
        return url + `?t=${Date.now()}`;
    })
    config.addFilter("formatDateSlug", function(dateFormat) {
        return `${dateFormat.getFullYear()}-${dateFormat.getMonth().toString().padStart(2, "0")}-${dateFormat.getDate().toString().padStart(2, "0")}`
    });
    config.addFilter("formatDate", function(dateFormat) {
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

        return `${date}${dateSuffix} ${months[dateFormat.getMonth()]}, ${dateFormat.getFullYear()}`
    });

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
        compile: function (inputContent) {
            return () => {
                return minifyjs(inputContent).code;
            }
        }
    })

    config.addTransform("htmlmin", function(content) {
        const fileExtension = this.page.outputPath || "";

        if (fileExtension.endsWith(".html") || fileExtension.endsWith(".xml")) {
            let minified = htmlmin.minify(content, {
                collapseWhitespace: true,
                removeComments: true
            })

            return minified;
        }
        else if (fileExtension.endsWith(".css")) {
            // Ignore the one that is a library. Fell into a pitfall because of not adding this bleh
            if (this.page.inputPath.split("/").at(-1).startsWith("_")) 
                return content;

            const { styles } = new CleanCSS({
                    level: 2,
                    compatibility: {
                        colors: {
                            hexAlpha: true
                        }
                    },
                }).minify(content);

            return styles;
        }
        else if (fileExtension.endsWith(".js")) {
            return minifyjs(content).code;
        }

        return content;
    });

    config.addPassthroughCopy("src/**/*.jpg");
    config.addPassthroughCopy("src/**/*.webp");
    config.addPassthroughCopy("src/**/*.svg");
    config.addPassthroughCopy("src/**/*.png");
    config.addPassthroughCopy("src/**/*.gif");

    return {
        dir: {
            input: "src",
            output: (process.env.SERVE_MODE === "true") ? "_dev" : "_site"
        }
    }
}