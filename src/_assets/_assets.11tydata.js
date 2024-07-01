module.exports = {
    "eleventyExcludeFromCollections": true,
    permalink: function(data) {
        return `${data.page.filePathStem.replace("_assets", "assets")}.${data.page.outputFileExtension}`;
    }
}