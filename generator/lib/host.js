var express = require('express');
var read = require('./read');
var handlebars = require('handlebars');

function host(options) {
    var options = options || {};
    var app = express();

    var port = options.port || 12020;

    app.use('/templates', express.static(process.cwd() + '/templates'));

    app.get('/*', function(req, res) {
        var templatePath = 'templates' + req.originalUrl + '/index.hbs';
        var templateData = extractDataFrom(req);

        read(templatePath)
            .then(stringify)
            .then(handlebars.compile)
            .then(function(template) {
                var body = template(templateData);
                res.send(body);
                console.log('Served', templatePath, 'with data', templateData);
            }).catch(function(ex) {
                console.error('Template unavailable', templatePath, ex);
                res.status(500).send('Template unavailable: ' + templatePath);
            });
    });

    function stringify(value) {
        return value.toString();
    }

    function extractDataFrom(request) {
        var stringData = request.headers['x-template-data'];
        return (stringData) ? JSON.parse(stringData) : {};
    }

    return new Promise(function(accept, reject) {
        var server = app.listen(port, function(err) {
            if (err) {
                reject(err)
            } else {
                var host = server.address().address;
                var port = server.address().port;

                var serverUrl = `http://localhost:${port}`;
                console.log(`Hosted app listening at ${serverUrl}`);
                global.renderServerUrl = serverUrl;
                accept(serverUrl);
            }
        });
    });
}

module.exports = host;