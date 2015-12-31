(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"E:\\Projects\\upFront\\angularPresentation\\server\\server.js":[function(require,module,exports){
'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)(),
    apiRouter = _express2.default.Router(),
    classicRouter = _express2.default.Router();

server.set('views', './build/client');
server.use(_express2.default.static('./build/client'));

apiRouter.get('/', function (req, res) {
  res.json({ message: 'Yay!' });
});

classicRouter.get('/', function (req, rest) {
  res.render('index', {});
});

server.use('/api', apiRouter);server.use('/', classicRouter);

var port = process.env.PORT || 7015;

_gulpUtil2.default.log(_chalk2.default.magenta('Server is running under port: ' + port));
server.listen(port);

},{"chalk":false,"express":false,"gulp-util":false}]},{},["E:\\Projects\\upFront\\angularPresentation\\server\\server.js"])


//# sourceMappingURL=sourcemaps/server.js.map
