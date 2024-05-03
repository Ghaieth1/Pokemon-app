import { useEffect, useState } from 'react';

import '../index.css';

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPokemonDetails = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const getTypeCard = (type) => {
    let cardColor = '';

    if (type === 'grass') {
      cardColor = 'bg-gradient-to-b from-green-300 to-green-200';
    } else if (type === 'fire') {
      cardColor = 'bg-gradient-to-b from-red-300 to-red-200';
    } else if (type === 'water') {
      cardColor = 'bg-gradient-to-b from-blue-300 to-blue-200';
    } else if (type === 'bug') {
      cardColor = 'bg-gradient-to-b from-lime-400 to-lime-300';
    } else if (type === 'normal') {
      cardColor = 'bg-gradient-to-b from-gray-400 to-gray-300';
    } else if (type === 'poison') {
      cardColor = 'bg-gradient-to-b from-purple-500 to-purple-400';
    } else if (type === 'electric') {
      cardColor = 'bg-gradient-to-b from-yellow-400 to-yellow-300';
    } else if (type === 'ground') {
      cardColor = 'bg-gradient-to-b from-yellow-800 to-yellow-900';
    } else if (type === 'fairy') {
      cardColor = 'bg-gradient-to-b from-pink-300 to-pink-300';
    } else if (type === 'fighting') {
      cardColor = 'bg-gradient-to-b from-red-500 to-red-400';
    } else if (type === 'psychic') {
      cardColor = 'bg-gradient-to-b from-pink-600 to-pink-500';
    } else if (type === 'rock') {
      cardColor = 'bg-gradient-to-b from-yellow-600 to-yellow-700';
    } else if (type === 'ghost') {
      cardColor = 'bg-gradient-to-b from-purple-400 to-purple-500';
    } else if (type === 'ice') {
      cardColor = 'bg-gradient-to-b from-blue-500 to-blue-400';
    } else if (type === 'dragon') {
      cardColor = 'bg-gradient-to-b from-blue-600 to-blue-500';
    } else if (type === 'steel') {
      cardColor = 'bg-gradient-to-b from-gray-400 to-gray-500';
    } else if (type === 'flying') {
      cardColor = 'bg-gradient-to-b from-blue-300 to-blue-300';
    }

    return cardColor;
  };

  const getTypeButton = (type) => {
    let typeColor = '';

    if (type === 'grass') {
      typeColor = 'bg-green-400';
    } else if (type === 'fire') {
      typeColor = 'bg-orange-500';
    } else if (type === 'water') {
      typeColor = 'bg-blue-400';
    } else if (type === 'bug') {
      typeColor = 'bg-lime-500';
    } else if (type === 'normal') {
      typeColor = 'bg-gray-400';
    } else if (type === 'poison') {
      typeColor = 'bg-purple-600';
    } else if (type === 'electric') {
      typeColor = 'bg-yellow-400';
    } else if (type === 'ground') {
      typeColor = 'bg-yellow-700';
    } else if (type === 'fairy') {
      typeColor = 'bg-pink-500';
    } else if (type === 'fighting') {
      typeColor = 'bg-red-600';
    } else if (type === 'psychic') {
      typeColor = 'bg-pink-400';
    } else if (type === 'rock') {
      typeColor = 'bg-yellow-600';
    } else if (type === 'ghost') {
      typeColor = 'bg-purple-400';
    } else if (type === 'ice') {
      typeColor = 'bg-blue-500';
    } else if (type === 'dragon') {
      typeColor = 'bg-blue-800';
    } else if (type === 'dark') {
      typeColor = 'bg-gray-600';
    } else if (type === 'steel') {
      typeColor = 'bg-gray-500';
    } else if (type === 'flying') {
      typeColor = 'bg-blue-300';
    }

    return typeColor;
  };

  const fetchAllPokemonTypes = async () => {
    const typesPromises = pokemons.map((pokemon) =>
      getPokemonTypes(pokemon.url)
    );
    const types = await Promise.all(typesPromises);
    return types;
  };

  const getPokemonTypes = async (url) => {
    const details = await fetchPokemonDetails(url);
    return details.types.map((type) => type.type.name).join(', ');
  };

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((response) => response.json())
      .then((data) => setPokemons(data.results));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const types = await fetchAllPokemonTypes();
      setPokemons((prevPokemons) =>
        prevPokemons.map((pokemon, index) => ({
          ...pokemon,
          type: types[index],
        }))
      );
    };

    fetchData();
  }, [pokemons]);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-800 h-screen'>
      <div className='bg-white p-8 rounded-lg border-8 border-white-500 shadow-2xl w-2/3 mx-auto my-8 overflow-y-auto h-2/3'>
        <div className='flex justify-end gap-5'>
          <div className='flex items-end space-x-5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6'
            >
              <path d='M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.57 16.476c-.223.082-.448.161-.674.238L7.319 4.137A6.75 6.75 0 0 1 18.75 9v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206Z' />
              <path
                fillRule='evenodd'
                d='M5.25 9c0-.184.007-.366.022-.546l10.384 10.384a3.751 3.751 0 0 1-7.396-1.119 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z'
                clipRule='evenodd'
              />
            </svg>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6 '
            >
              <path
                fillRule='evenodd'
                d='M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.062 0 8.25 8.25 0 0 0-11.667 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.204 3.182a6 6 0 0 1 8.486 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0 3.75 3.75 0 0 0-5.304 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182a1.5 1.5 0 0 1 2.122 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0l-.53-.53a.75.75 0 0 1 0-1.06Z'
                clipRule='evenodd'
              />
            </svg>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6'
            >
              <path d='M4.5 9.75a.75.75 0 0 0-.75.75V15c0 .414.336.75.75.75h6.75A.75.75 0 0 0 12 15v-4.5a.75.75 0 0 0-.75-.75H4.5Z' />
              <path
                fillRule='evenodd'
                d='M3.75 6.75a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-.037c.856-.174 1.5-.93 1.5-1.838v-2.25c0-.907-.644-1.664-1.5-1.837V9.75a3 3 0 0 0-3-3h-15Zm15 1.5a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5v-6a1.5 1.5 0 0 1 1.5-1.5h15Z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </div>
        <a href='/' className='inline-block '>
          <div className='w-12 icon-rotate'>
            <img
              src='/assets/télécharger.png'
              alt='home'
              className='w-full h-auto'
            />
          </div>
        </a>
        <div className='mx-auto mt-5 mb-8 p-5 rounded-md w-full'>
          <div className='flex items-center mb-4'></div>

          <div className='relative'>
            <div className='absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none'>
              <svg
                className='w-5 h-5 text-black'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
            </div>
            <input
              type='text'
              placeholder='Search a Pokemon...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='block w-full p-4 pl-10 text-sm  border  rounded-3xl 0 focus:ring-blue-500 focus:border-blue-500 focus:outline-none d dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>

          <div className='grid grid-cols-1 gap-5 mt-10 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'>
            {filteredPokemons.map((pokemon) => {
              return (
                <div
                  key={pokemon.name}
                  className={`rounded-3xl p-4 w-72 h-[450px] mx-auto my-auto relative overflow-hidden mb-10 md:w-48 lg:w-48 xl:w-60 2xl:w-64 ${getTypeCard(
                    pokemon.type && pokemon.type.split(', ')[0]
                  )}`}
                  style={{
                    boxShadow:
                      '10px 17px 5px -5px black, 15px 10px 5px -5px black',
                  }}
                >
                  <p className='text-center text-lg font-bold mt-[-5px]'>
                    #
                    {String(pokemon.url && pokemon.url.split('/')[6]).padStart(
                      3,
                      '0'
                    )}
                  </p>
                  <a
                    href={`/pokemons/${
                      pokemon.url && pokemon.url.split('/')[6]
                    }`}
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                        pokemon.url.split('/')[6]
                      }.svg`}
                      alt={pokemon.name}
                      className='w-56 h-48 mx-auto mb-2 mt-20'
                    />
                  </a>

                  <p className='text-center  font-bold mb-8 capitalize text-lg underline underline-offset-4'>
                    {pokemon.name}
                  </p>

                  <div className='flex justify-center space-x-5'>
                    {pokemon.type &&
                      pokemon.type.split(', ').map((type) => (
                        <div
                          key={type}
                          className={`rounded-3xl p-3 shadow-2xl w-20 text-center capitalize ${getTypeButton(
                            type
                          )}`}
                          style={{
                            boxShadow:
                              '10px 10px 5px -5px black, 5px 10px 10px -5px black',
                          }}
                        >
                          {type}
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemons;
