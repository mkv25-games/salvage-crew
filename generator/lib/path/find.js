var glob = require('glob');

function find(path) {
    return new Promise(function(accept, reject) {
        glob(path, function(err, files) {
            if (err) {
                reject(err);
            } else {
                accept(files);
            }
        });
    });
}

module.exports = find;