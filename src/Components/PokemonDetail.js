import React, { Component } from "react";

class PokemonDetail extends Component {
  render() {
    const { match } = this.props;
    return (
      <>
        <div>hi</div>
        <p>{match.params.pokemon}</p>
      </>
    );
  }
}

export default PokemonDetail;
