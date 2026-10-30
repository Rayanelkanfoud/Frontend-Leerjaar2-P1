import { useEffect, useState } from "react";

function PokemonApiList({
  addPokemon,
  pokemons,
}) {
  const [apiPokemons, setApiPokemons] = useState([]);

  useEffect(() => {
    // pokemon ophalen uit de poke api
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setApiPokemons(data.results);
      });
  }, []);

  function pokemonBestaatAl(name) {
    return pokemons.some(
      (pokemon) => pokemon.name === name
    );
  }

  function handleAdd(pokemon) {
    // alleen pokemon uit de api worden toegevoegd
    if (pokemonBestaatAl(pokemon.name)) {
      return;
    }

    addPokemon({
      name: pokemon.name,
      url: pokemon.url,
    });
  }

  return (
    <div className="apiPokemonList">
      {apiPokemons.map((pokemon) => (
        <div
          className="apiPokemonCard"
          key={pokemon.name}
        >
          <h3>{pokemon.name}</h3>

          <button
            className="smallButton"
            onClick={() => handleAdd(pokemon)}
            disabled={pokemonBestaatAl(pokemon.name)}
          >
            {pokemonBestaatAl(pokemon.name)
              ? "Toegevoegd"
              : "Toevoegen"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default PokemonApiList;