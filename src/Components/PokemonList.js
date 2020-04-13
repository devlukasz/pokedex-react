import React, { useState, useEffect } from "react";
import { getAllPokemon, getPokemon } from "../Service/pokemonService";
import PokemonCard from "./PokemonCard";
import { Grid, Button } from "@material-ui/core";
import spinner from "../Assets/Spinner-0.4s-361px.gif";
import "../App.css";

function PokemonList() {
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

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

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
        <img className="spinner" src={spinner} alt="Loading" />
      ) : (
        <>
          <Grid container justify="center">
            {pokemonData.map((pokemon) => {
              return (
                <PokemonCard
                  to={`/pokemon/${pokemon.name}`}
                  key={pokemon.name}
                  pokemon={pokemon}
                />
              );
            })}
          </Grid>
          <Button variant="outlined" onClick={prev}>
            Prev
          </Button>
          <Button variant="outlined" onClick={next}>
            Next
          </Button>
        </>
      )}
    </div>
  );
}
export default PokemonList;
