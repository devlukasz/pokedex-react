import React, { Component } from "react";
import PokemonDetail from "./PokemonDetail";

class PokemonDetailContainer extends Component {
  render() {
    const { match } = this.props;
    const pokemonName = match.params.pokemon;
    return (
      <>
        <PokemonDetail pokemon={pokemonName} />
      </>
    );
  }
}

export default PokemonDetailContainer;
