import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PokemonCard = () => {
  const { id } = useParams();
  const [pokemonInfos, setPokemonInfos] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => setPokemonInfos(data));
  }, [id]);

  if (!pokemonInfos) {
    return <div>Loading...</div>;
  }

  const { name, sprites, types, stats } = pokemonInfos;

  return (
    <div className="bg-white p-8 rounded-md border-8 border-white-500 shadow-2xl w-2/3 mx-auto my-8">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold capitalize">{name}</h2>
        <img
          src={sprites.front_default}
          alt={name}
          className="w-48 h-48 mx-auto mb-4"
        />
        <div className="flex space-x-2">
          {types.map((type) => (
            <span
              key={type.type.name}
              className={` uppercase px-2 py-1 rounded-md bg-${type.type.name}`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.stat.name} className="text-center">
            <p className="text-lg">
              <span className="font-semibold capitalize">
                {stat.stat.name}:
              </span>{" "}
              {stat.base_stat}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
