import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  lighten,
  Typography,
} from "@material-ui/core";
import pokemonTypesColor from "../Helpers/pokemonTypesColor";
import {
  fetchPokemonByName,
  fetchPokemonSpeciesByName,
} from "../../Service/pokemonService";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
import LinearProgress from "@material-ui/core/LinearProgress";

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
    <Grid container direction="row">
      <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
        <Card className={classes.pokemon}>
          <CardMedia
            className={classes.media}
            image={pokemon.sprites.front_default}
          />

          <CardContent className={classes.cardContent}>
            <div className={classes.cardDetails}>
              <Typography
                className={classes.pokemon_id}
                component="p"
                variant="h6"
              >
                #{pokemon_id}
              </Typography>

              <Typography
                className={classes.pokemon_name}
                component="p"
                variant="h4"
              >
                {pokemon.name}
              </Typography>
              <Typography
                className={classes.pokemon_description}
                component="p"
                variant="p"
              >
                {description}
              </Typography>

              <Divider className={classes.divider} />
              <div className={classes.footerSection}>
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
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid xs={12} sm={12} md={8} lg={8} xl={8}>
        <Card className={classes.details}>
          <CardHeader title={"Details"} className={classes.cardHeader} />
          <Divider />
          <Grid container direction="row">
            <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={classes.valueDetailsSection}>
                <Typography
                  className={classes.pokemon_stats_title}
                  component="p"
                  variant="p"
                >
                  Height:
                </Typography>
                <Typography
                  className={classes.pokemon_stats_value}
                  component="p"
                  variant="p"
                >
                  {pokemon.height / 10} m
                </Typography>

                <Typography
                  className={classes.pokemon_stats_title}
                  component="p"
                  variant="p"
                >
                  Weight:
                </Typography>
                <Typography
                  className={classes.pokemon_stats_value}
                  component="p"
                  variant="p"
                >
                  {pokemon.weight / 10} kg
                </Typography>
              </div>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
              {pokemon.abilities.map((ability, i) => {
                return (
                  <Typography
                    key={i}
                    className={classes.pokemon_types_details}
                    component="p"
                    variant="h6"
                  >
                    Ability: {ability.ability.name}
                  </Typography>
                );
              })}
            </Grid>
          </Grid>
          <Divider />
          <CardHeader title={"Stats"} className={classes.cardHeaderStats} />
          <Divider />
          {pokemon.stats.map((stat) => {
            return (
              <>
                <Typography
                  className={classes.pokemon_stats_meter_title}
                  component="p"
                  variant="p"
                >
                  {stat.stat.name} : {stat.base_stat}
                </Typography>
                <div className={classes.pokemon_stats_meter_title}>
                  <BorderLinearProgress
                    className={classes.margin}
                    variant="determinate"
                    color="secondary"
                    value={stat.base_stat}
                  />
                </div>
              </>
            );
          })}
        </Card>
      </Grid>
    </Grid>
  );
};

export default withStyles({
  progressRoot: {
    flexGrow: 1,
  },
  pokemon: {
    margin: "1em",
    textAlign: "left",
  },
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
  details: {
    margin: "1em",
    padding: "0.5em",
  },
  pokemon_id: {
    margin: "0.1em",
    fontSize: "1rem",
    fontWeight: 400,
    color: "#7a7a7a !important",
  },
  pokemon_stats_value: {
    margin: "0.5em",
    paddingLeft: "0.4em",
    textAlign: "left",
    color: "#4a4a4a",
  },
  pokemon_stats_title: {
    margin: "0.5em",
    paddingLeft: "0.4em",
    textAlign: "left",
    color: "##7a7a7a !important",
  },
  pokemon_stats_meter_title: {
    margin: "0.5em",
    paddingLeft: "0.4em",
    textAlign: "left",
    color: "##7a7a7a !important",
    textTransform: "uppercase",
  },
  pokemon_name: {
    fontSize: "1.5rem",
    fontWeight: "600",
    textTransform: "capitalize",
    marginBottom: "0.5em",
    transition: "all .2s ease-in-out",
    color: "#0a0a0a !important",
  },
  pokemon_details: {
    fontSize: "1rem",
    color: "#4a4a4a",
    fontWeight: 400,
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
  pokemon_types_details: {
    textTransform: "uppercase",
    alignItems: "center",
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: "center",
    padding: ".75rem",
    fontSize: "1rem",
    display: "flex",
  },
  media: {
    margin: "1em",
    minHeight: "300px",
    paddingTop: "2em",
    marginBottom: 0,
    backgroundColor: "#F5F5F5",
    borderRadius: "5%",
    transition: "all .2s ease-in-out",
    imageRendering: "crisp-edges",
    imageRendering: "pixelated",
  },
  cardHeader: {
    padding: "4px",
  },
  cardHeaderStats: {
    fontSize: "1rem",
    fontWeight: 700,
    padding: ".75rem",
  },
  valueDetailsSection: {
    padding: "8px",
  },
})(PokemonDetail);

const BorderLinearProgress = withStyles({
  root: {
    height: "1rem",
    backgroundColor: lighten("#dbdbdb", 0.5),
    borderRadius: 20,
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#48d1b1",
  },
})(LinearProgress);
