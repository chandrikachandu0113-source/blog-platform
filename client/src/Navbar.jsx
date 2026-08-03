import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>My Blog</h2>

      <Link to="/">
        Home
      </Link>

      {" | "}

      <Link to="/register">
        Register
      </Link>

      {" | "}

      <Link to="/login">
        Login
      </Link>

    </nav>
  );
}

export default Navbar;