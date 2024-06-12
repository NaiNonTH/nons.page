module.exports = {
    eleventyComputed: {
        date: (data) => {
            return data.page.fileSlug || "Created";
        }
    },
    tags: "updates",
    permalink: false
}