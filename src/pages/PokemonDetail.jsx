import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function PokemonDetail() {
  const { pokemonName } = useParams();

  const [result, setResult] = useState(null);
  const pokemonDetail = result?.name === pokemonName ? result.data : null;
  const error = result?.name === pokemonName ? result.error : null;

  useEffect(() => {
    const controller = new AbortController();

    // detail data ophalen met de naam uit de route
    fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(pokemonName)}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status === 404
            ? "Pokemon niet gevonden"
            : "Pokemon kon niet worden geladen. Probeer het later opnieuw.");
        }
        return res.json();
      })
      .then((data) => {
        setResult({ name: pokemonName, data, error: null });
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setResult({ name: pokemonName, data: null,
            error: error instanceof TypeError
              ? "Pokemon laden mislukt. Controleer je internetverbinding en probeer opnieuw."
              : error.message });
        }
      });

    return () => controller.abort();
  }, [pokemonName]);

  if (error) {
    return (
      <section className="pokemonDetail">
        <h2 role="alert">{error}</h2>

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
        <h2 role="status">Pokemon laden...</h2>
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
