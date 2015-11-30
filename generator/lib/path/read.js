const fs = require('fs');
const pcall = require('./pcall');

module.exports = function(path) {
    return pcall(fs.readFile, path);
};