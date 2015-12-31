(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"E:\\Projects\\upFront\\angularPresentation\\application\\entry.js":[function(require,module,exports){
'use strict';

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = require('angular-ui-router');

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _routerConfig = require('./logics/routerConfig');

var _routerConfig2 = _interopRequireDefault(_routerConfig);

var _devStore = require('./logics/devStore');

var _devController = require('./logics/devController');

var _devController2 = _interopRequireDefault(_devController);

var _mainController = require('./logics/mainController');

var _mainController2 = _interopRequireDefault(_mainController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Application = _angular2.default.module('application', [_angularUiRouter2.default]).config(_routerConfig2.default);

Application.controller('devCtrl', _devController2.default);
Application.controller('mainCtrl', _mainController2.default);

},{"./logics/devController":"E:\\Projects\\upFront\\angularPresentation\\application\\logics\\devController.js","./logics/devStore":"E:\\Projects\\upFront\\angularPresentation\\application\\logics\\devStore.js","./logics/mainController":"E:\\Projects\\upFront\\angularPresentation\\application\\logics\\mainController.js","./logics/routerConfig":"E:\\Projects\\upFront\\angularPresentation\\application\\logics\\routerConfig.js","angular":"angular","angular-ui-router":"angular-ui-router"}],"E:\\Projects\\upFront\\angularPresentation\\application\\logics\\devController.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _devStore = require('./devStore');

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DevController = function DevController($scope, $state) {
  _classCallCheck(this, DevController);

  var devId = $state.params.id,
      currentDev = _underscore2.default.findWhere($scope.devs, { id: parseInt(devId) });

  $scope.dev = currentDev;
};

DevController.$inject = ['$scope', '$state'];
exports.default = DevController;

},{"./devStore":"E:\\Projects\\upFront\\angularPresentation\\application\\logics\\devStore.js","underscore":"underscore"}],"E:\\Projects\\upFront\\angularPresentation\\application\\logics\\devStore.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var developers = exports.developers = [{ id: 0, name: "Nguyen Thanh Tin" }, { id: 1, name: "To Thanh Trung" }, { id: 2, name: "Nguyen Tan Khoa" }, { id: 3, name: "Tran Quang Hien" }, { id: 4, name: "Le Ngoc Son" }, { id: 5, name: "Nguyen Vuong Tung" }];

},{}],"E:\\Projects\\upFront\\angularPresentation\\application\\logics\\mainController.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _devStore = require('./devStore');

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainController = function MainController($scope, $http) {
  _classCallCheck(this, MainController);

  $scope.devs = _devStore.developers;

  $http.get('http://oindex.officience.com/web/api/users', {
    headers: { apikey: '7421aebcd07df78ebe929cbfed39c7a4' }
  }).then(function (result, error) {

    $scope.devs = result.data.filter(function (item) {
      return !!item.avatar;
    });
  });
};

MainController.$inject = ['$scope', '$http'];
exports.default = MainController;

},{"./devStore":"E:\\Projects\\upFront\\angularPresentation\\application\\logics\\devStore.js","underscore":"underscore"}],"E:\\Projects\\upFront\\angularPresentation\\application\\logics\\routerConfig.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RouterConfig;
function RouterConfig($stateProvider, $urlRouterProvider, $compileProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'template/index.html'
  }).state('about', {
    url: '/about',
    templateUrl: 'template/about.html'
  }).state('dev', {
    url: '/dev/:id',
    templateUrl: 'template/dev-detail.html',
    controller: 'devCtrl'
  });

  $urlRouterProvider.otherwise('home');
}

},{}]},{},["E:\\Projects\\upFront\\angularPresentation\\application\\entry.js"])


//# sourceMappingURL=sourcemaps/bundle.js.map
