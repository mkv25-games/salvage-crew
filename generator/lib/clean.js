var fs = require('fs-extra');

function cleanup() {
    return new Promise(function(accept, reject) {
        fs.remove('build/images', function(err) {
            if (err) {
                reject(err);
            } else {
                accept();
            }
        });
    });
}

module.exports = cleanup;