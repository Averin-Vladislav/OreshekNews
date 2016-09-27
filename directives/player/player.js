app.directive('player', function() {
    return {
        require: '^OreshekNewsController',
        restrict: 'E',
        templateUrl: '../../directives/player/player.html',
        controller: function($scope) {
            if (!device.tablet() && !device.mobile() && !$scope.isIE()) {
                $(".player").mb_YTPlayer({
                videoURL:'https://www.youtube.com/watch?v=-ILqHSH4X_w',
                containment:'header',
                autoPlay:true,
                mute:true,
                startAt:10,
                opacity:1,
                showControls : false
                });
            } else {
                $("body").addClass("background");
            };
        }
    };
});