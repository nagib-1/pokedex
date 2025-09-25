const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=251&offset=0";


async function init() {
  const content = document.getElementById('content');
  const fragment = document.createDocumentFragment();
  const response = await fetch(BASE_URL)
  const data = await response.json();

  for (let index = 0; index < data.results.length; index++) {
    const names = data.results[index];
    const detailRes = await fetch(names.url);
    const detailData = await detailRes.json();
    const imgUrl = detailData.sprites.other.dream_world.front_default;

    const cardCover = document.createElement('div');
    cardCover.className = 'card-cover'

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';

    const cardNumber = document.createElement('h5');
    cardNumber.textContent = `#${index + 1}`;

    const title = document.createElement('h4');
    title.textContent = names.name;

    const img = document.createElement('img');
    img.src = imgUrl;
    const imgClass = document.createElement('div');
    imgClass.className = 'pokemon-image';

    const attributes = document.createElement('div');
    attributes.className = 'attributes';
    const firstAttribut = detailData.types[0].type.name;
    const firstAttributIcon = document.createElement('img');
    firstAttributIcon.className = 'attribut-icon';
    let secondAttribut;
    let secondAttributIcon;

    if (detailData.types.length > 1) {
      secondAttribut = detailData.types[1].type.name;
      secondAttributIcon = document.createElement('img');
      secondAttributIcon.className = 'attribut-icon';
    } else {
      secondAttribut = null;
    }

    switch (firstAttribut) {
      case "bug":
        firstAttributIcon.src = "./icons/bug.svg";
        break;
      case "dark":
        firstAttributIcon.src = "./icons/dark.svg";
        break;
      case "dragon":
        firstAttributIcon.src = "./icons/dragon.svg";
        break;
      case "electric":
        firstAttributIcon.src = "./icons/electric.svg";
        break;
      case "fairy":
        firstAttributIcon.src = "./icons/fairy.svg";
        break;
      case "fighting":
        firstAttributIcon.src = "./icons/fighting.svg";
        break;
      case "fire":
        firstAttributIcon.src = "./icons/fire.svg";
        break;
      case "flying":
        firstAttributIcon.src = "./icons/flying.svg";
        break;
      case "ghost":
        firstAttributIcon.src = "./icons/ghost.svg";
        break;
      case "grass":
        firstAttributIcon.src = "./icons/grass.svg";
        break;
      case "ground":
        firstAttributIcon.src = "./icons/ground.svg";
        break;
      case "ice":
        firstAttributIcon.src = "./icons/ice.svg";
        break;
      case "normal":
        firstAttributIcon.src = "./icons/normal.svg";
        break;
      case "poison":
        firstAttributIcon.src = "./icons/poison.svg";
        break;
      case "psychic":
        firstAttributIcon.src = "./icons/psychic.svg";
        break;
      case "rock":
        firstAttributIcon.src = "./icons/rock.svg";
        break;
      case "steel":
        firstAttributIcon.src = "./icons/steel.svg";
        break;
      case "water":
        firstAttributIcon.src = "./icons/water.svg";
        break;
      default:
        firstAttributIcon.src = "./icons/normal.svg";
        break;
    }

    if (secondAttribut) {
      secondAttributIcon = document.createElement('img');
      secondAttributIcon.className = 'attribut-icon';
      switch (secondAttribut) {
        case "bug":
          secondAttributIcon.src = "./icons/bug.svg";
          break;
        case "dark":
          secondAttributIcon.src = "./icons/dark.svg";
          break;
        case "dragon":
          secondAttributIcon.src = "./icons/dragon.svg";
          break;
        case "electric":
          secondAttributIcon.src = "./icons/electric.svg";
          break;
        case "fairy":
          secondAttributIcon.src = "./icons/fairy.svg";
          break;
        case "fighting":
          secondAttributIcon.src = "./icons/fighting.svg";
          break;
        case "fire":
          secondAttributIcon.src = "./icons/fire.svg";
          break;
        case "flying":
          secondAttributIcon.src = "./icons/flying.svg";
          break;
        case "ghost":
          secondAttributIcon.src = "./icons/ghost.svg";
          break;
        case "grass":
          secondAttributIcon.src = "./icons/grass.svg";
          break;
        case "ground":
          secondAttributIcon.src = "./icons/ground.svg";
          break;
        case "ice":
          secondAttributIcon.src = "./icons/ice.svg";
          break;
        case "normal":
          secondAttributIcon.src = "./icons/normal.svg";
          break;
        case "poison":
          secondAttributIcon.src = "./icons/poison.svg";
          break;
        case "psychic":
          secondAttributIcon.src = "./icons/psychic.svg";
          break;
        case "rock":
          secondAttributIcon.src = "./icons/rock.svg";
          break;
        case "steel":
          secondAttributIcon.src = "./icons/steel.svg";
          break;
        case "water":
          secondAttributIcon.src = "./icons/water.svg";
          break;
        default:
          secondAttributIcon.src = "./icons/normal.svg";
          break;
      }
    }

    cardCover.appendChild(cardHeader);
    cardHeader.appendChild(cardNumber);
    cardHeader.appendChild(title);
    cardCover.appendChild(imgClass);
    imgClass.appendChild(img);
    cardCover.appendChild(attributes);
    attributes.appendChild(firstAttributIcon);

    if (secondAttributIcon) {
      attributes.appendChild(secondAttributIcon);
    }

    fragment.appendChild(cardCover);
  }

  content.appendChild(fragment)
}