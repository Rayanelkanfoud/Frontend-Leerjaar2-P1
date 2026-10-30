import PokemonApiList from "../components/PokemonApiList";
import PokemonCard from "../components/PokemonCard";

function PokemonList({
  pokemons,
  addPokemon,
  deletePokemon,
}) {
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

      {pokemons.length === 0 && (
        <p>
          Je hebt nog geen Pokemon toegevoegd.
        </p>
      )}

      <div className="pokemonGrid">
        {pokemons.map((pokemon) => (
          <div
            className="pokemonManageItem"
            key={pokemon.name}
          >
            <PokemonCard
              pokemon={pokemon}
            />

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