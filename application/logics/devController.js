import {developers} from './devStore';
import _ from 'underscore';

export default class DevController {
  static $inject = ['$scope', '$state'];

  constructor($scope, $state) {
    let devId = $state.params.id,
        currentDev = _.findWhere($scope.devs, {id: parseInt(devId)});

    $scope.dev = currentDev;
  }
}