function setupSearch() {
    const searchInput = document.getElementById("search");
    const form = document.querySelector(".search");
    const messageBox = document.getElementById("searchMessage");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
    });

    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.trim().toLowerCase();

        filterAndShowPokemon(searchValue, messageBox);
    });
}

async function filterAndShowPokemon(filterword, messageBox) {
    if (filterword.length === 0) {
        messageBox.innerHTML = "";
        await renderCards(visiblePokemon);
        return;
    }

    if (filterword.length < 3) {
        messageBox.innerHTML = "Bitte mindestens 3 Buchstaben eingeben.";
        return;
    }

    messageBox.innerHTML = "";

    const filteredPokemon = allPokemon.filter(pokemon =>
        pokemon.name.toLowerCase().includes(filterword)
    );

    await renderCards(filteredPokemon);
}