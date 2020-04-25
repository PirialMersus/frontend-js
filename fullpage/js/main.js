
function setHash(value) {
    window.location.hash = value;
}
function getHash() {
    return window.location.hash.toString().slice(1);
}


if ($(window).width() > 900) {
    function moveToSlideByAnchor(value) {
        var index = parseFloat($('.slide[data-anchor="' + value + '"]').attr('data-index')) - 1;
        $.fn.fullpage.moveTo('section', index);
    }
    $('.container-fullpage').fullpage({
        // controlArrows: false,
        // scrollHorizontally: true,
        lockAnchors: true,
        afterRender: function () {
            console.log(getHash());
            moveToSlideByAnchor(getHash());
        },

        afterSlideLoad: function (currentSectionAnchor, currentSectionIndex, currentSlideAnchor) {
            $('.container-fullpage .slide[data-anchor=' + currentSlideAnchor + '] .content').addClass('active');
            setHash(currentSlideAnchor);
            if ($('.container-fullpage .slide[data-anchor=' + currentSlideAnchor + ']').hasClass('white')) {
                $('.nav-bar').css('background-color', '#ffffff');
                $('.nav-bar-link').css('color', '#000000');
            }
            else {
                $('.nav-bar').css('background-color', '#000000');
                $('.nav-bar-link').css('color', '#ffffff');
            }

        },
        onSlideLeave: function (currentSectionAnchor, currentSectionIndex, prevSlideIndex) {
            $('.container-fullpage .slide .content').removeClass('active');

        }
    });

    $('[data-nav-slide]').click(function () {
        var target = $(this).attr('data-nav-slide');
        moveToSlideByAnchor(target);
    });
}

