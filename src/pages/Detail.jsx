import { useState } from "react";
import { useParams } from "react-router-dom";

import PokemonCard from "../components/PokemonCard";

function Detail({
  teams,
  pokemons,
  addPokemonToTeam,
  removePokemonFromTeam,
}) {
  const { teamId } = useParams();

  const [selectedPokemon, setSelectedPokemon] =
    useState("");

  const team = teams.find(
    (team) =>
      team.id === Number(teamId)
  );

  if (!team) {
    return (
      <section className="detailPage">
        <h2>Team niet gevonden</h2>
      </section>
    );
  }

  // pokemon zoeken die in dit team zitten
  const teamPokemons = pokemons.filter(
    (pokemon) =>
      team.pokemonNames.includes(
        pokemon.name
      )
  );

  // alleen pokemon tonen die bestaan
  // en nog niet in dit team zitten
  const availablePokemons = pokemons.filter(
    (pokemon) =>
      !team.pokemonNames.includes(
        pokemon.name
      )
  );

  function handleAddPokemon() {
    if (selectedPokemon === "") {
      return;
    }

    addPokemonToTeam(
      team.id,
      selectedPokemon
    );

    setSelectedPokemon("");
  }

  return (
    <section className="detailPage">
      <h2>
        {team.name}
      </h2>

      <p className="pageIntro">
        Pokemon in dit team
      </p>

      <div className="addPokemonBox">
        <select
          value={selectedPokemon}
          onChange={(event) =>
            setSelectedPokemon(
              event.target.value
            )
          }
        >
          <option value="">
            Kies een Pokemon
          </option>

          {availablePokemons.map(
            (pokemon) => (
              <option
                key={pokemon.name}
                value={pokemon.name}
              >
                {pokemon.name}
              </option>
            )
          )}
        </select>

        <button
          className="mainButton"
          onClick={handleAddPokemon}
        >
          Pokemon toevoegen
        </button>
      </div>

      <div className="pokemonGrid">
        {teamPokemons.map(
          (pokemon) => (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              showDelete={true}
              onDelete={() =>
                removePokemonFromTeam(
                  team.id,
                  pokemon.name
                )
              }
            />
          )
        )}
      </div>

      {teamPokemons.length === 0 && (
        <p>
          Dit team heeft nog geen Pokemon.
        </p>
      )}
    </section>
  );
}

export default Detail;