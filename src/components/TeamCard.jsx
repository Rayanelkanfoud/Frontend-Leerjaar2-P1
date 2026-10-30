import { Link } from "react-router-dom";

function TeamCard({
  team,
  deleteTeam,
}) {
  return (
    <div className="teamCard">
      <div>
        <h3>
          {team.name}
        </h3>

        <p>
          {team.pokemonNames.length} Pokemon
        </p>
      </div>

      <div className="cardActions">
        <Link
          to={`/teams/${team.id}`}
          className="smallButton"
        >
          Bekijk team
        </Link>

        <button
          className="deleteSmallButton"
          onClick={() =>
            deleteTeam(team.id)
          }
        >
          Verwijderen
        </button>
      </div>
    </div>
  );
}

export default TeamCard;