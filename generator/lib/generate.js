var find = require('./find');
var render = require('./render');

function generate() {
    var instructionsPath = __dirname + '/../instructions/*.json'
    find(instructionsPath)
        .then(loadFiles)
        .catch(function(ex) {
            console.error('An exception occurred', ex);
        });
}

function loadFiles(files) {
    var promises = files.map(function(file) {
        return loadInstructions(file);
    });

    return Promise.all(promises);
}

function loadInstructions(file) {
    var instructions = require(file);

    var promises = instructions.map(function(instruction) {
        return renderInstruction(instruction);
    });

    return Promise.all(promises);
}

function renderInstruction(instruction) {
    return render(instruction).then(function(result) {
        return instruction;
    });
}


module.exports = generate;