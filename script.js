const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=25&offset=0";
const TYPE_DATA = {
  bug: { icon: "/icons/bug.svg", color: "#A8B820" },
  dark: { icon: "/icons/dark.svg", color: "#705848" },
  dragon: { icon: "/icons/dragon.svg", color: "#7038F8" },
  electric: { icon: "/icons/electric.svg", color: "#F8D030" },
  fairy: { icon: "/icons/fairy.svg", color: "#EE99AC" },
  fighting: { icon: "/icons/fighting.svg", color: "#C03028" },
  fire: { icon: "/icons/fire.svg", color: "#F08030" },
  flying: { icon: "/icons/flying.svg", color: "#A890F0" },
  ghost: { icon: "/icons/ghost.svg", color: "#705898" },
  grass: { icon: "/icons/grass.svg", color: "#78C850" },
  ground: { icon: "/icons/ground.svg", color: "#E0C068" },
  ice: { icon: "/icons/ice.svg", color: "#98D8D8" },
  normal: { icon: "/icons/normal.svg", color: "#A8A878" },
  poison: { icon: "/icons/poison.svg", color: "#A040A0" },
  psychic: { icon: "/icons/psychic.svg", color: "#F85888" },
  rock: { icon: "/icons/rock.svg", color: "#B8A038" },
  steel: { icon: "/icons/steel.svg", color: "#B8B8D0" },
  water: { icon: "/icons/water.svg", color: "#6890F0" },
};
const limit = 25;
let offset = 25;

async function init() {
  showLoader();

  try {
    const response = await fetch(BASE_URL)
    const data = await response.json();

    for (let index = 0; index < data.results.length; index++) {
      const names = data.results[index];
      const detailRes = await fetch(names.url);
      const detailData = await detailRes.json();
      const imgUrl = detailData.sprites.other.dream_world.front_default;

      const firstAttribut = detailData.types[0].type.name;
      const firstType = TYPE_DATA[firstAttribut];
      const firstAttributIcon = firstType?.icon;
      const backgroundCart = firstType?.color;

      const secondAttribut = detailData.types[1]?.type?.name;
      const secondType = secondAttribut ? TYPE_DATA[secondAttribut] : null;
      const secondAttributIcon = secondType?.icon;

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
      <div class="pokemon-image" style="background:${backgroundCart}">
        <img src="${imgUrl}">
      </div>
      <div class="attributes">
        ${icons}
      </div>
    </div>
    `
      document.getElementById('content').innerHTML += card;
    }
  } catch {
    document.getElementById("content").innerHTML =
      `<p>ERROR</p>`;
  } finally {
    hideLoader();
  }
}

async function loadMore() {
  const btn = document.getElementById('loadMoreButton');
  btn.disabled = true;
  showLoader();

  try {
    const nextUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(nextUrl)
    const data = await response.json();

    for (let index = 0; index < data.results.length; index++) {
      const names = data.results[index];
      const detailRes = await fetch(names.url);
      const detailData = await detailRes.json();
      const imgUrl = detailData.sprites.other.dream_world.front_default;

      const firstAttribut = detailData.types[0].type.name;
      const firstType = TYPE_DATA[firstAttribut];
      const firstAttributIcon = firstType?.icon;
      const backgroundCart = firstType?.color;

      const secondAttribut = detailData.types[1]?.type.name;
      const secondType = secondAttribut ? TYPE_DATA[secondAttribut] : null;
      const secondAttributIcon = secondType?.icon;

      let icons = `<img class="attribut-icon" src="${firstAttributIcon}">`;
      if (secondAttributIcon) {
        icons += `<img class="attribut-icon" src="${secondAttributIcon}">`;
      }

      const card = `
    <div class="card-cover">
      <div class="card-header">
        <h5>#${index + offset + 1}</h5>
        <h4>${names.name}</h4>
      </div>
      <div class="pokemon-image" style="background:${backgroundCart}">
        <img src="${imgUrl}">
      </div>
      <div class="attributes">
        ${icons}
      </div>
    </div>
    `

      document.getElementById('content').innerHTML += card;
    }

    offset += limit;
  } catch {
    `<p>Error</p>`
  } finally {
    hideLoader();
    btn.disabled = false;
  }
}

function showLoader() {
  const loader = document.querySelector(".loader");
  loader?.classList.remove("loader-hidden");
}
function hideLoader() {
  const loader = document.querySelector(".loader");
  loader?.classList.add("loader-hidden");
}

function showDetails() {

}

function searchPokemon() {

}