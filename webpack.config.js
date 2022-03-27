/* new project */
/* npm init */
/* npm i -D webpack webpack.cli */
const path = require('path');
/* npm i -D html-webpack-plugin */
/* Add it below under plugin */
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* npm i -D webpack-bundle-analyzer */
/* Add it below under plugin */
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  /* Add "build": "webpack", under scripts in package.json file */
  /* To generate files -> npm run build */
  /* Webpack entry path/file */
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js'),
  },
  /* Webpack output path/folder */
  /* [contenthash] used for caching (https://webpack.js.org/guides/caching/) */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    /* Deletes old files */
    clean: true,
    /* output assets with the original name, which has been declared under module below */
    assetModuleFilename: '[name][ext]',
  },
  /* Adding a source map for debugging */
  devtool: 'source-map',
  /* Live server settings */
  /* Add "dev": "webpack serve", under scripts in package.json file */
  /* To generate files -> npm run dev */
  devServer: {
    /* path the server should start with */
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    /* Localhost port we choose */
    port: 3001,
    /* Opens browser automatically */
    open: true,
    /* Hotreloading */
    hot: true,
    /* Enable gzip compression for everything served */
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        /* include all files ending with .scss and combine with loader modules */
        /* npm i -D sass style-loader css-loader sass-loader */
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        /* Adding Babel for backward compatibility with older browser */
        /* npm i -D babel-loader @babel/core @babel/preset-env */
        test: /\.js$/,
        /* Make sure you exclude node files */
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        /* Include images in src/assets folder */
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    /* html template file */
    new HtmlWebpackPlugin({
      /* Title of the page */
      title: 'Webpack App',
      filename: 'index.html',
      /* Template location */
      template: 'src/template.html',
    }),
    /* Bundle Analyzer deactivate. It will start with npm run build */
    //new BundleAnalyzerPlugin(),
  ],
};
