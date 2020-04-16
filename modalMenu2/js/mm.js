$.fn.mm = function (options) {

    ///vars

    var params = $.extend({
        animationSpeed: 300,
        autoMove: true
    }, options);

    var $selector = this;
    var maxDistance = 300;
    var x1 = 0;
    var x2 = 0;
    var action = false;
    var savedPosition = 0;
    var distance = 0;

    ///controllers

    function menuController(value) {
        $selector.find('.menu-bar').css('transform', 'translateX(' + value + 'px)');
        $selector.css('opacity', 1 / maxDistance * value);
    }
    //init

    // $selector.css('transition', 'all ' + params.animationSpeed + 'ms ease');
    // $selector.find('.menu-bar').css('transition', 'all ' + params.animationSpeed + 'ms ease');

    //actions

    $(window).mousedown(function (e) {
        $selector.addClass('disable-animation');
        x1 = e.pageX;
        action = true;

    });
    $(window).mouseup(function (e) {
        $selector.removeClass('disable-animation');

        action = false;
        savedPosition = distance;

        if (params.autoMove) {
            if (distance >= (maxDistance / 2)) {
                savedPosition = maxDistance;
                menuController(maxDistance);
            }
            else {
                savedPosition = 0;
                menuController(0);
            }
        }

    });
    $(window).mousemove(function (e) {
        if (action) {
            x2 = e.pageX;
            distance = savedPosition + (x2 - x1);
            if (distance >= maxDistance) distance = maxDistance;
            if (distance <= 0) distance = 0;

            menuController(distance);
        }
    });
}