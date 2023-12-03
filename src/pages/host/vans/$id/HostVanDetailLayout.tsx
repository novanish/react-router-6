import {
  Link,
  type LoaderFunctionArgs,
  NavLink,
  Outlet,
  useLoaderData,
} from "react-router-dom";
import { getHostVans } from "../../../../utils/api";
import { requireAuth } from "../../../../utils/requireAuth";


export async function loader({ params, request }:LoaderFunctionArgs) {
  await requireAuth(request);
  return getHostVans(params["id"]!);
}

export default function HostVanDetailLayout() {
  const van = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  const style = ({ isActive }: { isActive: boolean }) =>
    isActive ? activeStyles : {};

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>

      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={van.imageUrl} />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${van.type}`}>{van.type}</i>
            <h3>{van.name}</h3>
            <h4>${van.price}/day</h4>
          </div>
        </div>
        <nav className="host-van-detail-nav">
          <NavLink to="." style={style} end>
            Details
          </NavLink>
          <NavLink to="pricing" style={style}>
            Pricing
          </NavLink>
          <NavLink to="photos" style={style}>
            Photos
          </NavLink>
        </nav>
        <Outlet context={{ van }} />
      </div>
    </section>
  );
}
