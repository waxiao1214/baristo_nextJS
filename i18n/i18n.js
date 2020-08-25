const NextI18Next = require('next-i18next').default;
const path = require('path');

module.exports = new NextI18Next({
    otherLanguages: ['de'],
    localeSubpaths: {
        de: 'de'
    },
    localePath: path.resolve('./public/static/locales')
})