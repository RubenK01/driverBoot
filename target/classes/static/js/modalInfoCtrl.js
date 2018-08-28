myApp.controller('modalInfoCtrl', function ($scope, $modalInstance, message) {
	$scope.message = message;
	$scope.close = function(){
		$modalInstance.dismiss();
	}

});