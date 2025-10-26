async function openOverlay(url) {
  const res = await fetch(url);
  const data = await res.json();

  const firstTypeName = data.types[0].type.name;
  const backgroundCart = TYPE_DATA[firstTypeName]?.color;
  const pokeId = data.id;
  const height = data.height / 10;
  const weight = data.weight / 10;

  let attributes = '';
  for (let i = 0; i < data.types.length; i++) {
    attributes += data.types[i].type.name;
    if (i < data.types.length - 1) attributes += ' & ';
  }

  let abilities = '';
  for (let i = 0; i < data.abilities.length; i++) {
    abilities += data.abilities[i].ability.name;
    if (i < data.abilities.length - 1) abilities += ', ';
  }

  let moves = '';
  const maxMoves = Math.min(5, data.moves.length);
  for (let i = 0; i < maxMoves; i++) {
    moves += data.moves[i].move.name;
    if (i < maxMoves - 1) moves += ', ';
  }

  let hpStat, attackStat, defenseStat, spAtk, spDef, speedStat;
  for (let i = 0; i < data.stats.length; i++) {
    const s = data.stats[i];
    const n = s.stat.name;
    if (n === 'hp') hpStat = s.base_stat;
    if (n === 'attack') attackStat = s.base_stat;
    if (n === 'defense') defenseStat = s.base_stat;
    if (n === 'special-attack') spAtk = s.base_stat;
    if (n === 'special-defense') spDef = s.base_stat;
    if (n === 'speed') speedStat = s.base_stat;
  }

  const img = data.sprites?.other?.['official-artwork']?.front_default || '';
  const shiny = data.sprites?.other?.['official-artwork']?.front_shiny || '';

  const pokeCard = `
    <div class="poke-card">
        <div class="poke-background" style="background:${backgroundCart}">
            <img class="poke-img" src="${img}">
        </div>

        <div class="poke-info">
            <h4>${data.name}</h4>
            <p>${attributes}</p>
            <p>#${pokeId}</p>
        </div>

        <div class="tab-buttons">
            <button class="tab-btn active" data-tab="about">About</button>
            <button class="tab-btn" data-tab="stats">Base Stats</button>
            <button class="tab-btn" data-tab="shiny">Shiny Image</button>
        </div>

        <div class="tab-content active" id="tab-about">
            <ul>
                <li>Name: ${data.name}</li>
                <li class="no-capitalize">Height: ${height} m</li>
                <li class="no-capitalize">Weight: ${weight} kg</li>
                <li>abilities: ${abilities}</li>
                <li>moves: ${moves}</li>
            </ul>
        </div>

        <div class="tab-content" id="tab-stats">
            <ul>
                <li>HP: ${hpStat}</li>
                <li>attack: ${attackStat}</li>
                <li>defense: ${defenseStat}</li>
                <li>Spec. attack: ${spAtk}</li>
                <li>Spec. defense: ${spDef}</li>
                <li>speed: ${speedStat}</li>
            </ul>
        </div>

        <div class="tab-content" id="tab-shiny">
            ${shiny ? `<img class="shiny-img" src="${shiny}">` : ''}
        </div>

        <div class="bottom-buttons">
            <button class="prev-button" onclick="prevImg(${data.id - 1})">&larr;</button>
            <button class="close-button">&times;</button>
            <button class="next-button" onclick="nextImg(${data.id + 1})">&rarr;</button>
        </div>
    </div>
`;

  const overlay = document.getElementById('overlay');
  overlay.innerHTML = pokeCard;
  overlay.style.display = 'flex';
  document.body.classList.add('no-scroll');

  const overlayCloseBtn = overlay.querySelector('.close-button');
  const tabButtons = overlay.querySelectorAll('.tab-btn');
  const tabContents = overlay.querySelectorAll('.tab-content');

  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener('click', () => {
      const target = tabButtons[i].dataset.tab;
      for (let j = 0; j < tabButtons.length; j++) {
        tabButtons[j].classList.remove('active');
        tabContents[j].classList.remove('active');
      }
      tabButtons[i].classList.add('active');
      overlay.querySelector(`#tab-${target}`).classList.add('active');
    });
  }

  overlayCloseBtn.addEventListener('click', hideOverlay);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hideOverlay();
  });

  function hideOverlay() {
    overlay.style.display = 'none';
    overlay.innerHTML = '';
    document.body.classList.remove('no-scroll');
  }
}

async function prevImg(prevId) {
  if (prevId < 1) return;
  const url = `https://pokeapi.co/api/v2/pokemon/${prevId}`;
  await openOverlay(url);
}

async function nextImg(nextId) {
  const url = `https://pokeapi.co/api/v2/pokemon/${nextId}`;
  await openOverlay(url);
}
