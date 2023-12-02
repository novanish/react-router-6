import { Link, NavLink } from "react-router-dom";

function fakeLogOut() {
  localStorage.removeItem("loggedIn");
}

export function Navbar() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  return (
    <header>
      <NavLink
        className="site-logo"
        to="."
        style={({ isActive }) => (isActive ? activeStyles : {})}
      >
        #VanLife
      </NavLink>
      <nav>
        <NavLink
          to="host"
          style={({ isActive }) => (isActive ? activeStyles : {})}
        >
          Host
        </NavLink>
        <NavLink
          to="about"
          style={({ isActive }) => (isActive ? activeStyles : {})}
        >
          About
        </NavLink>
        <NavLink
          to="vans"
          style={({ isActive }) => (isActive ? activeStyles : {})}
        >
          Vans
        </NavLink>
        <Link to="login" className="login-link">
          <img
            src="../assets/images/avatar-icon.png"
            alt="log-in icon"
            className="login-icon"
          />
        </Link>

        <button onClick={fakeLogOut}>X</button>
      </nav>
    </header>
  );
}
