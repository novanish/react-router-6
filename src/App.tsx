import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/home";
import About from "./pages/about";
import Dashboard from "./pages/host";
import Income from "./pages/host/income";
import Vans from "./pages/vans";
import VanDetail from "./pages/vans/$id";
import "../server";
import Reviews from "./pages/host/reviews";
import HostLayout from "./pages/host/HostLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          <Route path="vans" element={<Vans />} />
          <Route path="/vans/:id" element={<VanDetail />} />

          <Route path="host" element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
