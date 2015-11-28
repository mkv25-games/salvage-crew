var express = require('express');
var read = require('./read');
var handlebars = require('handlebars');

function host(options) {
    var options = options || {};
    var app = express();

    var port = options.port || 12020;

    app.get('/cards/event-contact', function(req, res) {
        console.log('Original URL', req.originalUrl);
        var templatePath = 'templates/' + req.originalUrl + '/index.hbs';
        read(templatePath).then(function(templateString) {
            var template = handlebars.compile(templateString.toString());
            var params = JSON.parse(req.headers['x-template-data']);
            var body = template(params);
            res.send(body)
            console.log('Rendered body', body);
        }).catch(function(ex) {
            console.error(ex);
        });
    });

    app.use('/templates', express.static(process.cwd() + '/templates'));

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