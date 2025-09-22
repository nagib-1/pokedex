let allPokemons = [];
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";


async function init() {
    let response = await fetch(BASE_URL)
    let keysArray = await response.json();
    for (let index = 0; index < keysArray.length; index++) {
        allPokemons.push({
            id: keysArray[index],
            pokemon: response[keysArray[index]]
        })

    }
    console.log(keysArray.results[0]);
    document.getElementById('content'). innerHTML = keysArray.results[0];
}
