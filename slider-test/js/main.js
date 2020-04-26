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


    // setTimeout(function () {
    $slidesRow.css('transition-duration', '0.3s');

    // }, 0);


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
console.log('при запуске');
console.log('slidecount=', slideCount);
console.log('tempCounter=', tempCounter);
console.log('thirdcount=', thirdcount);
console.log('при запуске');

$arrowLeft.click(function () {


    slideCount--;
    tempCounter--;
    if (tempCounter < 1) {
        thirdcount = thirdcount - 1;
        tempCounter = 3;
    }


    if (slideCount < 3) {
        setTimeout(function () {
            slidesCopyingAtTheBeginning(2, 5, 3);
        }, 300);
    }
    slidesController(slideCount);//

    navigationController(slideCount);

    setTimeout(function () {
        console.log('ArrowLeft');
        console.log('slidecount=', slideCount);
        console.log('tempCounter=', tempCounter);
        console.log('thirdcount=', thirdcount);
        console.log('ArrowLeft');
    }, 300);


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
    console.log('ArrowRight');
    console.log('slidecount=', slideCount);
    console.log('tempCounter=', tempCounter);
    console.log('thirdcount=', thirdcount);
    console.log('ArrowRight');
});

$navPoint.click(function () {

    var counter = parseFloat($(this).attr('data-nav'));
    console.log('NavPointClick');

    console.log('slideCount=', slideCount);
    console.log('(datanav) =', counter);
    console.log('thirdcount =', thirdcount);


    slidesController(thirdcount * 3 - 4 + counter);
    navigationController(thirdcount * 3 - 4 + counter);
    slideCount = thirdcount * 3 - 4 + counter;
    tempCounter = counter;
});

///////////



var x1 = 0;
var x2 = 0;
var action = false;
var savedPosition = 0;
var distance = 0;
//////////
function slidesRowController(distance) {

    $slidesRow.css('transform', 'translateX(' + (slideCount * windowWidth * (-1) + distance) + 'px)');
}

$(window).mousedown(function (e) {
    $slidesRow.addClass('disable-animation');
    x1 = e.pageX;
    action = true;

});

$(window).mouseup(function (e) {
    action = false;
    $slidesRow.removeClass('disable-animation');

    if (distance >= 150) {
        slideCount--;
        tempCounter--;

        if (tempCounter < 1) {
            thirdcount = thirdcount - 1;
            tempCounter = 3;
        }


        if (slideCount < 3) {
            setTimeout(function () {
                slidesCopyingAtTheBeginning(2, 5, 3);
            }, 300);
        }
        setTimeout(function () {
            console.log('if slideCount--,tempCounter--;');
            console.log('slidecount=', slideCount);
            console.log('tempCounter=', tempCounter);
            console.log('thirdcount=', thirdcount);
            console.log('if slideCount--,tempCounter--;');
        }, 300);



        slidesController(slideCount);
        navigationController(slideCount);


    } else if (distance <= -150) {
        slideCount++;
        tempCounter++;

        if (tempCounter > 3) {
            thirdcount = thirdcount + 1;
            tempCounter = 1;
        }

        if (endCount < slideCount) {
            slidesCopyingAtTheEnd();
        }
        console.log('if slideCount++,tempCounter++;');
        console.log('slidecount=', slideCount);
        console.log('tempCounter=', tempCounter);
        console.log('thirdcount=', thirdcount);
        console.log('if slideCount++,tempCounter++;')
        slidesController(slideCount);
        navigationController(slideCount);
    } else {
        console.log('if distance is a too little');
        console.log('slidecount=', slideCount);
        console.log('tempCounter=', tempCounter);
        console.log('thirdcount=', thirdcount);
        console.log('if distance is a too little')
        slidesController(slideCount);
        navigationController(slideCount);
    }
    distance = 0;////////////////////////////
});

$(window).mousemove(function (e) {
    if (action) {
        x2 = e.pageX;

        distance = x2 - x1;


        // distance = savedPosition + (x2 - x1);

        slidesRowController(distance);

    }

});


///////////////////

//mobile 

///////7

window.addEventListener('touchstart', function (e) {
    x1 = e.touches[0].pageX;
    $slidesRow.addClass('disable-animation');
    action = true;
});

window.addEventListener('touchend', function (e) {
    action = false;
    $slidesRow.removeClass('disable-animation');
    if (distance >= 150) {
        slideCount--;
        tempCounter--;

        if (tempCounter < 1) {
            thirdcount = thirdcount - 1;
            tempCounter = 3;
        }


        if (slideCount < 3) {
            setTimeout(function () {
                slidesCopyingAtTheBeginning(2, 5, 3);
            }, 300);
        }
        setTimeout(function () {
            console.log('if slideCount--,tempCounter--;');
            console.log('slidecount=', slideCount);
            console.log('tempCounter=', tempCounter);
            console.log('thirdcount=', thirdcount);
            console.log('if slideCount--,tempCounter--;');
        }, 300);



        slidesController(slideCount);
        navigationController(slideCount);


    } else if (distance <= -150) {
        slideCount++;
        tempCounter++;

        if (tempCounter > 3) {
            thirdcount = thirdcount + 1;
            tempCounter = 1;
        }

        if (endCount < slideCount) {
            slidesCopyingAtTheEnd();
        }
        console.log('if slideCount++,tempCounter++;');
        console.log('slidecount=', slideCount);
        console.log('tempCounter=', tempCounter);
        console.log('thirdcount=', thirdcount);
        console.log('if slideCount++,tempCounter++;')
        slidesController(slideCount);
        navigationController(slideCount);
    } else {
        console.log('if distance is a too little');
        console.log('slidecount=', slideCount);
        console.log('tempCounter=', tempCounter);
        console.log('thirdcount=', thirdcount);
        console.log('if distance is a too little')
        slidesController(slideCount);
        navigationController(slideCount);
    }
    distance = 0;
});

window.addEventListener('touchmove', function (e) {
    if (action) {

        x2 = e.changedTouches[0].pageX;
        distance = x2 - x1;
        slidesRowController(distance);
    }
});