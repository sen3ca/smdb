angular.module('smdb').factory('theMovieDbService',['$http', 'tmdbUrl', 'tmdbImageUrl', 'tmdbApiKey', function($http, tmdbUrl, tmdbImageUrl, apiKey) {

    function constructUrl(urlFragment, queryString) {
        if (!queryString) {
            queryString = '';
        }

        if (queryString) {
            return tmdbUrl + urlFragment + '?api_key=' + apiKey + '&' + queryString;
        } else {
            return tmdbUrl + urlFragment + '?api_key=' + apiKey;
        }
    }

    var urlFragments = {
        multi: '/search/multi',
        movie: '/movie/:id',
        person: '/person/:id',
        personsMovies: '/person/:id/movie_credits',
        moviePersons: '/movie/:id/credits',
        moviesNowPlaying: '/movie/now_playing',
        moviesUpcoming: '/movie/upcoming'
    };

    var theMovieDbService = {};

    function objectifyPeopleAndMovies(data) {
        data = angular.fromJson(data);
        var relevantData = {
            people: [],
            movies: []
        };
        for( var i = 0 ; i < data.results.length ; i ++) {
            if(data.results[i].media_type === 'person') {
                relevantData.people.push(data.results[i]);
            }
            if(data.results[i].media_type === 'movie') {
                relevantData.movies.push(data.results[i]);
            }
        }
        return relevantData;
    }

    theMovieDbService.searchMulti = function (searchText) {

        var theUrl = constructUrl(urlFragments.multi, 'query=' + searchText);

        return $http({method: 'GET', url: theUrl, transformResponse: objectifyPeopleAndMovies});

    };

    theMovieDbService.getMovie = function (id) {

        var theUrl = constructUrl(urlFragments.movie.replace(':id', id));

        return $http({method: 'GET', url: theUrl}).then(function (data) {
            return data;
        });

    };

    theMovieDbService.getPerson = function (id) {

        var theUrl = constructUrl(urlFragments.person.replace(':id', id));

        return $http({method: 'GET', url: theUrl}).then(function (data) {
            console.log(data);
            return data;
        });

    };

    theMovieDbService.getPersonsMovies = function (id) {

        var theUrl = constructUrl(urlFragments.personsMovies.replace(':id', id));

        return $http({method: 'GET', url: theUrl}).then(function (data) {
            console.log(data);
            return data;
        });

    };

    theMovieDbService.getMoviePersons = function (id) {

        var theUrl = constructUrl(urlFragments.moviePersons.replace(':id', id));

        return $http({method: 'GET', url: theUrl}).then(function (data) {
            console.log(data);
            return data;
        });

    };

    theMovieDbService.getMoviesNowPlaying = function () {

        var theUrl = constructUrl(urlFragments.moviesNowPlaying);

        return $http({method: 'GET', url: theUrl}).then(function (data) {
            return data;
        });

    };

    theMovieDbService.getMoviesUpcoming = function () {

        var theUrl = constructUrl(urlFragments.moviesUpcoming);

        return $http({method: 'GET', url: theUrl}).then(function (data) {
            return data;
        });

    };

    theMovieDbService.getImageUrl = function (id) {
        var imageUrl = tmdbImageUrl + id;
        return imageUrl;
    };

    theMovieDbService.getImdbUrl = function (id) {
        if(id.indexOf('tt') === 0) {
            return 'http://www.imdb.com/title/' + id;
        }


    };

    console.log(tmdbUrl);
    console.log(apiKey);

	return theMovieDbService;

}]);