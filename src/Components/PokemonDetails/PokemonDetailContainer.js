import React, { Component } from "react";
import PokemonDetail from "./PokemonDetail";
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";

class PokemonDetailContainer extends Component {
  render() {
    const { match } = this.props;
    const pokemonName = match.params.pokemon;
    return (
      <Container maxWidth={"xl"}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid sm={12} xl={9} lg={9} md={12}>
            <PokemonDetail pokemonName={pokemonName} />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default PokemonDetailContainer;
