const {expect} = require('chai');
const stampit = require('@stamp/it');

function objEntries2Object(entries) {
  entries = (entries && entries.reduce instanceof Function) ? entries : [];
  return entries.reduce(function(prev,curr){prev[curr[0]]=curr[1];return prev;},{})
}

function objectifyProperties(obj, map) {
  map = map instanceof Function ? map : (e) => {return e};
  return objEntries2Object( Object.entries(obj).map(map) );
}

module.exports = {
  expectStrictStamp(stamp) {
    expect(stamp).to.be.a('function');
    var kvTMap = ([k,v]) => { return [k, typeof(v)] };
    expect(objectifyProperties(stamp, kvTMap)).to.include(objectifyProperties(stampit(), kvTMap)); // check for stamp's member and its type (native properties should not change)
  }
}
