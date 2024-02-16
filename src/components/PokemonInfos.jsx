import React, { useEffect, useState } from "react";
import Evolutions from "./Evolutions"; // Assurez-vous d'importer correctement le composant Evolutions
import { useParams } from "react-router-dom";
import "../index.css";

const PokemonInfos = () => {
  const { id } = useParams();
  const [pokemonInfos, setPokemonInfos] = useState(null);
  const [description, setDescription] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemonInfos(data);

        const speciesResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${id}/`
        );
        const speciesData = await speciesResponse.json();

        const englishDescription = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );

        setDescription(
          englishDescription
            ? englishDescription.flavor_text.replace(" ^ ", "")
            : "No description available"
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        setDescription("Error fetching description");
      }
    };

    fetchData();
  }, [id]);

  if (!pokemonInfos) {
    return <div>Loading...</div>;
  }

  const { name, types, stats, weight, height } = pokemonInfos;

  const getTypeCard = (type) => {
    let cardColor = "";

    if (type === "grass") {
      cardColor = "bg-gradient-to-b from-green-700 to-green-400";
    } else if (type === "fire") {
      cardColor = "bg-gradient-to-b from-red-700 to-red-400";
    } else if (type === "water") {
      cardColor = "bg-gradient-to-b from-blue-700 to-blue-400";
    } else if (type === "bug") {
      cardColor = "bg-gradient-to-b from-lime-700 to-lime-400";
    } else if (type === "normal") {
      cardColor = "bg-gradient-to-b from-gray-700 to-gray-400";
    } else if (type === "poison") {
      cardColor = "bg-gradient-to-b from-purple-800 to-purple-500";
    } else if (type === "electric") {
      cardColor = "bg-gradient-to-b from-yellow-500 to-yellow-300";
    } else if (type === "ground") {
      cardColor = "bg-gradient-to-b from-yellow-900 to-yellow-600";
    } else if (type === "fairy") {
      cardColor = "bg-gradient-to-b from-pink-700 to-pink-400";
    } else if (type === "fighting") {
      cardColor = "bg-gradient-to-b from-red-600 to-red-400";
    } else if (type === "psychic") {
      cardColor = "bg-gradient-to-b from-pink-800 to-pink-500";
    } else if (type === "rock") {
      cardColor = "bg-gradient-to-b from-yellow-800 to-yellow-500";
    } else if (type === "ghost") {
      cardColor = "bg-gradient-to-b from-purple-900 to-purple-600";
    } else if (type === "ice") {
      cardColor = "bg-gradient-to-b from-blue-500 to-blue-300";
    } else if (type === "dragon") {
      cardColor = "bg-gradient-to-b from-blue-900 to-blue-600";
    } else if (type === "steel") {
      cardColor = "bg-gradient-to-b from-gray-600 to-gray-400";
    } else if (type === "flying") {
      cardColor = "bg-gradient-to-b from-blue-500 to-blue-300";
    }

    return cardColor;
  };
  const getTypeButton = (type) => {
    let typeColor = "";

    if (type === "grass") {
      typeColor = "bg-gradient-to-b from-green-700 to-green-400";
    } else if (type === "fire") {
      typeColor = "bg-gradient-to-b from-orange-700 to-orange-500";
    } else if (type === "water") {
      typeColor = "bg-gradient-to-b from-blue-700 to-blue-400";
    } else if (type === "bug") {
      typeColor = "bg-gradient-to-b from-lime-800 to-lime-500";
    } else if (type === "normal") {
      typeColor = "bg-gradient-to-b from-gray-700 to-gray-400";
    } else if (type === "poison") {
      typeColor = "bg-gradient-to-b from-purple-800 to-purple-500";
    } else if (type === "electric") {
      typeColor = "bg-gradient-to-b from-yellow-600 to-yellow-400";
    } else if (type === "ground") {
      typeColor = "bg-gradient-to-b from-yellow-800 to-yellow-500";
    } else if (type === "fairy") {
      typeColor = "bg-gradient-to-b from-pink-400 to-pink-200";
    } else if (type === "fighting") {
      typeColor = "bg-gradient-to-b from-red-700 to-red-400";
    } else if (type === "psychic") {
      typeColor = "bg-gradient-to-b from-pink-500 to-pink-300";
    } else if (type === "rock") {
      typeColor = "bg-gradient-to-b from-yellow-700 to-yellow-400";
    } else if (type === "ghost") {
      typeColor = "bg-gradient-to-b from-purple-500 to-purple-300";
    } else if (type === "ice") {
      typeColor = "bg-gradient-to-b from-blue-600 to-blue-300";
    } else if (type === "dragon") {
      typeColor = "bg-gradient-to-b from-blue-800 to-blue-500";
    } else if (type === "dark") {
      typeColor = "bg-gradient-to-b from-gray-800 to-gray-500";
    } else if (type === "steel") {
      typeColor = "bg-gradient-to-b from-gray-700 to-gray-400";
    } else if (type === "flying") {
      typeColor = "bg-gradient-to-b from-blue-400 to-blue-200";
    }

    return typeColor;
  };

  const getPokemonId = () => {
    return String(pokemonInfos.id).padStart(3, "0");
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-800 h-screen">
      <div className="bg-white rounded-lg border-8 border-white-500 shadow-2xl w-2/3 mx-auto my-8 h-2/3 grid grid-cols-2">
        {/* Côté gauche (Image) */}
        <div className="bg-gray-100 w-full">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            alt={name}
            className="w-full h-full"
          />
        </div>

        {/* Côté droit (Titre, Type, Stats) */}
        <div
          className="grid grid-rows-[40%,60%] gap-4 w-full"
          style={{ boxShadow: "-4px 0 5px -5px black" }}
        >
          {/* Partie supérieure (Titre, Type et ID) */}
          <div
            className={`text-white ${getTypeCard(types[0].type.name)} w-full`}
          >
            <p className="font-bold text-xl mt-5 mb-5 ml-16">
              #{getPokemonId()}
            </p>
            <h1 className="text-8xl font-bold uppercase mb-5 ml-10">{name}</h1>

            <div className="flex space-x-2 ml-28">
              {types.map((type) => (
                <span
                  key={type.type.name}
                  className={`rounded-3xl p-3 shadow-2xl w-20 text-center capitalize ${getTypeButton(
                    type.type.name
                  )}`}
                  style={{
                    boxShadow:
                      "10px 10px 5px -5px black, 5px 10px 10px -5px black",
                  }}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

          {/* Partie inférieure (Stats, Description) */}
          <div>
            <div className="flex flex-wrap justify-start mt-[-16px] w-full">
              <div className="flex gap-14 rounded-lg bg-gray-100 h-24 p-5 w-full relative">
                <div className="text-center">
                  <p className="text-lg capitalize text-gray-500 ml-5">
                    Height
                  </p>
                  <p className="text-xl font-semibold ml-5">{height / 10} m</p>
                </div>
                <div className="border-r border-gray-300 h-full"></div>

                <div className="text-center">
                  <p className="text-lg text-gray-500 capitalize mr-5">
                    Weight
                  </p>
                  <p className="text-xl font-semibold">{weight / 10} kg</p>
                </div>
                <div className="border-r border-gray-300 h-full"></div>

                <div className="text-gray-700">
                  <p className="text-base">{description}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-start">
              {stats.map((stat) => (
                <div key={stat.stat.name} className="ml-16">
                  <p className="text-lg font-semibold capitalize">
                    {stat.stat.name}:
                  </p>
                  <p className="text-lg rounded-lg bg-white border-2 w-20 text-center">
                    {stat.base_stat}
                  </p>
                </div>
              ))}

              <div>
                <div className=" flex  justify-center ml-40 mt-[-250px] mb-24 ">
                  <Evolutions pokemonName={name} />
                </div>
                <a
                  href="/pokemons"
                  className="inline-block w-11 ml-80 mr-5 hover:translate-x-[-5px] transition-transform duration-100"
                >
                  <img
                    src="/assets/14079449.png"
                    alt="retour"
                    style={{ transform: "rotate(-90deg)" }}
                  />
                </a>
                <a href="/" className="inline-block">
                  <div className="w-12 icon-rotate mx-auto">
                    <img
                      src="/assets/télécharger.png"
                      alt="home"
                      className="w-full h-auto"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PokemonInfos;
