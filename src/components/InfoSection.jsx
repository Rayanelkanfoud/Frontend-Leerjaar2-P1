import InfoCard from "./InfoCard";

function InfoSection() {
  return (
    <section className="info">
      <h2>Jouw Pokemon teams</h2>

      <div className="cards">
        <InfoCard
          title="Teams beheren"
          text="Maak teams aan en beheer je bestaande teams."
        />

        <InfoCard
          title="Pokemon toevoegen"
          text="Voeg Pokemon toe aan je eigen team."
        />

        <InfoCard
          title="Favorieten"
          text="Bewaar Pokemon die je later wilt gebruiken."
        />
      </div>
    </section>
  );
}

export default InfoSection;