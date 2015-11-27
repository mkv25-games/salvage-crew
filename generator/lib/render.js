var webshot = require('webshot');

function render(sourceUrl, file, options) {
    return new Promise(function(accept, reject) {
        console.log(`Rendering ${sourceUrl} to ${file}`);

        webshot(sourceUrl, file, function(err) {
            if (err) {
                reject(err);
            } else {
                accept({
                    file: file,
                    sourceUrl: sourceUrl
                });
            }
        });
    });
}

module.exports = render;