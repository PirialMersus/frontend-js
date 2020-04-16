// var $sliderContainer = $('.slider-container');
// var $slidesRow = $('.slider-container .slides-row');
// var $arrowLeft = $('.slider-container .arrows.left');
// var $arrowRight = $('.slider-container .arrows.right');
// var $navPoint = $('.slider-container .navigation .pointers');

// var windowWidth = $(window).width();
// var slideCount = 0;
// var slides = $('.slider-container .slides-row .slide').length;
// $slidesRow.css('width', (slides * windowWidth + windowWidth + 100) + 'px');


// function slidesController(slideCount) {
//     var distance = slideCount * windowWidth * (-1);
//     $slidesRow.css('transform', 'translateX(' + distance + 'px)');
// }

// function navigationController(slideCount) {
//     $navPoint.removeClass('active');
//     $('.pointers[data-nav="' + (slideCount + 1) + '"]').addClass('active');
// }

// $arrowLeft.click(function () {
//     $('.slider-container .slide:last').prependTo('.slides-row');
//     slideCount--;
//     if (slideCount < 0) slideCount = slides - 1;
//     slidesController(slideCount);
//     navigationController(slideCount);
// });
// $arrowRight.click(function () {
//     $('.slider-container .slide:first').appendTo('.slides-row');
//     slideCount++;
//     if (slideCount >= slides) slideCount = 0;
//     slidesController(slideCount);
//     navigationController(slideCount);

// });

// $navPoint.click(function () {
//     var counter = parseFloat($(this).attr('data-nav'));
//     slidesController(counter - 1);
//     navigationController(counter - 1);
//     slideCount = counter - 1;
// });

var i = 1;
var sliderItem = $('.slide');
// var sliderDot = $('.pointers');
// console.log(sliderDot);

// function animateLeft(index){
//     sliderItem.eq(index).css({ left: -100 + '%' });
//     sliderItem.eq(index).animate({ left: 0 }, 1000);
// }
// function animateRight(index){
//     sliderItem.eq(index).css({ left: 100 + '%' });
//     sliderItem.eq(index).animate({ left: 0 }, 1000);
//     sliderItem.eq(index - 1).animate({ left: -100 + '%' }, 1000);
// }

$('.left').click(function () {
    // sliderDot.eq(i).removeClass('active');
    $('.pointers').removeClass('active');
    i--;
    if (i < 0)
        i = sliderItem.length - 1;
    // sliderDot.eq(i).addClass('active');
    $('.pointers[data-nav="' + (i + 1) + '"]').addClass('active');
    sliderItem.eq(i).css({ left: -100 + '%' });
    sliderItem.eq(i).animate({ left: 0 }, 500);
    if (i == sliderItem.length - 1)
        sliderItem.eq(0).animate({ left: 100 + '%' }, 500);
    else { sliderItem.eq(i + 1).animate({ left: 100 + '%' }, 500); }
});

$('.right').click(function () {
    $('.pointers').removeClass('active');
    // sliderDot.eq(i).removeClass('active');
    i++;
    if (i > sliderItem.length - 1)
        i = 0;
    // sliderDot.eq(i).addClass('active');
    $('.pointers[data-nav="' + (i + 1) + '"]').addClass('active');
    sliderItem.eq(i).css({ left: 100 + '%' });
    sliderItem.eq(i).animate({ left: 0 }, 500);
    sliderItem.eq(i - 1).animate({ left: -100 + '%' }, 500);

});

$('.pointers').click(function () {
    // sliderDot.eq(i).removeClass('active');
    let j = i;
    i = $(this).index();
    console.log(i);
    // sliderDot.eq(i).addClass('active');
    $('.pointers').removeClass('active');
    $('.pointers[data-nav="' + (i + 1) + '"]').addClass('active');
    if (i > j) {
        sliderItem.eq(i).css({ left: 100 + '%' });
        sliderItem.eq(i).animate({ left: 0 }, 500);

        sliderItem.eq(j).animate({ left: -100 + '%' }, 500);

    }
    if (i < j) {
        sliderItem.eq(i).css({ left: -100 + '%' });
        sliderItem.eq(i).animate({ left: 0 }, 500);
        sliderItem.eq(j).animate({ left: 100 + '%' }, 500);

    }

});
