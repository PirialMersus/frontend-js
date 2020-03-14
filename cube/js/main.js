var $start = $('.btn.start');
var $pause = $('.btn.pause');
var $stop = $('.btn.stop');

var $box = $('.box')

var action = false;

var deg = 0;
var intervalId = 0;

function rotate(deg) {

    $box.css('transform', 'rotateY(' + deg + 'deg)');
}

$start.click(function () {
    if (!action) {
        action = true;
        intervalId = setInterval(function () {
            deg++;
            if (deg >= 360) {
                deg = 0;
            }
            rotate(deg);
        }, 17);
    }
});

$pause.click(function () {
    clearInterval(intervalId);
    action = false;
});

$stop.click(function () {
    clearInterval(intervalId);
    deg = 0;
    rotate(deg);
    action = false;
});