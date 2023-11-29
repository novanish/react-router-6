import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/home";
import About from "./pages/about";
import Dashboard from "./pages/host";
import Income from "./pages/host/income";
import Vans, { loader as vansLoader } from "./pages/vans";
import VanDetail, { loader as vanDetailLoader } from "./pages/vans/$id";
import Reviews from "./pages/host/reviews";
import HostLayout from "./pages/host/HostLayout";
import HostVans, { loader as hostVansLoader } from "./pages/host/vans";
import "../server";
import HostVanPricing from "./pages/host/vans/$id/pricing";
import HostVanPhotos from "./pages/host/vans/$id/photos";
import HostVanDetailLayout, {
  loader as hostVanDetailLoader,
} from "./pages/host/vans/$id/HostVanDetailLayout";
import HostVanDetail from "./pages/host/vans/$id";
import NotFound from "./pages/not-found";
import VansError from "./pages/vans/error";
import Login from "./pages/login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="about" element={<About />} />

      <Route
        path="vans"
        element={<Vans />}
        loader={vansLoader}
        errorElement={<VansError />}
      />
      <Route path="vans/:id" element={<VanDetail />} loader={vanDetailLoader} />

      <Route path="host" element={<HostLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="income" element={<Income />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="vans" element={<HostVans />} loader={hostVansLoader} />

        <Route
          path="vans/:id"
          element={<HostVanDetailLayout />}
          loader={hostVanDetailLoader}
        >
          <Route index element={<HostVanDetail />} />
          <Route path="pricing" element={<HostVanPricing />} />
          <Route path="photos" element={<HostVanPhotos />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
