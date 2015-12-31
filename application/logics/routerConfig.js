export default function RouterConfig($stateProvider, $urlRouterProvider, $compileProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'template/index.html'
  }).state('about', {
    url: '/about',
    templateUrl: 'template/about.html'
  }).
  state('dev', {
    url: '/dev/:id',
    templateUrl: 'template/dev-detail.html',
    controller: 'devCtrl'
  });

  $urlRouterProvider.otherwise('home');
}