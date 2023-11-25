import { NavLink } from "react-router-dom";

export default function HostNav() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <nav className="host-nav">
      <NavLink
        to="."
        style={({ isActive }) => (isActive ? activeStyles : {})}
        end
      >
        Dashboard
      </NavLink>
      <NavLink
        to="income"
        style={({ isActive }) => (isActive ? activeStyles : {})}
      >
        Income
      </NavLink>

      <NavLink
        to="vans"
        style={({ isActive }) => (isActive ? activeStyles : {})}
      >
        Vans
      </NavLink>
      <NavLink
        to="reviews"
        style={({ isActive }) => (isActive ? activeStyles : {})}
      >
        Reviews
      </NavLink>
    </nav>
  );
}
