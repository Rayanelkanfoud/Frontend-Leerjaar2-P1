function InfoCard({ title, text }) {
  return (
    <div className="card">
      {/* gegevens komen binnen via props */}
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default InfoCard;