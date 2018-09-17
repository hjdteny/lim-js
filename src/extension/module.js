// extension for nodejs 'module'
const yamljs = require('yamljs');

var _require = () => {
  // hook for yaml
  require.extensions['.yml'] = (module, filename) => {
    module.exports = yamljs.load(filename);
  }

  require.extensions['.yaml'] = (module, filename) => {
    module.exports = yamljs.load(filename);
  }

  // hook for hjson
  require('hjson/lib/require-config');
}


exports.require = _require;
