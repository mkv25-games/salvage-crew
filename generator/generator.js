var clean = require('./lib/clean');
var host = require('./lib/host');
var generate = require('./lib/generate');

clean()
    .then(host)
    .then(generate)
    .then(reportSuccess)
    .catch(reportFailiure);

function reportSuccess() {
    console.log('Completed work OK');
    //process.exit(0);
}

function reportFailiure(ex) {
    console.log(ex);
    console.log('Stacktrace', ex.stack);
    console.log('Failed to complete work');
    //process.exit(1);
}
