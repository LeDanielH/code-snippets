module.exports = {
  scripts: {
    default: '# Run, build and serve node index.js',
    prepush: 'npm run lint',
    poststart: 'npm run build && npm run server', // nps does not support post scripts, move scripts elswhere, nest them
    server: {
      default: 'npm-run-all --parallel server:*',
      create: 'cross-var http-server public/$npm_package_version -p $npm_package_config_port',
      launch: 'cross-var opn http://localhost:$npm_package_config_port'
    },
    pretest: 'npm run lint',
    test: 'npm run mocha',
    watch: {
      //default: 'npm-run-all --parallel watch:*', nps does not support npm-run-all won't work here see below, update other scripts
      default: 'nps --parallel watch.test, watch.lint',
      test: 'npm test -- --watch',
      lint: 'onchange "**/*.js" "**/*.scss" -- npm run lint'
    },
    cover: {
      default: 'nyc npm t',
      open: 'opn coverage/index.html'
    },
    postcover: 'rimraf .nyc_output',
    lint: {
      default: 'npm-run-all --parallel lint:**',
      js: 'eslint --cache --fix ./',
      css: {
        default: 'stylelint "**/*.scss" --syntax scss',
        fix: 'stylefmt -R src/'
      }
    },
    mocha: 'cross-env BABEL_ENV=test mocha spec/ --require babel-register',
    prebuild: 'cross-var rimraf public/$npm_package_version/',
    build: {
      default: 'npm-run-all build:*',
      html: 'cross-var pug --obj data.json src/index.pug --out public/$npm_package_version/',
      css: 'cross-var "node-sass src/index.scss | postcss -c .postcssrc.json | cssmin > public/$npm_package_version/index.min.css"',
      js: 'cross-var "mustache data.json src/index.mustache.js | uglifyjs > public/$npm_package_version/index.min.js"'
    },
    help: 'npm start -- --help'
  }
};

// we can add comments here!
