var healthApp =angular.module('healthFood',['ui.router'])
.config(function($stateProvider,$urlRouterProvider,$urlMatcherFactoryProvider){
	$urlRouterProvider.otherwise('/healthNavbar/healthHome');
    		$urlMatcherFactoryProvider.caseInsensitive(true);
    		$stateProvider
    		.state('healthNavbar',{
    			url:'/healthNavbar',
    			templateUrl:'./template/healthNavbar.html',
    			controller:'healthNavbarController'
    		})
    		.state('healthNavbar.healthHome',{
    			url:'/healthHome',
    			templateUrl:'./template/healthHome.html',
    			controller:'healthHomeController'
    		})
    		.state('healthNavbar.healthList',{
    			url:'/healthList/:id/:page',
    			templateUrl:'./template/healthList.html',
    			controller:'healthListontroller'
    		})
    		.state('healthNavbar.healthDetail',{
    			url:'/healthDetail/:id',
    			templateUrl:'./template/healthDetail.html',
    			controller:'healthDetailController'
    		})
    	})
    	.controller('healthNavbarController',function($scope,$http){
    		$http({
    			url:'http://localhost/php/healthFoodClassfiy.php'
    		}).then(function(res){
    			$scope.bookcategories = res.data.tngou;
    		})
    	})
    	.controller('healthHomeController',function($scope){
    		$scope.welcome = "欢迎来到健康大杂汇";
    	})
    	.controller('healthListController',function($scope,$stateParams,$http){
    		$http({
    			url:'http://localhost/php/healthFoodList.php',
    			params:{
    				id:$stateParams.id,
    				page:$stateParams.page
    			}
    		}).then(function(res){
    			$scope.foodList = res.data.tngou;
    			console.log(res.data.tngou);
    			var pageCountList = [];
    			var rows = 9;

    			for(var i=1;i<=Math.ceil(res.data.total/rows); i++){
    				pageCountList.push(i);
    			}
    			$scope.id = $stateParams.id;
    			$scope.pageLCountist = pageCountList;
    		})
    	})
    	.controller('healthDetailController',function($scope,$stateParams,$http){
    		$http({
    			url:'http://localhost/php/healthFoodDetail.php',
    			params:{
    				id:$stateParams.id
    			}
    		}).then(function(res){
    			$scope.detail = res.data;
    			console.log(res);
    		})
    	})

