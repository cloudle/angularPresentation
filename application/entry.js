import angular from 'angular';
import uiRouter from 'angular-ui-router';

import RouterConfig from './logics/routerConfig';
import {developers} from './logics/devStore';
import DevController from './logics/devController';
import MainController from './logics/mainController';

var Application = angular.module('application', [uiRouter]).config(RouterConfig);

Application.controller('devCtrl', DevController);
Application.controller('mainCtrl', MainController);