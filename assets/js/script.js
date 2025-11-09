const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=25&offset=0";
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