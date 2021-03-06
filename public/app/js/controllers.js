var technoTopControllers = angular.module('technoTopControllers', []);
 
technoTopControllers.controller('TechnoTopCtrl', function ($scope, $routeParams, $http, Analytics) {
	$scope.techno = $routeParams.techno;
	
	$scope.chartTitle = "Techno usage";
	$scope.chartWidth = 500;
	$scope.chartHeight = 320;
	$scope.chartData = [
	    ['Drupal',     11],
	    ['WordPress',      2],
	    ['Magento',  2],
	    ['ZF2', 2],
	    ['SF2',    7]
	];
	  
	$scope.deleteRow = function (index) {
	    $scope.chartData.splice(index, 1);
	};
	$scope.addRow = function () {
	    $scope.chartData.push([]);
	};
	$scope.selectRow = function (index) {
	    $scope.selected = index;
	};
	$scope.rowClass = function (index) {
	    return ($scope.selected === index) ? "selected" : "";
	};
	  
	Analytics.trackPage('/techno/' + $routeParams.techno);
	$http.get('/techno/' + $routeParams.techno).success(function(data) {
	    $scope.technos = data.data;
	    $scope.chartData = [
    	    ['Drupal',     250],
    	    ['WordPress',      2],
    	    ['Magento',  2],
    	    ['ZF2', 2],
    	    ['SF2',    7]
	    ];
	});
});

technoTopControllers.controller('CategoriesCtrl', function ($scope, $routeParams, $http, Analytics) {

	$http.get('/category').success(function(data) {
	    $scope.categories = data.data;
	});
});

technoTopControllers.controller('TechnoCategoryCtrl', function ($scope, $routeParams, $resource, ngTableParams, Analytics) {
	  
    var Api = $resource('/category/' + $routeParams.id);
    Analytics.trackPage('/category/' + $routeParams.id);
    
    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 25,          // count per page
        sorting: {
            count: 'desc'   // initial sorting
        }
    }, {
        //total: 0,           // length of data
        getData: function($defer, params) {
            Api.get(params.url(), function(data) {
                
                params.total(data.total);
                $defer.resolve(data.data);
                
                $scope.totalTechnos = data.total;
                $scope.chartTitle = "Category share";
                $scope.chartWidth = 500;
                $scope.chartHeight = 320;
                //$scope.chartData = data.data;
                //$scope.chartData = google.visualization.arrayToDataTable(data.data);

                var sampleData = [];
                angular.forEach(data.data, function(row) {
                    //console.log(row.techno + ' ' +row.count);
                    sampleData.push({ 0:row.techno, 1:row.count });
                });
                $scope.chartData = sampleData;
                $scope.chartData = data.chart;
                
                console.log($scope.chartData);
            });
        }
    });
	
});

technoTopControllers.controller('CreditsCtrl', function ($scope, $routeParams, $resource, ngTableParams, Analytics) {
    Analytics.trackPage('/credits');
});

technoTopControllers.controller('ContactCtrl', function ($scope, $routeParams, $resource, ngTableParams, Analytics) {
    Analytics.trackPage('/contact');
});

technoTopControllers.controller('HomeCtrl', function ($scope, $routeParams, $resource, ngTableParams, Analytics) {
    Analytics.trackPage('/');
});