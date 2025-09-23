let allPokemons = [];
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

async function init() {
  const content = document.getElementById('content');

  const response = await fetch(BASE_URL)
  const data = await response.json();

  const fragment = document.createDocumentFragment();

  for (let index = 0; index < data.results.length; index++) {
    const names = data.results[index];

    const detailRes = await fetch(names.url);
    const detailData = await detailRes.json();
    const imgUrl = detailData.sprites.other.dream_world.front_default;

    const card = document.createElement('div');
    card.className = 'pokemon-card';
    const title = document.createElement('h3');
    title.textContent = names.name;
    const img = document.createElement('img');
    img.src = imgUrl;

    card.appendChild(title);
    card.appendChild(img);
    fragment.appendChild(card);

    console.log(data.results[index]);
    console.log(names.name, imgUrl);
  }

  content.appendChild(fragment)
}

//Bilder SVG
/* 

  "sprites": {
    "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
    "back_female": null,
    "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
    "back_shiny_female": null,
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "front_female": null,
    "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
    "front_shiny_female": null,
    "other": {
      "dream_world": {
        "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
        "front_female": null
      }, */