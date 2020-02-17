$('[data-mod]').click(function () {
    var target = $(this).attr('data-mod');
    console.log(target);
    if (target == 'close') {
        $('.container-modal-window').removeClass('active');
    }
    else {
        $('.container-modal-window' + target).addClass('active');
    }

});
