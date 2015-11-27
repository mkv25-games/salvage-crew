var webshot = require('webshot');
var express = require('express');

// Start server
function host() {
  var app = express();

  app.get('/', function (req, res) {
    res.send('Hello World!');
  });

  return new Promise(function(accept, reject) {
    var server = app.listen(12020, function (err) {
      if(err) {
        reject(err)
      }
      else {
        var host = server.address().address;
        var port = server.address().port;

        var serverUrl = `http://localhost:${port}`;
        console.log(`Example app listening at ${serverUrl}`);
        accept(serverUrl);
      }
    });
  });
}

// Generate screenshot
function generate(serverUrl) {

  var options = {
    screenSize: {
      width: 320, height: 480
    }, shotSize: {
      width: 320, height: 'all'
    }
  };

  return new Promise(function(accept, reject) {
    var file = 'hello-world.png';
    webshot(serverUrl, file, options, function(err) {
      console.log('I made it here');
      if(err) {
        reject(err);
      }
      else {
        accept(file);
      }
    });
  });
}

// Start
host().then(generate).then(function() {
  console.log('Completed work OK');
  process.exit(0);
}).catch(function(ex) {
  console.log(ex);
  console.log('Failed to complete work');
  process.exit(1);
});
