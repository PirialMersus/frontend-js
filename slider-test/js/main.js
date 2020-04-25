var $sliderContainer = $('.slider-container');
var $slidesRow = $('.slider-container .slides-row');
var $arrowLeft = $('.slider-container .arrows.left');
var $arrowRight = $('.slider-container .arrows.right');
var $navPoint = $('.slider-container .navigation .pointers');

var endCount = 2;
var thirdcount = 0;
var offset = 0;
var windowWidth = $(window).width();
var slides = $('.slider-container .slides-row .slide').length;
var slideCount = slides;
var tempCounter = 1;


function slidesCopyingAtTheBeginning(zeroThirdcount, zeroSlideCount, zeroTempCounter) {

    thirdcount = zeroThirdcount;
    slideCount = zeroSlideCount;
    tempCounter = zeroTempCounter;
    slidesController(slideCount);
    $slidesRow.css('transition-duration', '0s');
    offset = offset + (3 * windowWidth);
    $slidesRow.css('width', (slides * windowWidth + 100 + offset) + 'px');

    var sliderItem = $('.slide');
    sliderItem.eq(sliderItem.length - 1).clone().prependTo($('.slides-row'));
    sliderItem.eq(sliderItem.length - 2).clone().prependTo($('.slides-row'));
    sliderItem.eq(sliderItem.length - 3).clone().prependTo($('.slides-row'));


    setTimeout(function () {
        $slidesRow.css('transition-duration', '0.3s');

    }, 50);


}
function slidesCopyingAtTheEnd() {
    var sliderItem = $('.slide');
    sliderItem.eq(0).clone().appendTo($('.slides-row'));
    sliderItem.eq(1).clone().appendTo($('.slides-row'));
    sliderItem.eq(2).clone().appendTo($('.slides-row'));
    offset = offset + (3 * windowWidth);
    $slidesRow.css('width', (slides * windowWidth + 100 + offset) + 'px');
    endCount = endCount + 3;
}



function slidesController(slideCount) {
    var distance = slideCount * windowWidth * (-1);
    $slidesRow.css('transform', 'translateX(' + distance + 'px)');
}

function navigationController(slideCount) {
    $navPoint.removeClass('active');
    if (slideCount % 3 == 1)
        $('.pointers[data-nav="2"]').addClass('active');
    else if (slideCount % 3 == 2)
        $('.pointers[data-nav="3"]').addClass('active');
    else $('.pointers[data-nav="1"]').addClass('active');
}

slidesCopyingAtTheBeginning(2, 3, 1);
slidesCopyingAtTheEnd();
console.log('thirdcount=', thirdcount);

$arrowLeft.click(function () {


    slideCount--;
    tempCounter--;
    if (tempCounter < 0) {
        thirdcount = thirdcount - 1;
        tempCounter = 3;
    }


    slidesController(slideCount);//
    if (slideCount < 3) {
        setTimeout(function () {
            slidesCopyingAtTheBeginning(2, 5, 3);
        }, 300);
    }

    navigationController(slideCount);
    console.log(tempCounter);
    console.log('thirdcount=', thirdcount);

});
$arrowRight.click(function () {
    slideCount++;
    tempCounter++;
    if (tempCounter > 3) {
        thirdcount = thirdcount + 1;
        tempCounter = 1;
    }

    if (endCount < slideCount) {
        slidesCopyingAtTheEnd();
    }
    slidesController(slideCount);


    navigationController(slideCount);
    console.log(tempCounter);
    console.log('thirdcount=', thirdcount);
});

$navPoint.click(function () {

    var counter = parseFloat($(this).attr('data-nav'));
    console.log('slideCount=', slideCount);
    console.log('(datanav) =', counter);
    console.log('thirdcount =', thirdcount);


    slidesController(thirdcount * 3 - 4 + counter);
    navigationController(thirdcount * 3 - 4 + counter);
    slideCount = thirdcount * 3 - 4 + counter;
    tempCounter = counter;
});