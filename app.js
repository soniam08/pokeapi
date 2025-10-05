async function getPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await response.json()
    return data
}

console.log(getPokemon(175))


// Crear el HTML de la tarjeta del Pokémon y añadirlo al contenedor
function createCard(pokemon) {
    const nombre = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const imagen = pokemon.sprites.front_default;
    const altura = pokemon.height;
    const peso = pokemon.weight;
    const tipos = pokemon.types.map(t => t.type.name).join(', ');

    // Crea el HTML de la tarjeta
    const cardHTML = `
        <div class="card">
            <img src="${imagen}" alt="${nombre}">
            <h3>${nombre}</h3>
            <p>Altura: ${altura}</p>
            <p>Peso: ${peso}</p>
            <p>Tipo: ${tipos}</p>
        </div>
    `;

    // Inserta la tarjeta en el contenedor
    let contenedor = document.querySelector(".contenedor");
    contenedor.innerHTML += cardHTML;
}

// Ejemplo de uso para mostrar el Pokémon con ID 175
async function mostrarPokemon(id) {
    const poke = await getPokemon(id);
    createCard(poke);
}

mostrarPokemon(175);