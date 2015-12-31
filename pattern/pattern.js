import {developers} from './logics/devStore';

Application.controller('mainCtrl', $scope => {
  $scope.devs = developers;
});

var Application = angular.module('application', [uiRouter]);

import {RouterConfig} from './logics/routerConfig';
Application.config(RouterConfig);

Application.controller('mainCtrl', $scope => {
  $scope.devs = developers;
});

angular.bootstrap(document, ['application']);