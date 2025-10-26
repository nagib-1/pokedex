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

            let icons = firstAttributIcon ? `<img class="attribut-icon" src="${firstAttributIcon}">` : '';
            if (secondAttributIcon) icons += `<img class="attribut-icon" src="${secondAttributIcon}">`;

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

            const secondAttribut = detailData.types[1]?.type?.name;
            const secondType = secondAttribut ? TYPE_DATA[secondAttribut] : null;
            const secondAttributIcon = secondType?.icon;

            let icons = firstAttributIcon ? `<img class="attribut-icon" src="${firstAttributIcon}">` : '';
            if (secondAttributIcon) icons += `<img class="attribut-icon" src="${secondAttributIcon}">`;

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
        offset += limit;
    } catch {
        document.getElementById("content").innerHTML = `<p>ERROR</p>`;
    } finally {
        hideLoader();
        btn.disabled = false;
    }
}