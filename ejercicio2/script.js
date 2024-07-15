const pokemonSprite = document.getElementById("pokemonSprite");
const pokemonName = document.querySelector(".pokemonName");
const imgContainer = document.querySelector(".imgContainer");
const pokemonId = document.querySelector(".pokemonId");
const pokemonType = document.querySelector(".pokemonType");
const pokemonHeight = document.querySelector(".pokemonHeight");
const pokemonWeight = document.querySelector(".pokemonWeight");
const pokemonStats = document.querySelector(".pokemonStats");
const pokemonInfo = document.querySelector(".pokemonInfo");
const shinyBtn = document.querySelector(".shinyBtn");

const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
    default: '#fff'
}

const fetchPokemon = () => {
    const pokemonInput = document.getElementById("pokemonInput").value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;

    fetch(url)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(error => {
            console.error("Failed to fetch Pokemon:", error);
            alert("Failed to fetch Pokemon. Please check the name or number and try again.");
        });
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const shinySprite = data.sprites.front_shiny;
    const { stats, types, abilities, moves } = data;

    pokemonInfo.classList.add("infoStyle");
    pokemonName.textContent = data.name.toUpperCase();
    pokemonSprite.classList.remove("hide");
    pokemonSprite.setAttribute("src", sprite);
    pokemonId.textContent = `N° ${data.id}`;

    let height = data.height.toString();
    if (height.length === 1) {
        height = `0.${height}`;
    } else {
        height = `${height.slice(0, -1)}.${height.slice(-1)}`;
    }
    pokemonHeight.innerHTML = `<span>Height: </span>${height} m`

    const weight = data.weight.toString();
    const formattedWeight = `${weight.slice(0, -1)}.${weight.slice(-1)}kg`;
    pokemonWeight.innerHTML = `<span>Weight: </span> ${formattedWeight}`

    const formattedAbilities = abilities.map(ability => ability.ability.name).join(', ');
    document.querySelector(".pokemonAbilities").innerHTML = `<span>Abilities:</span> ${formattedAbilities}`;

    const movesList = data.moves.slice(0, 5).map(move => move.move.name).join(', ');
    document.querySelector(".pokemonMoves").innerHTML = `<span>Moves:</span> ${movesList}`;

    let toggleSpriteButton = document.querySelector("#toggleSprite");
    if (!toggleSpriteButton) {
        toggleSpriteButton = document.createElement("button");
        toggleSpriteButton.textContent = "SHINY";
        toggleSpriteButton.id = "toggleSprite";
        shinyBtn.appendChild(toggleSpriteButton);
    } else {
        toggleSpriteButton.removeEventListener("click", toggleSpriteButton.clickHandler);
    }

    toggleSpriteButton.defaultSprite = sprite;
    toggleSpriteButton.shinySprite = shinySprite;

    toggleSpriteButton.clickHandler = toggleSprite.bind(toggleSpriteButton);
    toggleSpriteButton.addEventListener("click", toggleSpriteButton.clickHandler);

    setImgColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

const setImgColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    imgContainer.style.background = `radial-gradient(circle, ${colorTwo} 33%, ${colorOne} 75%)`;
}

const renderPokemonTypes = types => {
    pokemonType.innerHTML = "";
    types.forEach(type => {
        const typePill = document.createElement("div");
        typePill.textContent = type.type.name;
        typePill.style.backgroundColor = typeColors[type.type.name];
        typePill.classList.add("typePill");
        pokemonType.appendChild(typePill);
    })
}

const renderPokemonStats = stats => {
    pokemonStats.innerHTML = "";
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokemonStats.appendChild(statElement);
    })
}

function toggleSprite() {
    const currentSrc = pokemonSprite.getAttribute("src");
    pokemonSprite.setAttribute("src", currentSrc === this.defaultSprite ? this.shinySprite : this.defaultSprite);
}