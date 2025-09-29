const allPokemons = [];
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
// "https://pokeapi.co/api/v2/pokemon?limit=40&offset=21"; nächste 20
const TYPE_ICON = {
  bug: "/icons/bug.svg",
  dark: "/icons/dark.svg",
  dragon: "/icons/dragon.svg",
  electric: "/icons/electric.svg",
  fairy: "/icons/fairy.svg",
  fighting: "/icons/fighting.svg",
  fire: "/icons/fire.svg",
  flying: "/icons/flying.svg",
  ghost: "/icons/ghost.svg",
  grass: "/icons/grass.svg",
  ground: "/icons/ground.svg",
  ice: "/icons/ice.svg",
  normal: "/icons/normal.svg",
  poison: "/icons/poison.svg",
  psychic: "/icons/psychic.svg",
  rock: "/icons/rock.svg",
  steel: "/icons/steel.svg",
  water: "/icons/water.svg",
};


async function init() {
  const response = await fetch(BASE_URL)
  const data = await response.json();

  for (let index = 0; index < data.results.length; index++) {
    const names = data.results[index];
    const detailRes = await fetch(names.url);
    const detailData = await detailRes.json();
    const imgUrl = detailData.sprites.other.dream_world.front_default;
    const firstAttribut = detailData.types[0].type.name;
    const firstAttributIcon = TYPE_ICON[firstAttribut];
    const secondAttribut = detailData.types[1]?.type.name;
    const secondAttributIcon = secondAttribut ? TYPE_ICON[secondAttribut] : null;

    let icons = `<img class="attribut-icon" src="${firstAttributIcon}">`;
    if (secondAttributIcon) {
      icons += `<img class="attribut-icon" src="${secondAttributIcon}">`;
    }

    const card = `
    <div class="card-cover">
      <div class="card-header">
        <h5>#${index + 1}</h5>
        <h4>${names.name}</h4>
      </div>
      <div class="pokemon-image">
        <img src="${imgUrl}">
      </div>
      <div class="attributes">
        ${icons}
      </div>
    </div>
    `
    document.getElementById('content').innerHTML += card;
  }
}

function loadMore() {
  const nextTwenty = 20;
  let nextURL = `https://pokeapi.co/api/v2/pokemon?limit=${nextTwenty}&offset=0`;
  init();
}

function showDetails() {

}

function searchPokemon() {

}