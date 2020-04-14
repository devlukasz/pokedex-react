import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../../App.css";
import pokemonTypesColor from "../Helpers/pokemonTypesColor";
import Divider from "@material-ui/core/Divider";

function PokemonCard({ pokemon, classes, to = "" }) {
  const idOfPokemon = "" + pokemon.id;
  const fillNumbers = "000";
  const pokemon_id =
    fillNumbers.substring(0, fillNumbers.length - idOfPokemon.length) +
    idOfPokemon;
  return (
    <Card className={classes.pokemon}>
      <Link style={{ textDecoration: "none" }} to={to}>
        <CardMedia
          className={classes.media}
          image={pokemon.sprites.front_default}
        />
      </Link>
      <CardContent className={classes.cardContent}>
        <div className={classes.cardDetails}>
          <Typography className={classes.pokemon_id} component="p" variant="h6">
            #{pokemon_id}
          </Typography>
          <Link style={{ textDecoration: "none", color: "inherit" }} to={to}>
            <Typography
              className={classes.pokemon_name}
              component="p"
              variant="h4"
            >
              {pokemon.name}
            </Typography>
          </Link>
          <Typography
            className={classes.pokemon_stats}
            component="p"
            variant="p"
          >
            Height: {pokemon.height / 10} m
          </Typography>
          <Typography
            className={classes.pokemon_stats}
            component="p"
            variant="p"
          >
            Weight: {pokemon.weight / 10} kg
          </Typography>

          <Divider className={classes.divider} />
          <div className={classes.footerSection}>
            {pokemon.types.map((type, i) => (
              <Typography
                key={i}
                className={classes.pokemon_types}
                component="p"
                variant="h6"
                style={{ color: pokemonTypesColor[type.type.name] }}
              >
                {type.type.name}
              </Typography>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default withStyles({
  divider: { marginTop: "2rem" },
  footerSection: {
    alignItems: "stretch",
    display: "flex",
  },
  cardContent: {
    padding: "0 !important",
  },
  cardDetails: {
    padding: "1.5rem",
  },
  pokemon: {
    margin: "1em",
    textAlign: "left",
  },
  pokemon_id: {
    margin: "0.1em",
    paddingLeft: "0.6em",
    color: "#7a7a7a !important",
    fontWeight: 400,
    fontSize: "1rem",
  },
  pokemon_stats: {
    margin: "0.5em",
    paddingLeft: "0.4em",
    textAlign: "left",
    color: "#4a4a4a",
  },
  pokemon_name: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1.25rem",
    textTransform: "capitalize",
    paddingLeft: "0.5em",
    transition: "all .2s ease-in-out",
    "&:hover": {
      transform: "translateY(-10px)",
    },
  },
  pokemon_types: {
    textTransform: "uppercase",
    alignItems: "center",
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: "center",
    padding: ".75rem",
    fontSize: "1rem",
    display: "flex",
    "&:not(:last-child)": {
      borderRight: "1px solid #dbdbdb",
    },
  },
  media: {
    margin: "1em",
    minHeight: "300px",
    paddingTop: "2em",
    marginBottom: 0,
    backgroundColor: "#F5F5F5",
    borderRadius: "5%",
    filter: "grayscale(50%)",
    transition: "all .2s ease-in-out",
    imageRendering: "crisp-edges",
    imageRendering: "pixelated",
    "&:hover": {
      transform: "translateY(-10px)",
      filter: "grayscale(0%)",
    },
  },
})(PokemonCard);
