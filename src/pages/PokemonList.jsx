import { useState } from "react";
import PokemonApiList from "../components/PokemonApiList";
import PokemonCard from "../components/PokemonCard";

function PokemonList({
  pokemons,
  addPokemon,
  deletePokemon,
  toggleFavorite,
}) {
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const visiblePokemons = onlyFavorites
    ? pokemons.filter((pokemon) => pokemon.isFavorite)
    : pokemons;

  return (
    <section className="pokemonPage">
      <h2>Pokemon</h2>

      <p className="pageIntro">
        Kies Pokemon uit de PokéAPI en voeg ze toe aan je lijst.
      </p>

      <h3>Beschikbare Pokemon</h3>

      <PokemonApiList
        addPokemon={addPokemon}
        pokemons={pokemons}
      />

      <h3 className="myPokemonTitle">
        Mijn Pokemon
      </h3>

      <p>Markeer je favoriete Pokemon met een ster. Je kunt ze daarna snel terugvinden met het filter.</p>
      <label>
        <input
          type="checkbox"
          checked={onlyFavorites}
          onChange={(event) => setOnlyFavorites(event.target.checked)}
        />{" "}
        Alleen favorieten tonen
      </label>

      {visiblePokemons.length === 0 && (
        <p>
          {onlyFavorites ? "Je hebt nog geen favoriete Pokemon." : "Je hebt nog geen Pokemon toegevoegd."}
        </p>
      )}

      <div className="pokemonGrid">
        {visiblePokemons.map((pokemon) => (
          <div
            className="pokemonManageItem"
            key={pokemon.name}
          >
            <PokemonCard
              pokemon={pokemon}
            />

            <button
              className="smallButton"
              aria-pressed={Boolean(pokemon.isFavorite)}
              aria-label={`${pokemon.name} ${pokemon.isFavorite ? "uit favorieten verwijderen" : "als favoriet markeren"}`}
              onClick={() => toggleFavorite(pokemon.name)}
            >
              {pokemon.isFavorite ? "★ Favoriet" : "☆ Maak favoriet"}
            </button>

            <button
              className="deleteSmallButton"
              onClick={() =>
                deletePokemon(pokemon.name)
              }
            >
              Pokemon verwijderen
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PokemonList;
