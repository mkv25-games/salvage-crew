var webshot = require('webshot');

function render(file, templateUrl, template, data) {
    return new Promise(function(accept, reject) {
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
                accept({
                    file: file,
                    templateUrl: templateUrl
                });
            }
        });
    });
}

module.exports = render;