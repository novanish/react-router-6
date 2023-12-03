import { Link, useLoaderData, defer, Await } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";
import { getHostVans } from "../../../utils/api";
import { requireAuth } from "../../../utils/requireAuth";
import { Van } from "../../vans";
import React from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request);
  return defer({ vans: getHostVans() });
}

export default function HostVans() {
  const dataPromise = useLoaderData() as { vans: Promise<Van[]> };

  function renderHostVans(vans: Van[]) {
    const hostVansEls = vans.map((van) => (
      <Link to={van.id} key={van.id} className="host-van-link-wrapper">
        <div className="host-van-single" key={van.id}>
          <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </Link>
    ));

    return hostVansEls;
  }

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        <section>
          <React.Suspense fallback={<h2>Loading.....</h2>}>
            <Await resolve={dataPromise.vans}>{renderHostVans}</Await>
          </React.Suspense>
        </section>
      </div>
    </section>
  );
}
