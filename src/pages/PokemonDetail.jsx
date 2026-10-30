import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function PokemonDetail({
  pokemons,
}) {
  const { pokemonName } = useParams();

  const [pokemonDetail, setPokemonDetail] =
    useState(null);

  const pokemon = pokemons.find(
    (pokemon) =>
      pokemon.name === pokemonName
  );

  useEffect(() => {
    if (!pokemon) {
      return;
    }

    // detail data ophalen via url uit de api
    fetch(pokemon.url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setPokemonDetail(data);
      });
  }, [pokemon]);

  if (!pokemon) {
    return (
      <section className="pokemonDetail">
        <h2>Pokemon niet gevonden</h2>

        <Link
          to="/pokemon"
          className="mainButton"
        >
          Terug naar Pokemon
        </Link>
      </section>
    );
  }

  if (!pokemonDetail) {
    return (
      <section className="pokemonDetail">
        <h2>Pokemon laden...</h2>
      </section>
    );
  }

  return (
    <section className="pokemonDetail">
      <img
        className="pokemonImage"
        src={
          pokemonDetail.sprites.front_default
        }
        alt={pokemonDetail.name}
      />

      <h2>
        {pokemonDetail.name}
      </h2>

      <div className="pokemonInfo">
        <p>
          <strong>ID:</strong>{" "}
          {pokemonDetail.id}
        </p>

        <p>
          <strong>Type:</strong>{" "}
          {pokemonDetail.types
            .map((type) => type.type.name)
            .join(", ")}
        </p>

        <p>
          <strong>Hoogte:</strong>{" "}
          {pokemonDetail.height}
        </p>

        <p>
          <strong>Gewicht:</strong>{" "}
          {pokemonDetail.weight}
        </p>
      </div>

      <Link
        to="/pokemon"
        className="mainButton"
      >
        Terug naar Pokemon
      </Link>
    </section>
  );
}

export default PokemonDetail;