$.fn.mm = function (options) {

    ///vars

    var params = $.extend({
        animationSpeed: 300
    }, options);

    var $selector = this;
    var maxDistance = 300;
    var x1 = 0;
    var x2 = 0;

    ///controllers

    function menuController(action) {
        if (action == 'open') {
            $selector.addClass('active');
        }
        else if (action == 'close') {

            $selector.removeClass('active');
        }
        else {
            console.error('Incorect value of action in menuController() function')
        }
    }
    //init

    $selector.css('transition', 'all ' + params.animationSpeed + 'ms ease');
    $selector.find('.menu-bar').css('transition', 'all ' + params.animationSpeed + 'ms ease');

    //actions

    $(window).mousedown(function (e) {

        x1 = e.pageX;
        console.log('touchstart', x1);

    });
    $(window).mouseup(function (e) {
        var distance = 0;
        x2 = e.pageX;
        distance = x2 - x1;

        if (Math.abs(distance) >= maxDistance) {
            (distance > 0) ? menuController('open') : menuController('close');
        }

    });
}