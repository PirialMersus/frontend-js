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
    $('.drop_menu').css('transition', 'all ' + params.speed + 'ms ease')
    $('.list_item').css('color', params.itemsColor);
    $('.list_item').css('background-color', params.backgroundItems);

    // Actions
    $('.dropdown .drop_btn').click(function () {

        if ($(this).parent().hasClass('active')) {
            $('.dropdown').removeClass('active');
        }
        else {
            $('.dropdown').removeClass('active');
            $(this).parent().addClass('active');
        }
    });
}


