// var $btn = document.querySelectorAll('.btn');
// var $dropdown = document.querySelectorAll('.dropdown');

// $btn.forEach(function (element) {
//     element.addEventListener('click', function () {
//         if (this.parentNode.classList.contains('active'))
//             $dropdown.forEach(function (element) {
//                 element.classList.remove('active')
//             });
//         else {
//             $dropdown.forEach(function (element) {
//                 element.classList.remove('active')
//             });
//             this.parentNode.classList.add('active');
//         }



//     });
// });



var drop1 = new Dropdown({
    el: '.dropdown.v1',
});
var drop2 = new Dropdown({
    el: '.dropdown.v2',
    speed: 1000
});

// setTimeout(function () {
//     drop1.open();
// }, 2000);