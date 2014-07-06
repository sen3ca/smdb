angular.module('smdb').controller('PersonCtrl', ['$scope', '$routeParams', 'theMovieDbService', function($scope, $routeParams, tmdbService){
    $scope.person = undefined;
    $scope.personsMovies = undefined;
    $scope.imageUrl = '';
    $scope.loadingPerson = true;
    $scope.imdbUrl = '';
    $scope.shortBioDisplayed = false;

    console.log($routeParams);

    $scope.getImdbUrl = function (imdbId) {
        if(imdbId && imdbId.indexOf('nm') === 0) {
            $scope.imdbUrl = 'http://www.imdb.com/name/' + imdbId;
            return $scope.imdbUrl;
        }
    };

    $scope.toggleBio = function () {
        $scope.shortBioDisplayed = !$scope.shortBioDisplayed;
    };

    tmdbService.getPerson($routeParams.id).then(function(data) {
        $scope.person = data.data;

        if ($scope.person.biography && $scope.person.biography.length > 1500) {
            $scope.person.shortBiography = $scope.person.biography.substring(0, 1200);
            $scope.shortBioDisplayed = true;
        }

        $scope.getImdbUrl($scope.person.imdb_id);
        console.log('person', $scope.person);
        $scope.imageUrl = tmdbService.getImageUrl($scope.person.profile_path);
        $scope.loadingPerson = false;
    });

    tmdbService.getPersonsMovies($routeParams.id).then(function(data) {
        console.log('personMovies', data);
        $scope.personsMovies = data.data;
    });

}]);