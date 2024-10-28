const tailwindcss = require('tailwindcss');
const postcssPresetEnv = require('postcss-preset-env');
const tailwindNesting = require('tailwindcss/nesting');
const postcssPrefixSelector = require('postcss-prefix-selector');
const {autoprefixer} = require('autoprefixer');

module.exports = {
  plugins: [
    postcssPresetEnv,
    tailwindcss,
    autoprefixer,
    tailwindNesting,
    postcssPrefixSelector({
      prefix: '.tw-parent'
    })
  ],
};