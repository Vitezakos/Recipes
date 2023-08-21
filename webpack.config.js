const path = require("path");
module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /.(ttf|eot|svg|jpg|gif|png|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    // order matters, resolves left to right
    extensions: ["", ".js", ".ts", ".tsx", ".json"],
    fallback: {
      fs: false,
      os: false,
      path: false,
    },
  },
  output: {
    publicPath: "",
    filename: "output.js",
    path: path.resolve(__dirname, "public"),
  },
  mode: "development",
};
