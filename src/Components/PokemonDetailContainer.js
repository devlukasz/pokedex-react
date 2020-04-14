import React, { Component } from "react";
import PokemonDetail from "./PokemonDetail";
import { Grid } from "@material-ui/core";

class PokemonDetailContainer extends Component {
  render() {
    const { match } = this.props;
    const pokemonName = match.params.pokemon;
    return (
      <Grid container justify="left">
        <PokemonDetail pokemonName={pokemonName} />
      </Grid>
    );
  }
}

export default PokemonDetailContainer;
