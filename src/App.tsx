import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <Link className="site-logo" to="/">
          #VanLife
        </Link>
        <nav>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

