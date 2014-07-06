angular.module('smdb').controller('SearchresultsCtrl', ['$scope', '$routeParams', 'theMovieDbService', function($scope, $routeParams, tmdbService){
    $scope.movies = [];
    $scope.people = [];
    tmdbService.searchMulti($routeParams.queryText).then(function(data) {
        console.log('controller', data);
        $scope.movies = data.data.movies;
        $scope.people = data.data.people;
    });
}]);