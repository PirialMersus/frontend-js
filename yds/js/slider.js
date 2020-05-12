$.fn.slider = function (options) {

    //vars

    var params = $.extend({
        animationSpeed: 300
    }, options);

    var $selector = this;
    var $sliderContainer = $('.slider_container');
    var $slidesRow = $('.slider_container .slides_row');
    var $arrowLeft = $('.slider_container .arrows.left');
    var $arrowRight = $('.slider_container .arrows.right');
    var $navPoint = $('.slider_container .navigation .pointers');
    var endCount = 2;
    var thirdcount = 0;
    var offset = 0;
    var windowWidth = $('.slider_container').width();
    var slides = $('.slider_container .slides_row .slide').length;
    var slideCount = slides;
    var tempCounter = 1;
    // var possibility = true;
    var x1 = 0;
    var x2 = 0;
    var action = false;
    // var savedPosition = 0;
    var distance = 0;

    // Controllers

    function slidesCopyingAtTheBeginning(zeroThirdcount, zeroSlideCount, zeroTempCounter) {
        thirdcount = zeroThirdcount;
        slideCount = zeroSlideCount;
        tempCounter = zeroTempCounter;
        slidesController(slideCount);
        console.log('slidescontroller из slidesCopyingAtTheBeginning - done');
        $slidesRow.css('transition-duration', '0s');
        offset = offset + (3 * windowWidth);
        $slidesRow.css('width', (slides * windowWidth + 100 + offset) + 'px');
        var sliderItem = $('.slide');
        sliderItem.eq(sliderItem.length - 1).clone().prependTo($('.slides_row'));
        sliderItem.eq(sliderItem.length - 2).clone().prependTo($('.slides_row'));
        sliderItem.eq(sliderItem.length - 3).clone().prependTo($('.slides_row'));
        setTimeout(function () {
            $slidesRow.css('transition-duration', params.animationSpeed + 'ms');
        }, 50);
    }
    function slidesCopyingAtTheEnd() {
        var sliderItem = $('.slide');
        sliderItem.eq(0).clone().appendTo($('.slides_row'));
        sliderItem.eq(1).clone().appendTo($('.slides_row'));
        sliderItem.eq(2).clone().appendTo($('.slides_row'));
        offset = offset + (3 * windowWidth);
        $slidesRow.css('width', (slides * windowWidth + 100 + offset) + 'px');
        endCount = endCount + 3;
    }
    function slidesController(slideCount) {
        var distance = slideCount * windowWidth * (-1);
        $slidesRow.css('transform', 'translateX(' + distance + 'px)');
        console.log('slidescontroller - done');
    }
    function navigationController(slideCount) {
        $navPoint.removeClass('active');
        if (slideCount % 3 == 1)
            $('.pointers[data_nav="2"]').addClass('active');
        else if (slideCount % 3 == 2)
            $('.pointers[data_nav="3"]').addClass('active');
        else $('.pointers[data_nav="1"]').addClass('active');
    }
    function slidesRowController(distance) {
        $slidesRow.css('transform', 'translateX(' + (slideCount * windowWidth * (-1) + distance) + 'px)');
    }

    // Init

    $slidesRow.css('transition-duration', params.animationSpeed + 'ms');
    $slidesRow.css('width', (slides * windowWidth + 100 + offset) + 'px');//??????????? do i need to set this parameter at the begining&
    $('.slide').css('width', windowWidth + 'px');

    //Actions

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
            // setTimeout(function () {
            //     slidesCopyingAtTheBeginning(2, 5, 3);
            //     console.log('slides copiing at the begin done');
            // }, params.animationSpeed);
            $slidesRow.css('transition-duration', '0ms');
            slidesController(6);
            setTimeout(function () {
                $slidesRow.css('transition-duration', params.animationSpeed + 'ms');
                thirdcount = 2;
                slideCount = 5;
                tempCounter = 3;
                slidesController(slideCount);
                navigationController(slideCount);
            }, 30);

            // thirdcount = 2;
            // slideCount = 5;
            // tempCounter = 3;

        }
        if (slideCount >= 3) {
            slidesController(slideCount);
            navigationController(slideCount);
        }

        setTimeout(function () {
            console.log('ArrowLeft');
            console.log('slidecount=', slideCount);
            console.log('tempCounter=', tempCounter);
            console.log('thirdcount=', thirdcount);
            console.log('ArrowLeft');
        }, params.animationSpeed);
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
        var counter = parseFloat($(this).attr('data_nav'));
        console.log('NavPointClick');
        console.log('slideCount=', slideCount);
        console.log('(datanav) =', counter);
        console.log('thirdcount =', thirdcount);
        slidesController(thirdcount * 3 - 4 + counter);
        navigationController(thirdcount * 3 - 4 + counter);
        slideCount = thirdcount * 3 - 4 + counter;
        tempCounter = counter;
    });

    $('.slider_container').mousedown(function (e) {
        $slidesRow.addClass('disable_animation');
        x1 = e.pageX;
        action = true;
    });

    $(window).mouseup(function (e) {
        action = false;
        $slidesRow.removeClass('disable_animation');
        if (distance >= 100) {
            slideCount--;
            tempCounter--;
            if (tempCounter < 1) {
                thirdcount = thirdcount - 1;
                tempCounter = 3;
            }
            if (slideCount < 3) {
                setTimeout(function () {
                    slidesCopyingAtTheBeginning(2, 5, 3);
                }, params.animationSpeed);
            }
            setTimeout(function () {
                console.log('if slideCount--,tempCounter--;');
                console.log('slidecount=', slideCount);
                console.log('tempCounter=', tempCounter);
                console.log('thirdcount=', thirdcount);
                console.log('if slideCount--,tempCounter--;');
            }, params.animationSpeed);
            slidesController(slideCount);
            navigationController(slideCount);
        } else if (distance <= -100) {
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

    $(window).mousemove(function (e) {
        if (action) {
            x2 = e.pageX;
            distance = x2 - x1;
            slidesRowController(distance);
        }
    });

    window.addEventListener('touchstart', function (e) {
        x1 = e.touches[0].pageX;
        $slidesRow.addClass('disable_animation');
        action = true;
    });

    window.addEventListener('touchend', function (e) {
        action = false;
        $slidesRow.removeClass('disable_animation');
        if (distance >= 100) {
            slideCount--;
            tempCounter--;
            if (tempCounter < 1) {
                thirdcount = thirdcount - 1;
                tempCounter = 3;
            }
            if (slideCount < 3) {
                setTimeout(function () {
                    slidesCopyingAtTheBeginning(2, 5, 3);
                }, params.animationSpeed);
            }
            setTimeout(function () {
                console.log('if slideCount--,tempCounter--;');
                console.log('slidecount=', slideCount);
                console.log('tempCounter=', tempCounter);
                console.log('thirdcount=', thirdcount);
                console.log('if slideCount--,tempCounter--;');
            }, params.animationSpeed);
            slidesController(slideCount);
            navigationController(slideCount);
        } else if (distance <= -100) {
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

}