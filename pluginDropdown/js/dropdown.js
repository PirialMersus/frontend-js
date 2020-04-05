$.fn.dropdown = function (options) {

}
$.fn.dropdown = function (options) {
    // Vars
    var params = $.extend({
        speed: 300,
        itemsColor: 'black',
        backgroundItems: 'white'
    }, options)
    $selector = this;

    // Controllers


    // Init
    $selector.find('.drop_menu').css('transition', 'all ' + params.speed + 'ms ease');
    $selector.find('.list_item').css('color', params.itemsColor);
    $selector.find('.list_item').css('background-color', params.backgroundItems);

    // Actions
    $('.dropdown .drop_btn').click(function () {

        if ($(this).parent().hasClass('active')) {
            $selector.removeClass('active');
        }
        else {
            $selector.removeClass('active');
            $(this).parent().addClass('active');
        }
    });
}


