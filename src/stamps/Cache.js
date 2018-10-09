const stampit = require('@stamp/it');

var CacheFactory = ({name, cache}) => {
  let statics = {};
  statics[name] = cache;
  return stampit().statics(statics);
}

/**
 * Cache stamp factory that creates a stamp with its own individual cache in staticProperties
 * name = name of the cache, defaulted to '_cache' if not provided
 * cache = actual buffer for the cache
 * @function CachingFunction
 * @param { name: String, cache: Map || *}
 */
var Cache = stampit()
  .init( ({name, cache}) => {
    name = (typeof(name) === 'string' && name) ? name : '_cache';    // accept non-empty string name, else default to '_cache'
    cache = (cache && cache.get instanceof Function && cache.set instanceof Function) ? cache : new Map();    // accept any cache with get and set method, else default to a new Map()
    return CacheFactory({name, cache});
  });

module.exports = Cache;
