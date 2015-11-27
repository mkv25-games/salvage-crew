var clean = require('./lib/clean');
var host = require('./lib/host');
var generate = require('./lib/generate');

// Clean up

// Start server

// Generate screenshot


// Start
clean()
    .then(host)
    .then(generate).then(function() {
        console.log('Completed work OK');
        process.exit(0);
    }).catch(function(ex) {
        console.log(ex);
        console.log('Failed to complete work');
        process.exit(1);
    });