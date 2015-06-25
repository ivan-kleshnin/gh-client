import Path from "path";
import {assoc, map, reduce, merge} from "ramda";
import Webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import {Base64} from "js-base64";
import Config from "config";

// INITIAL DATA ====================================================================================
let nodeModulesDir = Path.join(__dirname, "node_modules");
let sharedDir = Path.join(__dirname, "shared");
let frontendDir = Path.join(__dirname, "frontend");
let backendDir = Path.join(__dirname, "backend");
let publicDir = Path.join(__dirname, "public");

// Paths to minified library distributions relative to the root node_modules
let minifiedDeps = [
  "moment/min/moment.min.js",
];

let define = {
  "process.env": JSON.stringify({
    "NODE_ENV": process.env.NODE_ENV
  }),
  "config": JSON.stringify({}),
};

if (Config.has("api-user-name") && Config.has("api-user-pass")) {
  define = merge(define, {
    "config": JSON.stringify({
      "api-auth": "Basic " + Base64.encode(Config.get("api-user-name") + ":" + Config.get("api-user-pass")),
    })
  });
}

// CONFIG ==========================================================================================
export default {
  // Compilation target http://webpack.github.io/docs/configuration.html#target
  target: "web",

  // Entry files http://webpack.github.io/docs/configuration.html#entry
  entry: {
    bundle: "./frontend/app",

    vendors: ["react", "react-router"],
  },

  // Output files http://webpack.github.io/docs/configuration.html#output
  output: {
    // Abs. path to output directory http://webpack.github.io/docs/configuration.html#output-path
    path: publicDir,

    // Filename of an entry chunk http://webpack.github.io/docs/configuration.html#output-filename
    filename: "[name].js",

    // Web path (used to prefix URLs) http://webpack.github.io/docs/configuration.html#output-publicpath
    publicPath: "http://localhost:2992/public/",

    // ??? http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
    sourceMapFilename: "debugging/[file].map",

    // Include pathinfo in output (like `require(/*./test*/23)`) http://webpack.github.io/docs/configuration.html#output-pathinfo
    pathinfo: true,
  },

  // Debug mode http://webpack.github.io/docs/configuration.html#debug
  debug: true,

  // Enhance debugging http://webpack.github.io/docs/configuration.html#devtool
  devtool: "source-map",

  // Capture timing information http://webpack.github.io/docs/configuration.html#profile
  profile: true,

  // Module http://webpack.github.io/docs/configuration.html#module
  module: {
    noParse: map(dep => {
      return Path.resolve(nodeModulesDir, dep);
    }, minifiedDeps),

    loaders: [ // http://webpack.github.io/docs/loaders.html
      // JS
      {test: /\.(js(\?.*)?)$/, loaders: ["react-hot", "babel?stage=0"], exclude: /node_modules/},

      // JSON
      {test: /\.(json(\?.*)?)$/,  loaders: ["json"]},
      {test: /\.(json5(\?.*)?)$/, loaders: ["json5"]},

      // RAW
      {test: /\.(txt(\?.*)?)$/, loaders: ["raw"]},

      // URL
      // https://github.com/webpack/url-loader
      {test: /\.(jpg(\?.*)?)$/,   loaders: ["url?limit=10000"]},
      {test: /\.(jpeg(\?.*)?)$/,  loaders: ["url?limit=10000"]},
      {test: /\.(png(\?.*)?)$/,   loaders: ["url?limit=10000"]},
      {test: /\.(gif(\?.*)?)$/,   loaders: ["url?limit=10000"]},
      {test: /\.(svg(\?.*)?)$/,   loaders: ["url?limit=10000"]},
      {test: /\.(woff(\?.*)?)$/,  loaders: ["url?limit=100000"]},
      {test: /\.(woff2(\?.*)?)$/, loaders: ["url?limit=100000"]},

      // FILE
      // https://github.com/webpack/file-loader
      {test: /\.(ttf(\?.*)?)$/, loaders: ["file"]},
      {test: /\.(eot(\?.*)?)$/, loaders: ["file"]},
      {test: /\.(wav(\?.*)?)$/, loaders: ["file"]},
      {test: /\.(mp3(\?.*)?)$/, loaders: ["file"]},

      // HTML
      {test: /\.(html(\?.*)?)$/, loaders: ["html"]},

      // MARKDOWN
      {test: /\.(md(\?.*)?)$/, loaders: ["html", "markdown"]},

      // CSS
      // https://github.com/webpack/css-loader
      {test: /\.(css(\?.*)?)$/, loader: ExtractTextPlugin.extract(`css?sourceMap`)},

      // LESS
      // https://github.com/webpack/less-loader
      {test: /\.(less(\?.*)?)$/, loader: ExtractTextPlugin.extract(`css?sourceMap!less?sourceMap`)},
    ],
  },

  // Module resolving http://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    // Abs. path with modules
    root: frontendDir,

    // node_modules and like that
    modulesDirectories: ["web_modules", "node_modules"],

    // ???
    alias: reduce((memo, dep) => {
      let depPath = Path.resolve(nodeModulesDir, dep);
      return assoc(dep.split(Path.sep)[0], depPath, memo);
    }, {}, minifiedDeps),
  },

  // Loader resolving http://webpack.github.io/docs/configuration.html#resolveloader
  resolveLoader: {
    // Abs. path with loaders
    root: nodeModulesDir,
  },

  // Plugins http://webpack.github.io/docs/list-of-plugins.html
  plugins: [
    new Webpack.NoErrorsPlugin(),
    new Webpack.IgnorePlugin(/^vertx$/),
    new Webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js"),
    new ExtractTextPlugin("[name].css"),
    new Webpack.DefinePlugin(define),
  ],

  // Include polyfills or mocks for various node stuff http://webpack.github.io/docs/configuration.html#node
  node: {
    // Required to include Joi
    net: "empty",
    dns: "empty",
  },
};