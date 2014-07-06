angular.module('smdb', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('smdb').constant('tmdbUrl', 'http://api.themoviedb.org/3');
angular.module('smdb').constant('tmdbImageUrl', 'http://image.tmdb.org/t/p/w185');
angular.module('smdb').constant('tmdbApiKey', 'ce2ee9af47ff71a15e2999ba0ddc95d2');

angular.module('smdb').config(function($routeProvider) {

    $routeProvider.when('/',{templateUrl: 'partial/home/home.html'});
    $routeProvider.when('/movie/:id',{templateUrl: 'partial/movie/movie.html'});
    $routeProvider.when('/person/:id',{templateUrl: 'partial/person/person.html'});
    $routeProvider.when('/search/:queryText',{templateUrl: 'partial/searchResults/searchResults.html'});
    /* Add New Routes Above */
    $routeProvider.otherwise({redirectTo:'/home'});

});

angular.module('smdb').controller('MainSearch', ['$scope', '$location', 'theMovieDbService', function($scope, $location, tmdbService){
    // bound to the main search box
    $scope.searchText = '';

    $scope.search = function() {
        if($scope.searchText) {
            $location.path('/search/' + $scope.searchText);
        }
    };

    $scope.getMoviesAndPeople = function(searchText) {
        // should be an even number, will split people and movie results up evenly
        // if it can, otherwise will fill
        var typeAheadMaxResults = 12;

        function pushMovie(movieArray, movie) {
            movieArray.push({id: movie.id, type: 'movie', label: movie.original_title, date: movie.release_date});
        }

        function pushPerson(personArr, person) {
            personArr.push({id: person.id, type: 'person', label: person.name});
        }

        return tmdbService.searchMulti(searchText).then(function (data) {
            console.log('data', data);
            var movieTitleList = [];
            var personNameList = [];

            for (var i = 0; i < typeAheadMaxResults / 2 && i < data.data.movies.length; i++) {
                pushMovie(movieTitleList, data.data.movies[i]);
            }
            for (i = 0; i < typeAheadMaxResults / 2 && i < data.data.people.length; i++) {
                pushPerson(personNameList, data.data.people[i]);
            }

            // if movies and actors can't be split evenly and meet the typeAheadMaxResults requirement
            // fill in the rest with more movies or more actors -- whichever is available
            if (movieTitleList.length + personNameList.length !== typeAheadMaxResults) {
                var j; //counter

                var remainingSlots = typeAheadMaxResults - (movieTitleList.length + personNameList.length);
                // if movie titles were less than half of typeAheadMaxResults then append people
                // otherwise append more movies
                if (data.data.movies.length < typeAheadMaxResults / 2) {
                    for (j = personNameList.length; j + movieTitleList.length < typeAheadMaxResults && j < data.data.people.length; j++) {
                        pushPerson(personNameList, data.data.people[j]);
                    }
                } else {
                    for (j = movieTitleList.length; j + personNameList.length < typeAheadMaxResults && j < data.data.movies.length; j++) {
                        pushMovie(movieTitleList, data.data.movies[j]);
                    }
                }
            }

            var combineResults = movieTitleList.concat(personNameList);

            return combineResults;
        });
    };

    $scope.goToEntity = function (item){
        if (item.type === 'movie') {
            $location.path('/movie/'+item.id);
        }
        if (item.type === 'person') {
            $location.path('/person/'+item.id);
        }
    };
}]);

angular.module('smdb').run(function($rootScope) {
    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
});
