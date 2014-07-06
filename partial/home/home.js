angular.module('smdb').controller('HomeCtrl',['$scope', 'theMovieDbService', function($scope, tmdbService){
    $scope.nowPlaying = undefined;
    $scope.nowPlayingLoading = true;
    $scope.upcoming = undefined;
    $scope.upcomingLoading = true;

    $scope.search = function() {
        // bound to the main search box
        $scope.searchText = '';

        // hold the resulting lists of movies and people
        $scope.movies=[];
        $scope.people=[];

        console.log($scope.searchText);
        tmdbService.searchMulti($scope.searchText).then(function(data) {
            console.log('controller', data);
            $scope.movies = data.data.movies;
            $scope.people = data.data.people;
        });
    };

    $scope.getImage = function (imageFilename) {
        return tmdbService.getImageUrl(imageFilename);
    };

    tmdbService.getMoviesNowPlaying().then(function(data) {
        $scope.nowPlayingLoading = false;
        $scope.nowPlaying = data.data.results;
    });


}]);