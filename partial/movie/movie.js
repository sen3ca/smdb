angular.module('smdb').controller('MovieCtrl', ['$scope', '$routeParams', 'theMovieDbService', function($scope, $routeParams, tmdbService){
    $scope.movie = undefined;
    $scope.moviePersons = undefined;
    $scope.imageUrl = '';
    $scope.loadingMovie = true;
    $scope.imdbUrl = '';

    $scope.getImdbUrl = function (imdbId) {
        if(imdbId && imdbId.indexOf('tt') === 0) {
            $scope.imdbUrl = 'http://www.imdb.com/title/' + imdbId;
        }
    };

    $scope.stripMainCrew = function (crew) {
        var crewPeopleICareAbout = ['Directing','Writing','Production'];
        var shortenedCrew = [];
        // Loop through the crew of the movie
        for( var i = 0 ; i < crew.length ; i++) {
            // only strip out those that are in the crewPeopleICareAbout array, and in put in the shortenedCrew var
            for( var j = 0 ; j < crewPeopleICareAbout.length ; j++) {
                if(crew[i].department === crewPeopleICareAbout[j]) {
                    if (!shortenedCrew.hasOwnProperty(crew[i].department)) {
                        shortenedCrew[crew[i].department] = [];
                    }
                    shortenedCrew[crew[i].department].push(crew[i]);
                }
            }
        }

        return shortenedCrew;
    };

    tmdbService.getMovie($routeParams.id).then(function(data) {
        $scope.movie = data.data;
        console.log('imdbDB', $scope.movie.imdb_id);
        $scope.getImdbUrl($scope.movie.imdb_id);
        console.log('movie', $scope.movie);
        $scope.loadingMovie = false;
    });

    tmdbService.getMoviePersons($routeParams.id).then(function(data) {
        console.log('moviePersons', data.data);
        $scope.moviePersons = data.data;
        $scope.moviePersons.shortenedCrew = $scope.stripMainCrew($scope.moviePersons.crew);
        console.log($scope.moviePersons.shortenedCrew);
    });

}]);