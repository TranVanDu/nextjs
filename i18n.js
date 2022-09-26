const NextI18Next = require('next-i18next').default
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;
const path = require('path')

module.exports = new NextI18Next({
    otherLanguages: ['en'],
    defaultLanguage: 'vi',
    allLanguages: ['vi', 'en'],
    browserLanguageDetection: false, // <---
    serverLanguageDetection: false, // <--
    localeSubpaths,
    fallbackLng: 'en',
    localePath: path.resolve('./public/static/locales'),
    strictMode: false
})