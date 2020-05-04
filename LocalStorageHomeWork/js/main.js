function userController(users) {
    for (var i = 0; i < users.length; i++) {

    }
}


var request = new XMLHttpRequest();
request.open('GET', 'https://pokeapi.co/api/v2/pokemon/', true);

request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
        // при успешном подключении 

        var data = JSON.parse(this.response);
        // console.log(data.results);
        localStorage.setItem('pokemons', JSON.stringify(data.results));
    } else {
        // подключились к серверу, но он вернул ошибку 
    }
};

request.onerror = function () {
    // ошибка подключения 
};

request.send();

var pokemons = JSON.parse(localStorage.getItem('pokemons'));

// console.log(pokemons);

var pokemonsToSite = '';
for (var i = 0; i < pokemons.length; i++) {
    pokemonsToSite = pokemonsToSite + '<li>' + JSON.stringify(pokemons[i]) + '</li>';
}
console.log(pokemonsToSite);
document.querySelector('.pokemons').innerHTML = pokemonsToSite;

