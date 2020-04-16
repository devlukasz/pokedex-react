const POKEAPI_URL = "https://pokeapi.co/api/v2";
const POKEAPI_TYPE = "https://pokeapi.co/api/v2/type";
const POKEMON_ENDPOINT = "/pokemon";
const POKEMON_SPECIES_ENDPOINT = "/pokemon-species";

export function getPokemon({ url }) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
}

export async function getAllPokemon(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
}

export async function getAllPokemonByType(item) {
  return new Promise((resolve, reject) => {
    fetch(`${POKEAPI_TYPE}/${item}`)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
}

export async function getAllPokemonByName(name) {
  return new Promise((resolve, reject) => {
    fetch(`${POKEAPI_URL}${POKEMON_ENDPOINT}/${name}`)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
}

export async function getPokemonBySpecies(name) {
  return new Promise((resolve, reject) => {
    fetch(`${POKEAPI_URL}${POKEMON_SPECIES_ENDPOINT}/${name}`)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
}
