import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <header>
      <NavLink className="site-logo" to="/">
        #VanLife
      </NavLink>
      <nav>
        <NavLink to="/host">Host</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/vans">Vans</NavLink>
      </nav>
    </header>
  );
}
