/* config-overrides.js */
const path = require('path');

module.exports = function override(config, env) {
  config.entry = path.join(process.cwd(), 'src/microIndex.js');
  return config;
};
