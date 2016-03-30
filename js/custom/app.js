var app = angular.module('jujuApp',['ngSanitize']);

//$location in HTML5 mode requires a <base> tag to be present!
app.config(function($locationProvider) { $locationProvider.html5Mode(true);});
