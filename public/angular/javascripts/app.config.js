angular.module('app')
.config(function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('app');
});