const {Writable} = require('stream') || require('readable-stream');
const convertConstructor = require('../convertConstructor');

module.exports = convertConstructor(Writable);
