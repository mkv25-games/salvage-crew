var fs = require('fs-extra');

function cleanup(path) {
    return new Promise(function(accept, reject) {
        fs.remove(path, function(err) {
            if (err) {
                reject(err);
            } else {
                accept();
            }
        });
    });
}

module.exports = cleanup;