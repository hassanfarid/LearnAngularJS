// ROUTES
forexApp.config(function($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'views/main.htm',
        controller: 'mainController'
    })
    
    .when('/forex', {
        templateUrl: 'views/forex.htm',
        controller: 'forexController'
    })

    .when('/forex:num', {
        templateUrl: 'views/forex.htm',
        controller: 'forexController'
    })
    
});