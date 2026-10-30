import { useState } from "react";
import TeamCard from "../components/TeamCard";

function TeamList({
  teams,
  addTeam,
  deleteTeam,
}) {
  const [teamName, setTeamName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    // geen leeg team toevoegen
    if (teamName.trim() === "") {
      return;
    }

    addTeam(teamName);

    setTeamName("");
  }

  return (
    <section className="teamList">
      <h2>Mijn teams</h2>

      <p className="pageIntro">
        Maak teams en beheer je Pokemon.
      </p>

      <form
        className="createForm"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Naam van team"
          value={teamName}
          onChange={(event) =>
            setTeamName(event.target.value)
          }
        />

        <button className="mainButton">
          Team toevoegen
        </button>
      </form>

      <div className="teamCards">
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            deleteTeam={deleteTeam}
          />
        ))}
      </div>
    </section>
  );
}

export default TeamList;