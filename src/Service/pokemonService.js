import axios from "axios";

const POKEAPI_URL = "https://pokeapi.co/api/v2";
const POKEMON_ENDPOINT = "/pokemon";
const POKEMON_SPECIES_ENDPOINT = "/pokemon-species";
const pokemons = [];

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
export async function fetchPokemonByName(name) {
  const cachedPokemon = pokemons.find((p) => p.name === name);
  if (cachedPokemon) {
    return cachedPokemon;
  }

  try {
    const { data } = await axios.get(
      `${POKEAPI_URL}${POKEMON_ENDPOINT}/${name}`
    );
    pokemons.push(data);
    return data;
  } catch (error) {
    throw error;
  }
}
export async function fetchPokemonSpeciesByName(name) {
  try {
    const { data } = await axios.get(
      `${POKEAPI_URL}${POKEMON_SPECIES_ENDPOINT}/${name}`
    );
    return data;
  } catch (error) {
    throw error;
  }
}
