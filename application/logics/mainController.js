import {developers} from './devStore';
import _ from 'underscore';

export default class MainController {
  static $inject = ['$scope', '$http'];

  constructor($scope, $http) {
    $scope.devs = developers;

    $http.get('http://oindex.officience.com/web/api/users', {
      headers: { apikey: '7421aebcd07df78ebe929cbfed39c7a4' }
    }).then(function(result, error) {

      $scope.devs = result.data.filter(item => !!item.avatar);
    });
  }
}