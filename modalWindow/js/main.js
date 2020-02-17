$('[data-mod]').click(function () {

    var target = $(this).attr('data-mod');
    console.log(target);
    if (target == 'close') {
        $('.container-window').removeClass('active');
    } else {
        $('.container-window' + target).addClass('active');
    }

});