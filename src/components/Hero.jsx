import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      {/* pokeball word gemaakt met css */}
      <div className="pokeball">
        <div className="pokeballLine"></div>
        <div className="pokeballCircle"></div>
      </div>

      <h2>
        Welkom bij Pokemon Team Manager
      </h2>

      <p>
        Maak je eigen Pokemon teams en beheer je favoriete Pokemon.
      </p>

      <Link
        to="/teams"
        className="mainButton"
      >
        Bekijk teams
      </Link>
    </section>
  );
}

export default Hero;