var fs = require('fs');

function read(path) {
    return new Promise(function(accept, reject) {
        fs.readFile(path, function(err, data) {
            if (err) {
                reject(err);
            } else {
                accept(data);
            }
        });
    });
}

module.exports = read;