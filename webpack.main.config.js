const webpack = require("webpack");

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/main/index.ts",
  module: {
    rules: require("./webpack.rules"),
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.FLUENTFFMPEG_COV": false,
    }),
  ],
};
