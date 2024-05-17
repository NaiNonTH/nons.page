const sass = require("sass");
const uglifyjs = require("uglify-js");
const htmlmin = require("html-minifier");
const mdImplicitFigures = require("markdown-it-image-figures");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(config) {
	config.addPlugin(pluginRss);

    config.amendLibrary("md", (markdownIt) => markdownIt.use(mdImplicitFigures, {
        figcaption: true,
        lazy: true,
        async: true
    }));

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

            const result = await sass.compileAsync(inputPath, {
                "charset": "UTF-8",
                "style": "compressed"
            });

            return () => {
                return result.css;
            };
        }
    });

    config.addTemplateFormats("js");
    config.addExtension("js", {
        outputFileExtension: "js",
        compile: async function (inputContent) {
            const minified = uglifyjs.minify(inputContent, {
                toplevel: true,
                mangle: {
                    toplevel: true
                }
            });

            return () => {
                return minified.code;
            }
        }
    })

    config.addTransform("htmlmin", function(content) {
        if ((this.page.outputPath || "").endsWith(".html")) {
            let minified = htmlmin.minify(content, {
                collapseWhitespace: true,
                removeComments: true
            })
            
            return minified;
        }

        return content;
    })
    
    config.addPassthroughCopy("src/**/*.jpg");
    config.addPassthroughCopy("src/**/*.webp");
    config.addPassthroughCopy("src/**/*.svg");
    config.addPassthroughCopy("src/**/*.png");
    config.addPassthroughCopy("src/**/*.gif");

    return {
        dir: {
            input: "src"
        }
    }
}