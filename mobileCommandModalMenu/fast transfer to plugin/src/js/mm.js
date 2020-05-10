$.fn.mm = function (options) {

    // Vars
    var params = $.extend({
        animationSpeed: 300
    }, options);

    var $selector = this;
    var maxDistance = 300;
    var x1 = 0;
    var x2 = 0;

    // Controllers
    function menuController(action) {
        if (action == 'open') {
            $selector.addClass('active');
        } else if (action == 'close') {
            $selector.removeClass('active');
        } else {
            console.error('Incorect value of action in menuController() function');
        }
    }


    // Init
    $selector.css('transition', 'all ' + params.animationSpeed + 'ms ease');
    $selector.find('.menu-bar').css('transition', 'all ' + params.animationSpeed + 'ms ease');

    // Actions
    window.addEventListener('touchstart', function (e) {
        x1 = e.touches[0].pageX;

    });
    window.addEventListener('touchend', function (e) {
        x2 = e.changedTouches[0].pageX;
        var distance = x2 - x1;

        if (Math.abs(distance) >= maxDistance) {
            (distance > 0) ? menuController('open') : menuController('close');
        }
    });

    $(window).mousedown(function (e) {
        // console.log('down', e.pageX);
        x1 = e.pageX;
    });
    $(window).mouseup(function (e) {
        // console.log('up', e.pageX);
        x2 = e.pageX;
        var distance = x2 - x1;

        if (Math.abs(distance) >= maxDistance) {
            (distance > 0) ? menuController('open') : menuController('close');
        }

    });
}