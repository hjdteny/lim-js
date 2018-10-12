const {Readable} = require('stream') || require('readable-stream');
const convertConstructor = require('../convertConstructor');

module.exports = convertConstructor(Readable);
