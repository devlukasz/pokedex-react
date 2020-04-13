import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../App.css";

function PokemonList({ pokemon, classes, to }) {
  const idOfPokemon = "" + pokemon.id;
  const fillNumbers = "000";
  const pokemon_id =
    fillNumbers.substring(0, fillNumbers.length - idOfPokemon.length) +
    idOfPokemon;
  return (
    <Card className={classes.pokemon}>
      <Link to={to}>
        <CardMedia
          className={classes.media}
          image={pokemon.sprites.front_default}
        />
      </Link>
      <CardContent>
        <Typography className={classes.pokemon_id} component="p" variant="h6">
          #{pokemon_id}
        </Typography>
        <Link to={to}>
          <Typography
            className={classes.pokemon_name}
            component="p"
            variant="h4"
          >
            {pokemon.name}
          </Typography>
        </Link>
        <Typography className={classes.pokemon_stats} component="p" variant="p">
          Height: {pokemon.height / 10} m
        </Typography>
        <Typography className={classes.pokemon_stats} component="p" variant="p">
          Weight: {pokemon.weight / 10} kg
        </Typography>
        {pokemon.types.map((type, i) => {
          return (
            <Typography
              key={i}
              className={classes.pokemon_types}
              component="p"
              variant="h6"
            >
              {type.type.name}
            </Typography>
          );
        })}
      </CardContent>
    </Card>
  );
}
export default withStyles({
  pokemon: {
    minWidth: "400px",
    margin: "1em",
    paddingBottom: "2em",
    textAlign: "left",
    margin: "2em",
    padding: "0.5em",
  },
  pokemon_id: {
    margin: "0.1em",
    paddingLeft: "0.6em",
  },
  pokemon_stats: {
    margin: "0.1em",
    paddingLeft: "1em",
    textAlign: "left",
    boxSizing: "border-box",
  },
  pokemon_name: {
    textTransform: "capitalize",
    marginBottom: "0.5em",
    paddingLeft: "0.5em",
  },
  pokemon_types: {
    textTransform: "uppercase",
    alignItems: "center",
    display: "inline",
    marginTop: "1em",
    paddingRight: "1em",
    textAlign: "center",
    boxSizing: "border-box",
  },
  media: {
    margin: "1em",
    minHeight: "300px",
    paddingTop: "2em",
    paddingBottom: "2em",
    backgroundColor: "#F5F5F5",
  },
})(PokemonList);
