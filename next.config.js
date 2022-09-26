// const lessToJS = require('less-vars-to-js');
// const fs = require('fs');
// const path = require('path');
// const { withPlugins, extend } = require('next-compose-plugins');
// const withCSS = require('@zeit/next-css');
// const withLess = require('@zeit/next-less');
// const webpack = require("webpack");
// const baseConfig = require('./i18n.config.js');

// // Where your antd-custom.less file lives
// const themeVariables = lessToJS(
//   fs.readFileSync(path.resolve(__dirname, './public/static/less/styles.less'), 'utf8')
// )

// const plugins = [
//   [withCSS],
//   [withLess({
//     lessLoaderOptions: {
//       lessOptions: {
//         javascriptEnabled: true,
//         modifyVars: themeVariables, // make your antd custom effective
//       }
//     },
//     webpack: (config, { isServer }) => {
//       if (isServer) {
//         const antStyles = /antd\/.*?\/style.*?/
//         const origExternals = [...config.externals]
//         config.externals = [
//           (context, request, callback) => {
//             if (request.match(antStyles)) return callback()
//             if (typeof origExternals[0] === 'function') {
//               origExternals[0](context, request, callback)
//             } else {
//               callback()
//             }
//           },
//           ...(typeof origExternals[0] === 'function' ? [] : origExternals),
//         ]

//         config.module.rules.unshift({
//           test: antStyles,
//           use: 'null-loader',
//         })
//       }

//       config.module.rules.push({
//         test: /\.(eot|woff|woff2|ttf|svg|png|jpg|jpeg|gif)$/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 1000000,
//             name: '[name].[ext]',
//             esModule: false
//           }
//         }
//       });
//       // config.module.rules.push({
//       //   test: /\.json$/,
//       //   use: {
//       //     loader: 'json-loader',
//       //   }
//       // });

//       const builtInLoader = config.module.rules.find((rule) => {
//         if (rule.oneOf) {
//           return (
//             rule.oneOf.find((deepRule) => {
//               return deepRule.test && deepRule.test.toString().includes('/a^/');

//             }) !== undefined
//           );
//         }
//         return false;
//       });

//       if (typeof builtInLoader !== 'undefined') {
//         config.module.rules.push({
//           oneOf: [
//             ...builtInLoader.oneOf.filter((rule) => {
//               return (rule.test && rule.test.toString().includes('/a^/')) !== true;
//             }),
//           ],
//         });
//       }

//       config.resolve.alias['@'] = path.resolve(__dirname);

//       config.resolve.modules.push(path.resolve("./"));

//       return config;
//     }
//   })]
// ]

// const nextConfig = {
//   env: {}
// }

// module.exports = extend(baseConfig).withPlugins(plugins, nextConfig);

/* eslint-disable */
const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
const lessToJS = require('less-vars-to-js')
const fs = require('fs');
const path = require('path');
const baseConfig = require('./i18n.config.js');
const { withPlugins, extend } = require('next-compose-plugins');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './public/static/less/styles.less'), 'utf8')
);

const plugins = [
  withLess(withCss({
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables, // make your antd custom effective
    },
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/
        const origExternals = [...config.externals]
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback()
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback)
            } else {
              callback()
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        ]

        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader',
        })
      }

      config.resolve.extensions = [".ts", ".tsx", ".js", ".css"];
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000000,
            name: '[name].[ext]',
            esModule: false
          }
        }
      });
      // config.module.rules.push({ test: /\.png$/, loader: "url-loader?limit=100000" });
      // config.module.rules.push({ test: /\.jpg$/, loader: "file-loader" });
      return config
    },
  }))
];

const nextConfig = {
  env: {}
}

module.exports = extend(baseConfig).withPlugins(plugins, nextConfig);
