import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";

function PokemonList({ pokemon, classes }) {
  return (
    <Card className={classes.pokemon}>
      <CardMedia
        className={classes.media}
        image={pokemon.sprites.front_default}
      />
      <CardContent>
        <Typography component="p" variant="h6">
          #{pokemon.id}
        </Typography>
        <Typography component="p" variant="h6">
          {pokemon.name}
        </Typography>
        <Typography
          className={classes.pokemon_stats}
          component="p"
          variant="h6"
        >
          Height: {pokemon.height / 10}m
        </Typography>
        <Typography
          className={classes.pokemon_stats}
          component="p"
          variant="h6"
        >
          Weight: {pokemon.weight / 10}kg
        </Typography>
        {pokemon.types.map((type) => {
          return (
            <Typography
              clasName={classes.pokemon_types}
              component="p"
              variant="h4"
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
    textAlign: "center",
    boxSizing: "border-box",
  },
  pokemon_stats: {
    margin: "0.5em",
    textAlign: "left",
    boxSizing: "border-box",
  },
  pokemon_types: {
    display: "inline-block",
    boxSizing: "border-box",
  },
  media: {
    minHeight: "200px",
  },
})(PokemonList);
