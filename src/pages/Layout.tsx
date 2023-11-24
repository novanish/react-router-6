import { Outlet } from "react-router-dom";
import { Navbar } from "../components/nav";
import { Footer } from "../components/footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
