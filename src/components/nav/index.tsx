import { NavLink } from "react-router-dom";

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
      </nav>
    </header>
  );
}
