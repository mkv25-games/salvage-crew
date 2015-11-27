var express = require('express');

function host(options) {
    var options = options || {};
    var app = express();

    var port = options.port || 12020;

    app.get('/', function(req, res) {
        res.send('Hello World!');
    });

    return new Promise(function(accept, reject) {
        var server = app.listen(port, function(err) {
            if (err) {
                reject(err)
            } else {
                var host = server.address().address;
                var port = server.address().port;

                var serverUrl = `http://localhost:${port}`;
                console.log(`Hosted app listening at ${serverUrl}`);
                accept(serverUrl);
            }
        });
    });
}

module.exports = host;