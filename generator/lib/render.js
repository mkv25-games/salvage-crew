var webshot = require('webshot');

function render(instruction) {
    return new Promise(function(accept, reject) {

        var file = 'build/' + instruction.asset.path;
        var serverUrl = global.renderServerUrl;
        var templateUrl = serverUrl + instruction.template.path;
        var template = instruction.template;
        var data = instruction.data;

        console.log(`Rendering ${templateUrl} to ${file}`);

        var webshotOptions = {
            screenSize: {
                width: template.size.width || 320,
                height: template.size.height || 480
            },
            shotSize: {
                width: template.size.width || 320,
                height: template.size.height || 480
            },
            customHeaders: {
                'x-template-data': JSON.stringify(data)
            },
            errorIfStatusIsNot200: true
        };

        webshot(templateUrl, file, webshotOptions, function(err) {
            if (err) {
                console.log('Webshot Error', err)
                reject(err);
            } else {
                accept(instruction);
            }
        });
    });
}

module.exports = render;