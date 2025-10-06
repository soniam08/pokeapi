async function getPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`) //Pide los datos de un pokemon especifico (id) a la pokeapi en internet
    const data = await response.json() //cuando la funcion este lista crea un objeto (json) para trabajar con los datos en js
    return data //devuelve los datos
}


console.log(getPokemon(175))


// Crear el HTML de la tarjeta del Pokémon y añadirlo al contenedor
function createCard(pokemon) {
    const nombre = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); //La inicial en mayús y el resto en minuscula
    const imagen = pokemon.sprites.front_default;  //Extrae la imagen
}
console.log(getPokemon(175)) //muestra por consola la prome y posteriormente los datos


// Generación del contenido HTML para la tarjeta
function createCard(pokemon) {
    const nombre = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); //La inicial en mayús y el resto en minuscula
    const imagen = pokemon.sprites.front_default; //Extrae la imagen

    const altura = pokemon.height;
    const peso = pokemon.weight;
    const tipos = pokemon.types.map(t => t.type.name).join(', '); //Map crea un vector de los tipos y los separa con el join , si fuera mas de uno
}

// Crear el HTML de la tarjeta del Pokémon y añadirlo al contenedor
function createCard(pokemon) {
    const nombre = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); //La inicial en mayús y el resto en minuscula
    const imagen = pokemon.sprites.front_default;  //Extrae la imagen
    // Rellena un molde de HTML
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

async function mostrarDiezPokemons() {
    const promesas = [];
    for (let id = 1; id <= 10; id++) {
        promesas.push(mostrarPokemon(id));
    }
    await Promise.all(promesas);
}

mostrarDiezPokemons();

// Ejemplo de uso para mostrar el Pokémon con ID 175
async function mostrarPokemon(id) {
    const poke = await getPokemon(id);
    createCard(poke);
}

mostrarPokemon(175);