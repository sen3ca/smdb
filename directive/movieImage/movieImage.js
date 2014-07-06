angular.module('smdb').directive('movieImage', ['theMovieDbService', function(tmdbService) {
	return {
        transclude: true,
		scope: {
            imageFile: '=',
            doneLoading: '=',
            size: '@',
            type: '@',
            boundBy: '@'
		},

		templateUrl: 'directive/movieImage/movieImage.html',
		link: function(scope) {
            scope.$watch('imageFile', function(imageFile) {
                switch(scope.type) {
                    case 'movie':
                        scope.glyphClass = 'glyphicon-film';
                        break;
                    case 'person':
                        scope.glyphClass = 'glyphicon-user';
                        break;
                    default:
                        scope.glyphClass = 'glyphicon-ban-circle';
                        break;
                }

                if(!imageFile) {
                    if(scope.size === 'original') {
                        scope.size = 'medium';
                    }
                    return;
                }

                switch(scope.size) {
                    case 'original':
                        scope.width = '';
                        scope.height = '';
                        break;
                    case 'small':
                        scope.width = '48px';
                        scope.height = '70px';
                        break;
                    case 'medium':
                        scope.width = '185px';
                        scope.height = '278px';
                        break;
                    default:
                        scope.width = '370px';
                        scope.height = '556px';
                        break;
                }

                if (scope.imageFile) {
                    scope.imageUrl = tmdbService.getImageUrl(imageFile);
                } else if (!scope.size) {
                    scope.size = 'small';
                }
            });

		}
	};
}]);
