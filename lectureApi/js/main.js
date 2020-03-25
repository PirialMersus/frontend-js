// var numbers = ['Andrew', 'Gena', 'Maria'];

// var user = {
//     name: 'Andrew',
//     age: '32'
// }

// user.name;

// var users = [
//     {
//         name: 'Nikolai',
//         age: '28'
//     },
//     {
//         name: 'Andrew',
//         age: '32'
//     },
//     {
//         name: 'Irina',
//         age: '22'
//     }
// ]
// users[2].name;

var $users = $('.users');

function userController(users) {
    var template = '';
    for (i = 0; i < 10; i++) {
        template += '<li>' + users[i].name + '</li>'

    }
    console.log(template);
    $users.html(template);
}

$.getJSON('https://swapi.co/api/people/')
    .done(function (data) {
        console.log(data.results);
        userController(data.results);
    });



