angular.module('smdb').directive('movieBlock', function() {
	return {
		replace: true,
		scope: {
            movie: '='
		},
		templateUrl: 'directive/movieBlock/movieBlock.html'
	};
});
