import { Outlet } from "react-router-dom";
import HostNav from "../../components/host-nav";

export default function HostLayout() {
  return (
    <>
      <HostNav />
      <Outlet />
    </>
  );
}
