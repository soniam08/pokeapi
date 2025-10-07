async function getPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`) //Pide los datos de un pokemon especifico (id) a la pokeapi en internet
    const data = await response.json() //cuando la funcion este lista crea un objeto (json) para trabajar con los datos en js
    return data //devuelve los datos
}

// Crear el HTML de la tarjeta del Pokémon y añadirlo al contenedor
function createCard(pokemon) {
    const nombre = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); //La inicial en mayús y el resto en minuscula
    const imagen = pokemon.sprites.front_default;  //Extrae la imagen
    const altura = pokemon.height;
    const peso = pokemon.weight;
    const tipos = pokemon.types.map(t => t.type.name).join(', '); //Map crea un vector de los tipos y los separa con el join , si fuera mas de uno

    // Determinar color según el primer tipo
    let fondoColor = 'rgba(228, 186, 224, 1)'; // color por defecto
    const tipoPrincipal = pokemon.types[0].type.name;

    if (tipoPrincipal === 'normal') {
        fondoColor = "#C6C6A7";
    } else if (tipoPrincipal === 'fire') {
        fondoColor = "#F5AC78";
    } else if (tipoPrincipal === 'water') {
        fondoColor = "#9DB7F5";
    } else if (tipoPrincipal === 'electric') {
        fondoColor = "#FAE078";
    } else if (tipoPrincipal === 'grass') {
        fondoColor = "#A7DB8D";
    } else if (tipoPrincipal === 'ice') {
        fondoColor = "#BCE6E6";
    } else if (tipoPrincipal === 'fighting') {
        fondoColor = "#D67873";
    } else if (tipoPrincipal === 'poison') {
        fondoColor = "#C183C1";
    } else if (tipoPrincipal === 'ground') {
        fondoColor = "#EBD69D";
    } else if (tipoPrincipal === 'flying') {
        fondoColor = "#C6B7F5";
    } else if (tipoPrincipal === 'psychic') {
        fondoColor = "#FA92B2";
    } else if (tipoPrincipal === 'bug') {
        fondoColor = "#C6D16E";
    } else if (tipoPrincipal === 'rock') {
        fondoColor = "#D1C17D";
    } else if (tipoPrincipal === 'ghost') {
        fondoColor = "#A292BC";
    } else if (tipoPrincipal === 'dragon') {
        fondoColor = "#A27DFA";
    } else if (tipoPrincipal === 'dark') {
        fondoColor = "#A29288";
    } else if (tipoPrincipal === 'steel') {
        fondoColor = "#D1D1E0";
    } else if (tipoPrincipal === 'fairy') {
        fondoColor = "#F4BDC9";
    }

    // Rellena un molde de HTML
    const cardHTML = `
        <div class="card" style="background-color: ${fondoColor};">
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
    for (let id = 1; id <= 50; id++) {
        promesas.push(mostrarPokemon(id));
    }
    await Promise.all(promesas);
}

mostrarDiezPokemons();

// Para mostrar cada Pokémon individual en el futuro:
// async function mostrarPokemon(id) {
//     const poke = await getPokemon(id);
//     createCard(poke);
// }
async function mostrarPokemon(id) {
    const poke = await getPokemon(id);
    createCard(poke);
}

//Funcionalidad del botón cargar más
let inicio = 1;
const cantidadPorLote = 10;

async function mostrarLotePokemons() {
    const promesas = [];
    for (let id = inicio; id < inicio + cantidadPorLote; id++) {
        promesas.push(mostrarPokemon(id));
    }
    await Promise.all(promesas);
    inicio += cantidadPorLote;
}

document.getElementById("boton").addEventListener("click", mostrarLotePokemons);

// Al cargar la página, muestra el primer lote
mostrarLotePokemons();

//Buscador
async function buscarPokemonPorNombre(nombre) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
        if (!response.ok) throw new Error('Pokemon no encontrado :c');
        const data = await response.json();
        return data;
    } catch (error) {
        return null;  // Pokémon no encontrado
    }
}

function limpiarContenedor() {
    document.querySelector(".contenedor").innerHTML = "";
}
//Botón del buscador
document.getElementById("botonbusqueda").addEventListener("click", async () => {
    // Captura el valor del input
    const input = document.getElementById("buscador");
    const nombre = input.value.trim();

    // Si está vacío, no hace nada
    if (nombre === "") {
        console.log("El campo está vacío");
        return;
    }

    // Limpia el contenedor antes de mostrar resultados nuevos
    limpiarContenedor();

    // Busca el Pokemon por nombre
    const pokemon = await buscarPokemonPorNombre(nombre);

    if (pokemon) {
        createCard(pokemon); // Si existe, muestra la tarjeta
    } else {
        alert("Pokémon no encontrado :c"); // Si no, muestra alerta
    }

    // Limpia el input después de buscar
    input.value = "";
});