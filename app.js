// ======= ELEMENTOS DEL DOM =======
const pokemonInput = document.getElementById("pokemonInput");
const btnBuscar = document.getElementById("btnBuscar");

const pokemonResultado = document.getElementById("pokemonResultado");
const pokemonError = document.getElementById("pokemonError");

const pokeImg = document.getElementById("pokeImg");
const pokeNombre = document.getElementById("pokeNombre");
const pokeTipos = document.getElementById("pokeTipos");
const statHp = document.getElementById("statHp");
const statAtk = document.getElementById("statAtk");
const statDef = document.getElementById("statDef");

const btnChiste = document.getElementById("btnChiste");
const jokeText = document.getElementById("jokeText");
const jokeError = document.getElementById("jokeError");

// ======= POKÉAPI =======
// Busca por nombre o número. Ej: "pikachu" o "25"
async function buscarPokemon() {
  const value = pokemonInput.value.trim().toLowerCase();

  // Limpia mensajes previos
  pokemonError.textContent = "";
  pokemonResultado.classList.add("hidden");

  if (!value) {
    pokemonError.textContent = "Escribe un nombre o número de Pokémon.";
    return;
  }

  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${value}`;
    const resp = await fetch(url);

    // Si no existe, PokeAPI devuelve 404
    if (!resp.ok) {
      throw new Error("Pokémon no encontrado. Verifica el nombre o número.");
    }

    const data = await resp.json();

    // Nombre
    const nombre = data.name;
    // Imagen (sprite oficial)
    const img = data.sprites.other["official-artwork"].front_default
              || data.sprites.front_default;

    // Tipos (puede tener 1 o 2)
    const tipos = data.types.map(t => t.type.name).join(" / ");

    // Stats: buscamos hp, attack, defense (mínimo 3)
    // data.stats es un arreglo con objetos { base_stat, stat: { name } }
    const hp = data.stats.find(s => s.stat.name === "hp")?.base_stat ?? "N/A";
    const atk = data.stats.find(s => s.stat.name === "attack")?.base_stat ?? "N/A";
    const def = data.stats.find(s => s.stat.name === "defense")?.base_stat ?? "N/A";

    // Pintar en pantalla
    pokeNombre.textContent = nombre.toUpperCase();
    pokeImg.src = img;
    pokeImg.alt = `Imagen de ${nombre}`;
    pokeTipos.textContent = `Tipo: ${tipos}`;

    statHp.textContent = hp;
    statAtk.textContent = atk;
    statDef.textContent = def;

    pokemonResultado.classList.remove("hidden");
  } catch (err) {
    pokemonError.textContent = err.message;
  }
}