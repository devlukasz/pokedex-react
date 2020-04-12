import React from "react";

export const PokemonList = ({ pokemon }) => {
  return (
    <>
      <div className="card-img">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <div className="card-id">#{pokemon.id}</div>
      <div className="card-name">{pokemon.name}</div>
      <div className="card-types">
        {pokemon.types.map((type) => {
          return <div className="card-type">{type.type.name}</div>;
        })}
      </div>
      <div className="card-height">{pokemon.height / 10} m</div>
      <div className="card-weight">{pokemon.weight / 10} kg</div>
    </>
  );
};
