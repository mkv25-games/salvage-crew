const fs = require('fs-extra');
const pcall = require('./pcall');

module.exports = function(path) {
    return pcall(fs.remove, path);
};