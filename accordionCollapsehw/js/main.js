$('[data-btn]').click(function () {
    var target = $(this).attr('data-btn');
    console.log(target);
    if ($('.par' + target).hasClass('active')) {
        $('.par' + target).removeClass('active');
    } else {
        $('.par' + target).addClass('active');
    }

});


