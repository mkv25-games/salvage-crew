var render = require('./render')

function generate(serverUrl) {
    var workList = {};

    var instructions = require(__dirname + '/../instructions/contacts.json');

    var promises = [];
    instructions.forEach(function(instruction) {
        var future = renderInstruction(workList, instruction, serverUrl);
        promises.push(future)
    });
    return Promise.all(promises);
}

function renderInstruction(workList, instruction, serverUrl) {

    var assetPath = 'build/' + instruction.asset.path;
    var templateUrl = serverUrl + instruction.template.path;

    return render(assetPath, templateUrl, instruction.template, instruction.data).then(function(result) {
        workList[result.file] = result.templateUrl;
    }).then(function() {
        return Promise.accept(workList);
    });
}


module.exports = generate;