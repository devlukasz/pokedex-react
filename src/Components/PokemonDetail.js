import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import pokemonTypesColor from "./Helpers/pokemonTypesColor";
import {
  fetchPokemonByName,
  fetchPokemonSpeciesByName,
} from "../Service/pokemonService";

const PokemonDetail = ({ pokemonName, classes }) => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);

  useEffect(() => {
    fetchPokemonByName(pokemonName)
      .then((pokemon) => {
        setPokemon(pokemon);
        return fetchPokemonSpeciesByName(pokemon.species.name);
      })
      .then((species) => {
        setPokemonSpecies(species);
      })
      .catch((e) => {
        //TODO proper error handling
      });
  }, [pokemonName]);
  if (pokemon === null || pokemonSpecies === null) {
    return null;
  }
  const description = pokemonSpecies.flavor_text_entries.find(
    (el) => el.language.name === "en"
  ).flavor_text;

  const idOfPokemon = "" + pokemon.id;
  const fillNumbers = "000";
  const pokemon_id =
    fillNumbers.substring(0, fillNumbers.length - idOfPokemon.length) +
    idOfPokemon;

  return (
    <>
      <Card className={classes.pokemon}>
        <CardMedia
          className={classes.media}
          image={pokemon.sprites.front_default}
        />

        <CardContent>
          <Typography className={classes.pokemon_id} component="p" variant="h6">
            #{pokemon_id}
          </Typography>
          {/* <Typography className={classes.pokemon_id} component="p" variant="h6">
            Capture Rate: {pokemonSpecies.capture_rate / 10}%
          </Typography> */}
          <Typography
            className={classes.pokemon_name}
            component="p"
            variant="h4"
          >
            {pokemon.name}
          </Typography>
          <Typography
            className={classes.pokemon_stats}
            component="p"
            variant="p"
          >
            {description}
          </Typography>

          {pokemon.types.map((type, i) => {
            return (
              <Typography
                key={i}
                className={classes.pokemon_types}
                component="p"
                variant="h6"
                style={{ color: pokemonTypesColor[type.type.name] }}
              >
                {type.type.name}
              </Typography>
            );
          })}
        </CardContent>
      </Card>

      <Card className={classes.details}>
        <h1>Details</h1>
        {pokemon.abilities.map((ability, i) => {
          return (
            <Typography
              key={i}
              className={classes.pokemon_types}
              component="p"
              variant="h6"
              // style={{ color: pokemonTypesColor[abilitiy.type.name] }}
            >
              {ability.ability.name}
            </Typography>
          );
        })}
        <Typography className={classes.pokemon_stats} component="p" variant="p">
          Height: {pokemon.height / 10} m
        </Typography>
        <Typography className={classes.pokemon_stats} component="p" variant="p">
          Weight: {pokemon.weight / 10} kg
        </Typography>
        <h1>Stats</h1>
        {pokemon.stats.map((stat) => {
          return (
            <>
              {stat.base_stat} {stat.stat.name}
            </>
          );
        })}
      </Card>
    </>
  );
};

export default withStyles({
  pokemon: {
    minWidth: "400px",
    maxWidth: "400px",
    maxHeight: "670px",
    margin: "1em",
    paddingBottom: "2em",
    textAlign: "left",
    margin: "2em",
    padding: "0.5em",
  },
  details: {
    minWidth: "400px",
    width: "50%",
    maxHeight: "650px",
    margin: "1em",
    margin: "2em",
    padding: "0.5em",
  },
  pokemon_id: {
    margin: "0.1em",
    paddingLeft: "0.6em",
  },
  pokemon_stats: {
    margin: "0.5em",
    paddingLeft: "1em",
    textAlign: "left",
  },
  pokemon_name: {
    textTransform: "capitalize",
    marginBottom: "0.5em",
    paddingLeft: "0.5em",
    transition: "all .2s ease-in-out",
  },
  pokemon_types: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    margin: "auto",
    textTransform: "uppercase",
  },
  media: {
    margin: "1em",
    minHeight: "300px",
    paddingTop: "2em",
    paddingBottom: "2em",
    backgroundColor: "#F5F5F5",
    borderRadius: "5%",
    transition: "all .2s ease-in-out",
    imageRendering: "crisp-edges",
    imageRendering: "pixelated",
  },
})(PokemonDetail);
