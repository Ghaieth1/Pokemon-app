import React, { useEffect, useState } from 'react';

const Evolutions = ({ pokemonName }) => {
  const [evolutions, setEvolutions] = useState([]);

  useEffect(() => {
    const fetchEvolutions = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`
        );
        const data = await response.json();

        const evolutionChainUrl = data?.evolution_chain?.url;

        if (evolutionChainUrl) {
          const evolutionChainResponse = await fetch(evolutionChainUrl);
          const evolutionChainData = await evolutionChainResponse.json();

          const evolutionsArray = parseEvolutionChain(evolutionChainData.chain);
          // Trier les évolutions par ordre croissant de l'ID
          evolutionsArray.sort((a, b) => a.id - b.id);
          setEvolutions(evolutionsArray);
        }
      } catch (error) {
        console.error('Error fetching evolutions:', error);
      }
    };

    fetchEvolutions();
  }, [pokemonName]);

  const renderEvolution = (evolution) => (
    <div key={evolution.name} className='flex items-center gap-5 '>
      {evolution.level && (
        <div className='mr-5 font-bold'>
          <p>Lvl : {evolution.level}</p>
        </div>
      )}
      <img
        src={evolution.image}
        alt={evolution.name}
        className='2xl:w-32 2xl:h-32 mr-2 bg-slate-200 rounded-full p-2 border-4 border-slate-300 xl:w-20 xl:h-20'
      />
    </div>
  );

  const parseEvolutionChain = (chain) => {
    const result = [];

    const parseChain = (evolutionDetails) => {
      if (evolutionDetails) {
        const evolution = {
          id: evolutionDetails.species.url.split('/').reverse()[1],
          name: evolutionDetails.species.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
            evolutionDetails.species.url.split('/').reverse()[1]
          }.png`,
          level:
            evolutionDetails.evolution_details.length > 0
              ? evolutionDetails.evolution_details[0].min_level
              : null,
        };

        if (evolutionDetails.evolves_to.length > 0) {
          evolution.evolves_to = evolutionDetails.evolves_to.map(parseChain);
        }

        result.push(evolution);
      }

      return evolutionDetails;
    };

    parseChain(chain);
    return result;
  };

  return <div className='flex'>{evolutions.map(renderEvolution)}</div>;
};

export default Evolutions;
