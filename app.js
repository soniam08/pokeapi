async function getPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await response.json()
    return data
}

/* Ejemplo de cómo usar la función correctamente:
getPokemon(1).then(data => {
    console.log(data)
})
*/

console.log(getPokemon(3))