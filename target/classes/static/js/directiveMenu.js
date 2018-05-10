myApp.directive('menuSelected', [function() {
    return { //https://toddmotto.com/dynamic-controllers-in-directives-with-the-undocumented-name-property/
      restrict: 'E',
      link: function(scope, element, attrs, $ctrl) {
           scope.contentUrl = '/html/' + scope.selectedName + '.html' ;
      },
      name: 'ctrl',
      controller: '@',
      template: '<div ng-include="contentUrl"></div>'
    };
}]);