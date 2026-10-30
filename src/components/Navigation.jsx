import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/">
        Home
      </Link>

      <Link to="/teams">
        Teams
      </Link>

      <Link to="/pokemon">
        Pokemon
      </Link>
    </nav>
  );
}

export default Navigation;