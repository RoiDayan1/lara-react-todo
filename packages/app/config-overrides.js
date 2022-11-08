const {
    removeModuleScopePlugin,
    override,
    overrideDevServer,
    addWebpackAlias,
    babelInclude,
    addDecoratorsLegacy,
} = require('customize-cra');
const path = require('path');
const Module = require('module');

const originalModuleLoad = Module._load;
Module._load = function (request, parent) {
    const originalReturn = originalModuleLoad.apply(this, arguments);
    if (request.includes('verifyTypeScriptSetup')) {
        return () => {};
    }
    return originalReturn;
};

module.exports = {
    webpack: function (config, env) {
        override(
            removeModuleScopePlugin(),
            addDecoratorsLegacy(),
            babelInclude([
                path.resolve('.'),
                path.resolve('../assets'),
                path.resolve('../components'),
                path.resolve('../models'),
            ]),
            addWebpackAlias({
                react: path.resolve('../../node_modules/react'),
                'react-dom': path.resolve('../../node_modules/react-dom'),
                '@roid/assets': path.resolve('../assets'),
                '@roid/components': path.resolve('../components'),
                '@roid/models': path.resolve('../models'),
            })
        )(config, env);
        // console.log("webpack", { config, env });
        config.optimization.minimizer[0].options.terserOptions.keep_classnames = true;
        config.optimization.minimizer[0].options.terserOptions.keep_fnames = true;
        return config;
    },
    // jest: function (config) {
    //   return config;
    // },
    devServer: overrideDevServer(function (config, env) {
        return {
            ...config,
            proxy: [
                {
                    context: ['/api'],
                    target: 'http://localhost:3005',
                    changeOrigin: true,
                },
            ],
        };
    }),
    paths: function (paths, env) {
        return paths;
    },
};
