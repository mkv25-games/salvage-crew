var express = require('express');
var read = require('./read');
var handlebars = require('handlebars');

var requestCache = {};

function host(options) {
    var options = options || {};
    var app = express();

    var port = options.port || 12020;

    app.get('/', renderIndex);
    app.use('/*', checkCache);
    app.get('/*', renderTemplate);

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

function renderIndex(req, res) {
    var urls = Object.keys(requestCache);
    renderTemplateHelper(req, res, false, 'templates/html/index.hbs', {
        title: 'Rendered Pages',
        urls: urls
    });
}

function checkCache(req, res, next) {
    var key = req.originalUrl;
    var existingRequest = requestCache[key];
    if (existingRequest) {
        console.log('Served', key, 'from cache');
        res.send(existingRequest);
    } else {
        next();
    }
}

function storeInCache(key, value) {
    requestCache[key] = value;
    console.log('Registered', global.renderServerUrl + key, ' as cached endpoint');
}

function renderTemplate(req, res) {
    var requestUrl = req.originalUrl;
    var templatePath = 'templates' + requestUrl + '/index.hbs';
    var templateData = extractDataFrom(req);
    var key = requestUrl + '/' + createKeyFrom(templateData);

    var existingRequest = requestCache[key];
    if (existingRequest) {
        res.send(existingRequest);
    } else {
        renderTemplateHelper(req, res, key, templatePath, templateData)
    };
}

function renderTemplateHelper(req, res, key, templatePath, templateData) {
    return read(templatePath)
        .then(stringify)
        .then(handlebars.compile)
        .then(function(template) {
            var body = template(templateData);
            res.send(body);
            console.log('Served', templatePath, 'with data', templateData);

            if (key) {
                storeInCache(key, body);
            }
        }).catch(function(ex) {
            console.error('Template unavailable', templatePath, ex);
            res.status(500).send('Template unavailable: ' + templatePath);
        });
}

function stringify(value) {
    return value.toString();
}

function extractDataFrom(request) {
    var stringData = request.headers['x-template-data'];
    return (stringData) ? JSON.parse(stringData) : {};
}

function createKeyFrom(data) {
    return sanitize(data.title || data.name || 'default');
}

function sanitize(string) {
    return string
        .replace(/\s/g, '-')
        .replace(/[^A-z0-9-]/g, '')
        .toLowerCase();
}

module.exports = host;