module.exports = {
    eleventyComputed: {
        date: (data) => {
            const dateSlug = /^\d{4}-\d{2}-\d{2}$/;
            const { fileSlug } = data.page;

            return dateSlug.test(fileSlug) ? fileSlug : "Created";
        },
        isNotData: (data) => {
            return !data.page.fileSlug.includes("11tydata");
        }
    },
    tags: "updates",
    permalink: false
}