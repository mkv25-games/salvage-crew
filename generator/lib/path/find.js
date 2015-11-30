var glob = require('glob');
const pcall = require('./pcall');

module.exports = function(path) {
    return pcall(glob, path);
};