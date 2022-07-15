function umbracoUcommerceContentTreeController($scope, $rootScope, $window, $location, $q, assetsService) {
	$scope.$on('preSelectedValuesChanged', function(event, data) {
		$scope.model.value = data.map(function(e) {
			return e.guid;
		}).join(',');
		
	});

    assetsService.loadCss("/App_Plugins/uCommercePicker/ucommerce.tree.css");
}