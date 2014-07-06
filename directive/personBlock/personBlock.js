angular.module('smdb').directive('personBlock', function() {
	return {
		replace: true,
		scope: {
            person: '='
		},
		templateUrl: 'directive/personBlock/personBlock.html'
	};
});
