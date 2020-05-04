var $box = document.querySelector('.box');
var $colorBtn = document.querySelector('.btn.color');
var $leftBtn = document.querySelector('.btn.left');
var $rightBtn = document.querySelector('.btn.right');

var distance = 0;

$colorBtn.addEventListener('click', function () {
    console.log('some')
    $box.classList.add('red');
});

$leftBtn.addEventListener('click', function () {
    distance -= 50;
    $box.style.cssText = 'transform: translateX(' + distance + 'px)';
});

$rightBtn.addEventListener('click', function () {
    distance += 50;
    $box.style.cssText = 'transform: translateX(' + distance + 'px)';
});