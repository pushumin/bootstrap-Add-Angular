var healthApp =angular.module('health',['ui.router'])
//  	.filter('replace',function(){
//  			return function( detail ) {
//  				var reg = /^[\w]*$/g;
//  				return detail.replaceAll(reg,'')
//  			}
//  			
//  			
//  	})
/*------------------------- 公共部分 --------------------------*/
.run(function($rootScope, $state, $stateParams) {
	$rootScope.foodPrefix = "http://tnfs.tngou.net/image";
	
  	$rootScope.$state = $state; //state是我们的状态，放到了$rootScope
  	$rootScope.$stateParams = $stateParams; // stateParams是我们的路由的参数
	// stateChangeSuccess
  	$rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
	    // to be used for back button //won't work when page is reloaded.
    	$rootScope.previousState_name = fromState.name; //记录前一个路由的名称
    	$rootScope.previousState_params = fromParams; //记录前一个路由的参数
  	});
	    //back button function called from back button's ng-click="back()"
  	$rootScope.back = function(obj) {
	      //如果前一个路由的名称长度为0，就意味着没有前一个路由操作，我们就没有返回的路径
		if($rootScope.previousState_name.trim().length != 0){
		  $state.go($rootScope.previousState_name, $rootScope.previousState_params);
		    
		}else{
		    // alert('没有可返回的页面!');
	  	$('#'+obj).popover('show');
		
		}
  	};
})
.directive("compile", function($compile) {
	return function(scope,element,attrs){
  		scope.$watch(
	    	function(scope){
	      		return scope.$eval(attrs.compile);
	    	},
	    	function(value){
	      		element.html(value);
	      		$compile(element.contents())(scope);
	    }
	  )
	}
})




/*----------------------- config -----------------------------*/
.config(function($stateProvider,$urlRouterProvider,$urlMatcherFactoryProvider){
	$urlRouterProvider.otherwise('/navbar/home');
	$urlMatcherFactoryProvider.caseInsensitive(true);
	$stateProvider
	
	/*-------------- 公共部分 ------------------*/
	.state('navbar',{
		url:'/navbar',
		templateUrl:'./template/navbar.html',
		controller:'navbarController'
	})
	.state('navbar.home',{
		url:'/home',
		templateUrl:'./template/home.html',
		controller:'homeController'
	})
	
		/*------------------ healthFood ---------------------------*/
	/*--------------- healthFood foodList --------------------*/
	.state('navbar.foodList',{
		url:'/foodList/:id/:page',
		templateUrl:'./template/foodList.html',
		controller:'foodListController'
	})
	
	/*--------------- healthFood foodDetail --------------------*/
	.state('navbar.foodDetail',{
		url:'/foodDetail/:id',
		templateUrl:'./template/foodDetail.html',
		controller:'foodDetailController'
	})
	
		/*------------------ healthAsk ---------------------------*/
	/*--------------- healthAsk healthAskList --------------------*/
	.state('navbar.healthAskList',{
		url:'/healthAskList/:id/:page',
		templateUrl:'./template/healthAskList.html',
		controller:'healthAskListController'
	})
	
	/*--------------- healthAsk healthAskDetail --------------------*/
	.state('navbar.healthAskDetail',{
		url:'/healthAskDetail/:id',
		templateUrl:'./template/healthAskDetail.html',
		controller:'healthAskDetailController'
	})
	
		/*---------------------- book ----------------------*/
	/*--------------- book bookList --------------------*/
	.state('navbar.bookList',{
		url:'/bookList/:id/:page',
		templateUrl:'./template/bookList.html',
		controller:'bookListController'
	})
	
	/*--------------- book bookDetail --------------------*/
	.state('navbar.bookDetail',{
		url:'/bookDetail/:id',
		templateUrl:'./template/bookDetail.html',
		controller:'bookDetailController'
	})
	
	/*------------------------------- knowledage ----------------*/
	/*--------------------- knowledage knowledageList  ----------------*/
	.state('navbar.knowledgeList',{
        url:'/knowledgeList/:id/:page',
        templateUrl:'./template/knowledgeList.html',
        controller:'knowledgeListController'
    })
	
	/*--------------------- knowledage knowledgeDetail  ----------------*/
    .state('navbar.knowledgeDetail',{
        url:'/knowledgeDetail/:id',
        templateUrl:'./template/knowledgeDetail.html',
        controller:'knowledgeDetailController'
    })
    
    /*----------------- consultation ----------------------*/
   	/*----------------- consultation consultationList ----------------------*/
   .state('navbar.consultationList',{
		url:'/consultationList/:id/:page',
		templateUrl:'./template/consultationList.html',
		controller:'consultationListController'
	})
   
   /*----------------- consultation consultationList ----------------------*/
	.state('navbar.consultationDetail',{
		url:'/consultationDetail/:id',
		templateUrl:'./template/consultationDetail.html',
		controller:'consultationDetailController'
	})
	
	/*------------- drugs -----------*/
	/*------------- drugs drugsList -----------*/
	.state('navbar.drugsList',{
		url:'/drugsList/:id/:page',
		templateUrl:'./template/drugsList.html',
		controller:'drugsListController'
	})
	
	/*------------- drugs drugsDetail -----------*/
	.state('navbar.drugsDetail',{
		url:'/drugsDetail/:id',
		templateUrl:'./template/drugsDetail.html',
		controller:'drugsDetailController'
	})
})

/*--------------- 公共部分 navbarController --------------------*/
.controller('navbarController',function($scope,$http){

	/*------------------- healthFood ------------------*/
	$http({
		url:'http://923523159qq.applinzi.com/phpNew/healthFoodClassfiy.php'
	}).then(function(res){
			$scope.foodcategories = res.data.tngou;
	});
	
	/*------------------- healthAsk ------------------*/
	$http({
		url:'http://923523159qq.applinzi.com/phpNew/healthAskClassfiy.php'
	}).then(function(res){
			$scope.healthAskCategories = res.data.tngou;
	});
	
	/*------------------- book ------------------*/
	$http({
		url:'http://923523159qq.applinzi.com/phpNew/book-classify.php'
	}).then(function(res){
		$scope.bookcategories = res.data.tngou;

	});
	
	/*------------------- knowledage ------------------*/
	$http({
		url:'http://923523159qq.applinzi.com/phpNew/knowledge-classify.php'
	}).then(function(res){
		$scope.knowledgecategories = res.data.tngou;

	});
	
	/*-------------- consultation ---------------------*/
	$http({
		url:'http://923523159qq.applinzi.com/phpNew/health-categories.php'
	}).then(function(res){
		$scope.consulationCategories = res.data.tngou;
	});
	
	/*------------- drugs -----------*/
	$http({
		url:'http://923523159qq.applinzi.com/phpNew/medication-categories.php'
	}).then(function(res){
		$scope.drugscategories = res.data.tngou;
	})
})

/*--------------- 公共部分 homeController --------------------*/
.controller('homeController',function($scope){
	$scope.welcome = "欢迎来到健康资讯";
})


			/*-------------------- healthFood --------------------------------*/
/*--------------- healthFood   foodList   foodListController --------------------*/
.controller('foodListController',function($scope,$stateParams,$http){
	$http({
		url:'http://923523159qq.applinzi.com/phpNew/healthFoodList.php',
		params:{
			id:$stateParams.id,
			page:$stateParams.page
		}
	}).then(function(res){
		$scope.foodList = res.data.tngou;
		var pageCountList = [];
		var rows = 9;

		for(var i=1;i<=Math.ceil(res.data.total/rows); i++){
			pageCountList.push(i);
		}
		$scope.id = $stateParams.id;
		$scope.pageLCountist = pageCountList;
	})
})

/*--------------- healthFood   foodDetail   foodDetailController --------------------*/
.controller('foodDetailController',function($scope,$stateParams,$http,$sce){
	$http({
		url:'http://923523159qq.applinzi.com/phpNew/healthFoodDetail.php',
		params:{
			id:$stateParams.id
		}
	}).then(function(res){
		//console.log(res.data)
		$scope.detail = res.data;
	})
})


			/*-------------------- healthAsk --------------------------------*/
/*-------------------- healthAsk  navbarController --------------------------------*/
//.controller('navbarController',function($scope,$http){
//	$http({
//		url:'http://923523159qq.applinzi.com/phpNew/healthAskClassfiy.php'
//	}).then(function(res){
//			$scope.healthAskCategories = res.data.tngou;
//	})
//})

/*--------------- healthAsk   healthAskList   healthAskListController --------------------*/
.controller('healthAskListController',function($scope,$stateParams,$http){
	$http({
		url:'http://923523159qq.applinzi.com/phpNew/healthAskList.php',
		params:{
			id:$stateParams.id,
			page:$stateParams.page
		}
	}).then(function(res){
		$scope.healthAskList = res.data.tngou;
//		console.log(res.data)
		var pageCountList = [];
		var rows = 9;

		for(var i=1;i<=Math.ceil(res.data.total/rows); i++){
			pageCountList.push(i);
		}
		$scope.id = $stateParams.id;
		//console.log($scope.id)
		$scope.healthAskpageLCountist = pageCountList;
	})
})

/*--------------- healthAsk   healthAskDetail   healthAskDetailController --------------------*/
.controller('healthAskDetailController',function($scope,$stateParams,$http,$sce){
	$http({
		url:'http://923523159qq.applinzi.com/phpNew/healthAskDetail.php',
		params:{
			id:$stateParams.id
		}
	}).then(function( res ){
		$scope.healthAskDetail = res.data;

	})
	
})



			/*---------------------- book ----------------------*/
/*--------------- book   bookList   bookListController --------------------*/
.controller('bookListController',function($scope,$stateParams,$http){
	$http({
		url:'http://923523159qq.applinzi.com/phpNew/book-list.php',
		params:{
			id:$stateParams.id,
			page:$stateParams.page
		}
	}).then(function(res){
        // console.log(res.data)
		$scope.bookList = res.data.list;
		// console.log(res.data.list);
		var pageCountList = [];
		var rows = 9;

		for(var i=1;i<=Math.ceil(res.data.total/rows); i++){
			pageCountList.push(i);
		}
		$scope.id = $stateParams.id;
		$scope.pageLCountist = pageCountList;
	})
})

/*--------------- book   bookDetail   bookDetailController --------------------*/
.controller('bookDetailController',function($scope,$stateParams,$http,$sce){
	$http({
		url:'http://923523159qq.applinzi.com/phpNew/book-detail.php',
		params:{
			id:$stateParams.id
		}
	}).then(function(res){
		$scope.Detail = res.data;
		console.log(res);
	})
})

	/*------------------------------- knowledage ----------------*/
/*--------------------- knowledage knowledageList knowledgeListController----------------*/
.controller('knowledgeListController',function($scope,$stateParams,$http){
	$http({
		url:'http://923523159qq.applinzi.com/phpNew/knowledge-list.php',
		params:{
			id:$stateParams.id,
			page:$stateParams.page
		}
	}).then(function(res){
        console.log(res.data)
		$scope.knowledgeList = res.data.tngou;
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

/*--------------------- knowledage knowledgeDetail  knowledgeDetailController ----------------*/
.controller('knowledgeDetailController',function($scope,$stateParams,$http){
    console.log(11)
	$http({
		url:'http://923523159qq.applinzi.com/phpNew/knowledge-detail.php',
		params:{
			id:$stateParams.id
		}
	}).then(function(res){
		$scope.detail = res.data;
		console.log(res.data);
	})
})




 	/*----------------- consultation ----------------------*/
/*----------------- consultation consultationList consultationListController ----------------------*/
.controller('consultationListController',function($scope,$stateParams,$http){
	$http({
		url:'http://923523159qq.applinzi.com/phpNew/health-list.php',
		params:{
			id:$stateParams.id,
			page:$stateParams.page
		}
	}).then(function(res){
		$scope.consultationList = res.data.tngou;
		var pageCountList = [];
		var rows = 9;
		for(var i=1;i<=Math.ceil(res.data.total/rows); i++){
			pageCountList.push(i);
		}
		$scope.id = $stateParams.id;
		$scope.pageLCountist = pageCountList;				
	})
})

/*----------------- consultation consultationDetail consultationDetailController ----------------------*/
.controller('consultationDetailController',function($scope,$stateParams,$http,$sce){
	$http({
		url:'http://923523159qq.applinzi.com/phpNew/health-detail.php',
		params:{
			id:$stateParams.id
		}
	}).then(function(res){
		$scope.consultationDetail = res.data;
		console.log(res.data)
		$scope.pos = res.data.indexOf("{");
		$scope.detail1=$scope.detail.substring($scope.pos);
		$scope.detailObj = JSON.parse($scope.detail1);
		
	})
})
	/*-------------- drugs --------------------*/
/*----------------- drugs drugsList drugsListController ----------------------*/
.controller('drugsListController',function($scope,$stateParams,$http){
	$http({
		url:'http://923523159qq.applinzi.com/phpNew/medication-list.php',
		params:{
			id:$stateParams.id,
			page:$stateParams.page
		}
	}).then(function(res){
		$scope.drugsList = res.data.tngou;
		var pageCountList = [];
		var rows = 9;
		for(var i=1;i<=Math.ceil(res.data.total/rows); i++){
			pageCountList.push(i);
		}
		$scope.id = $stateParams.id;
		$scope.pageLCountist = pageCountList;				
	})
})

/*----------------- drugs drugsDetail drugsDetailController ----------------------*/
.controller('drugsDetailController',function($scope,$stateParams,$http,$sce){
	$http({
		url:'http://923523159qq.applinzi.com/phpNew/medication-detail.php',
		params:{
			id:$stateParams.id
		}
	}).then(function(res){					
		$scope.drugsDetail = res.data;
// 		$scope.pos = res.data.indexOf("{");
// 		$scope.detail1=$scope.detail.substring($scope.pos);
// 		$scope.detailObj = JSON.parse($scope.detail1);
		console.log(res.data)
		
	})
})







