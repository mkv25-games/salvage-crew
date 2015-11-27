var render = require('./render')

function generate(serverUrl) {

    var options = {
        screenSize: {
            width: 320,
            height: 480
        },
        shotSize: {
            width: 320,
            height: 'all'
        }
    };

    var work = {};

    var sourceUrl = serverUrl;
    var file = 'build/hello-world.png';

    return render(sourceUrl, file, options).then(function(result) {
        work[result.file] = result.sourceUrl;
    }).then(function() {
        return Promise.accept(work);
    });
}


module.exports = generate;