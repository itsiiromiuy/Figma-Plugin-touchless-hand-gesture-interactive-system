const path = require("path");

module.exports = {
  entry: "./src/code.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/inline",
      },
      
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    aliasFields: ["browser"],
  },
  output: {
    filename: "code.js",
    path: path.resolve(__dirname, "dist"),
    // assetModuleFilename: "images/[name][ext]",
  },
};
