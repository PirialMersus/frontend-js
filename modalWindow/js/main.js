$('.container-buttons .buttons').click(function () {

    var target = $(this).attr('data-mod');
    console.log(target);

    $('.container-window .modal-window' + target).parent().addClass('active');

})
$('.container-window .modal-window .close').click(function () {
    $('.container-window').removeClass('active');
})