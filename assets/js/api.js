const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0";
const TYPE_DATA = {
    bug: { icon: "./icons/bug.svg", color: "#A8B820" },
    dark: { icon: "./icons/dark.svg", color: "#705848" },
    dragon: { icon: "./icons/dragon.svg", color: "#7038F8" },
    electric: { icon: "./icons/electric.svg", color: "#F8D030" },
    fairy: { icon: "./icons/fairy.svg", color: "#EE99AC" },
    fighting: { icon: "./icons/fighting.svg", color: "#C03028" },
    fire: { icon: "./icons/fire.svg", color: "#F08030" },
    flying: { icon: "./icons/flying.svg", color: "#A890F0" },
    ghost: { icon: "./icons/ghost.svg", color: "#705898" },
    grass: { icon: "./icons/grass.svg", color: "#78C850" },
    ground: { icon: "./icons/ground.svg", color: "#E0C068" },
    ice: { icon: "./icons/ice.svg", color: "#98D8D8" },
    normal: { icon: "./icons/normal.svg", color: "#A8A878" },
    poison: { icon: "./icons/poison.svg", color: "#A040A0" },
    psychic: { icon: "./icons/psychic.svg", color: "#F85888" },
    rock: { icon: "./icons/rock.svg", color: "#B8A038" },
    steel: { icon: "./icons/steel.svg", color: "#B8B8D0" },
    water: { icon: "./icons/water.svg", color: "#6890F0" },
};
const limit = 25;
let offset = 25;
let allPokemon = [];
let visiblePokemon = [];
let renderId = 0;

async function init() {
    showLoader();

    try {
        const response = await fetch(BASE_URL)
        const data = await response.json();

        allPokemon = data.results;
        visiblePokemon = allPokemon.slice(0, 25);

        await renderCards(visiblePokemon);
        setupSearch();

    } catch {
        document.getElementById("content").innerHTML = `<p>ERROR</p>`;

    } finally {
        hideLoader();
    }
}

async function renderCards(pokemonList) {
    const currentRenderId = ++renderId;
    const content = document.getElementById("content");

    content.innerHTML = "";

    for (let index = 0; index < pokemonList.length; index++) {
        if (currentRenderId !== renderId) {
            return;
        }
        const names = pokemonList[index];

        const detailRes = await fetch(names.url);
        const detailData = await detailRes.json();
        if (currentRenderId !== renderId) {
            return;
        }

        const imgUrl = detailData.sprites.other.dream_world.front_default;
        const firstAttribut = detailData.types[0].type.name;
        const firstType = TYPE_DATA[firstAttribut];
        const firstAttributIcon = firstType?.icon;
        const backgroundCart = firstType?.color;

        const secondAttribut = detailData.types[1]?.type?.name;
        const secondType = secondAttribut ? TYPE_DATA[secondAttribut] : null;
        const secondAttributIcon = secondType?.icon;

        let icons = firstAttributIcon ? `<img src="${firstAttributIcon}">` : '';
        if (secondAttributIcon) icons += `<img src="${secondAttributIcon}">`;

        const card = `
                <div class="card-cover" onclick="openOverlay('${names.url}')">
                    <div class="card-header">
                        <span>#${detailData.id}</span>
                        <span>${names.name}</span>
                    </div>
                    <div class="pokemon-image" style="background:${backgroundCart}">
                        <img src="${imgUrl}">
                    </div>
                    <div class="attributes">
                        ${icons}
                    </div>
                </div>`;
        document.getElementById('content').innerHTML += card;
    }
}

async function loadMore() {
    const btn = document.getElementById('loadMoreButton');
    btn.disabled = true;
    showLoader();

    try {
        offset += limit;
        visiblePokemon = allPokemon.slice(0, offset);

        await renderCards(visiblePokemon);

    } catch {
        document.getElementById("content").innerHTML = `<p>ERROR</p>`;

    } finally {
        hideLoader();
        btn.disabled = false;
    }
}