import { Outlet } from "react-router-dom";
import { Navbar } from "./nav";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
