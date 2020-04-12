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
        {/* <Typography component="p" variant="h6">
          #{pokemon.id}
        </Typography> */}
        <Typography className={classes.pokemon_name} component="p" variant="h4">
          {pokemon.name}
        </Typography>
        <Typography
          className={classes.pokemon_stats}
          component="p"
          variant="h6"
        >
          Height: {pokemon.height / 10} m
        </Typography>
        <Typography
          className={classes.pokemon_stats}
          component="p"
          variant="h6"
        >
          Weight: {pokemon.weight / 10} kg
        </Typography>
        {pokemon.types.map((type, i) => {
          return (
            <Typography
              key={i}
              className={classes.pokemon_types}
              component="p"
              variant="h5"
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
    boxSizing: "border-box",
  },
  pokemon_stats: {
    margin: "0.1em",
    paddingLeft: "1em",
    textAlign: "left",
    boxSizing: "border-box",
  },
  pokemon_name: {
    marginBottom: "0.5em",
    paddingLeft: "0.5em",
  },
  pokemon_types: {
    alignItems: "center",
    display: "inline",
    marginTop: "1em",
    paddingRight: "1em",
    textAlign: "center",
    boxSizing: "border-box",
  },
  media: {
    margin: "1em",
    minHeight: "270px",
    paddingTop: "2em",
    paddingBottom: "2em",
    backgroundColor: "#F5F5F5",
  },
})(PokemonList);
