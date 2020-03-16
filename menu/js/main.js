$('[data-mod]').click(function () {
    var target = $(this).attr('data-mod');
    console.log(target);
    if (target == 'open') {
        $('.menu').addClass('active');
        $('.overlay').addClass('active');
    }
    else {
        $('.menu').removeClass('active');
        $('.overlay').removeClass('active');
    }

});
