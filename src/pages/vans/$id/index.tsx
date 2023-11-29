import {
  Link,
  useLocation,
  Location,
  type LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import { getVans } from "../../../utils/api";

export function loader({ params }: LoaderFunctionArgs) {
  return getVans(params["id"]!);
}

export default function VanDetail() {
  const van = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const location: Location<{ search: string } | null> = useLocation();

  const search = location.state?.search ?? "";
  const vanType = new URLSearchParams(search).get("type");

  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr;{" "}
        <span>
          Back to{" "}
          {vanType
            ? vanType.charAt(0).toUpperCase() + vanType.slice(1).toLowerCase()
            : "all"}{" "}
          vans
        </span>
      </Link>
      <div className="van-detail">
        <img src={van.imageUrl} />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className="van-price">
          <span>${van.price}</span>/day
        </p>
        <p>{van.description}</p>
        <button className="link-button">Rent this van</button>
      </div>
    </div>
  );
}
