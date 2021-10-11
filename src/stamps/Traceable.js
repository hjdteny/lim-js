const stampit = require('stampit');
const {Cache} = require('./index');

function registerAsChild(name) {
  this._childs.set(name, this);
  return this;
}

function getAllChilds() {
  return this._childs;
}

function TraceableFactory ({registry}) {
  var name = '_childs';
  var cache = registry;

  return Cache({name ,cache})
    .statics({ registerAsChild, getAllChilds });
}

/**
 * Traceable stamp create a parent stamp with static Prop called '_childs'
 * It also have static methods 'registerAsChild' and 'getAllChilds'
 *  method .registerAsChild(name) register any Stamp composed from this stamp into ._childs cache
 *  method .getAllChilds() return the ._childs cache
 * By default if registry is not specified, a new Map() will be used instead
 * It's responsibility for the child stamp to execute registerSelf after definition, so parent stamp can trace which child class has registered
 * @function Traceable
 */
var Traceable = stampit().init(TraceableFactory);

module.exports = Traceable;
