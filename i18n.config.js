const withPlugins = require('next-compose-plugins');
const { nextI18NextRewrites } = require('next-i18next/rewrites');
const localeSubpaths = {
    // en: 'en',
    // vi: 'vi'
};

module.exports = withPlugins([[{
    rewrites: async () => nextI18NextRewrites(localeSubpaths),
    publicRuntimeConfig: {
        localeSubpaths,
    },
}]]);