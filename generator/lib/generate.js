var render = require('./render')

function generate(serverUrl) {
    var work = {};

    var templateName = 'helloworld';
    var template = {
        name: templateName,
        path: '/templates/helloworld/index.html',
        size: {
            width: 320,
            height: 480
        }
    }
    var file = 'build/' + template.name + '.png';
    var sourceUrl = serverUrl + template.path;


    var options = {
        screenSize: {
            width: template.size.width || 320,
            height: template.size.height || 480
        },
        shotSize: {
            width: template.size.width || 320,
            height: template.size.height || 480
        }
    };

    return render(sourceUrl, file, options).then(function(result) {
        work[result.file] = result.sourceUrl;
    }).then(function() {
        return Promise.accept(work);
    });
}


module.exports = generate;