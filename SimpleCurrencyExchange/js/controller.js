// CONTROLLERS
forexApp.controller('mainController', ['$scope', '$log', 'forexService', function ($scope, $log, forexService) {
    
    $log.info('mainController running');
    
    $scope.currency = {
        options: ['Select Currency'],
        selected: forexService.baseCurrency
    };
    
    $scope.apiResult = forexService.forexAPI.get(null, function(result) {
        
        var arr = [result.base];
        angular.forEach(result.rates, function(k, v) {
            arr.push(v);
        });
        $scope.currency.options = arr;
        
    });
    
    $scope.$watch('currency.selected', function() {
       
        forexService.baseCurrency = $scope.currency.selected;
        
    });
    
}]);

forexApp.controller('forexController', ['$scope', '$routeParams', 'forexService', function($scope, $routeParams, forexService) {
    
    $scope.baseCurrency = forexService.baseCurrency;
    $scope.targetCurrency = 'CAD';
    $scope.days = $routeParams.num | '10';
    
    //static chart data
    $scope.chartData = [];
    var curDate = new Date();
    for(var i=0; i<$scope.days; i++) {
        $scope.chartData.push([forexService.getFormattedDate(curDate), 0.0]);
        curDate = forexService.addDays(new Date(curDate), -1);
    }
    console.log($scope.chartData);
    
    $scope.forexLatestResult = forexService.forexAPI.get({ base: $scope.baseCurrency }, function(result) {
        
        console.log(angular.toJson(result));
        console.log(result.date);
        $scope.chartData = [];
        var curDate = new Date(result.date);
        for(var i=0; i<$scope.days; i++) {
            $scope.chartData.push([forexService.getFormattedDate(curDate), 1.0]);
            curDate = forexService.addDays(new Date(curDate), -1);
        }
        console.log($scope.chartData);
        $scope.updateChart();
    });
    
    $scope.updateChart = function () {
        Highcharts.chart('container', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: $scope.baseCurrency + ' to ' + $scope.targetCurrency + ' exchange rate over time'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Exchange rate'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [
                {
                    type: 'area',
                    name: $scope.baseCurrency + ' to ' + $scope.targetCurrency,
                    data: $scope.chartData
                }
            ]
        });
    };
        
    
}]);