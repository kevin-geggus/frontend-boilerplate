module.exports = ({ file, options, env }) => ({
    plugins: {
      'postcss-import': {
          root: file.dirname
      },
      'postcss-cssnext': {
        browsers: ['last 2 versions', 'IE >= 9'],
        warnForDuplicates: false
      },
      'postcss-reporter': {
        clearMessages: true
      },
      'cssnano': {
        preset: ['default', {
          autoprefixer: false,
          discardComments: {
            removeAll: true,
          },
        }]
      }
    }
});