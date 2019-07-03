const pugUrls = require("../webpack-stats.json");

module.exports = function (bundle) {
  var bundle = pugUrls.chunks[bundle][0].publicPath;
  return {bundlePath: bundle};
}
