import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/home";
import About from "./pages/about";
import Dashboard from "./pages/host";
import Income from "./pages/host/income";
import Vans from "./pages/vans";
import VanDetail from "./pages/vans/$id";
import Reviews from "./pages/host/reviews";
import HostLayout from "./pages/host/HostLayout";
import HostVans from "./pages/host/vans";
import "../server";
import HostVanPricing from "./pages/host/vans/$id/pricing";
import HostVanPhotos from "./pages/host/vans/$id/photos";
import HostVanDetailLayout from "./pages/host/vans/$id/HostVanDetailLayout";
import HostVanDetail from "./pages/host/vans/$id";

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
            <Route path="vans" element={<HostVans />} />

            <Route path="vans/:id" element={<HostVanDetailLayout />}>
              <Route index element={<HostVanDetail />} />
              <Route path="pricing" element={<HostVanPricing />} />
              <Route path="photos" element={<HostVanPhotos />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
