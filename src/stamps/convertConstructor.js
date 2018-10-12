
const stampit = require('@stamp/it');
const assign = Object.assign;

/**
 * Convert a class / constructor with inheritable prototype to an equivalent stamp
 * based on original utility function in previous version of stampit.
 * Source: https://github.com/stampit-org/stampit/blob/convert-constructor/src/convertConstructor.js
 * @param {Function} ctor
 * @returns {Function<Stamp>}
 */
function convertConstructor(ctor) {
  return stampit.compose({
    methods: assign({}, ctor.prototype),
    staticProperties: assign({}, ctor),
    configuration: { ctor },
    initializers: [
      (opts, {args, instance, stamp}) =>  // eslint-disable-line no-unused-vars
        stamp.compose.configuration.ctor.apply(instance, args)
    ]
  })
}

module.exports = convertConstructor;
