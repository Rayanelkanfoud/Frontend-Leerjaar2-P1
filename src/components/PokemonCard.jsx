import { Link } from "react-router-dom";

function PokemonCard({
  pokemon,
  showDelete = false,
  onDelete,
}) {
  return (
    <div className="pokemonCard">
      <div className="pokemonPlaceholder">
        ?
      </div>

      <h3>
        {pokemon.name}
      </h3>

      <Link
        to={`/pokemon/${pokemon.name}`}
        className="smallButton"
      >
        Bekijken
      </Link>

      {showDelete && (
        <button
          className="deleteSmallButton"
          onClick={onDelete}
        >
          Uit team verwijderen
        </button>
      )}
    </div>
  );
}

export default PokemonCard;