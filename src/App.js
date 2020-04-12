import React, { useState, useEffect } from "react";
import { getAllPokemon, getPokemon } from "./Service/pokemonService";
import { PokemonList } from "./Components/PokemonList";
import "./App.css";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };
  return (
    <div>
      {loading ? (
        <h1>LoadingHolder</h1>
      ) : (
        <>
          {pokemonData.map((pokemon, i) => {
            return <PokemonList key={pokemon.id} pokemon={pokemon} />;
          })}
        </>
      )}
    </div>
  );
}

export default App;
