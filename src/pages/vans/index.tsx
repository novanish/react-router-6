import {
  Link,
  useLoaderData,
  useSearchParams,
  LoaderFunctionArgs,
} from "react-router-dom";
import { getVans } from "../../utils/api";

export interface Van {
  name: string;
  id: string;
  description: string;
  price: number;
  type: string;
  imageUrl: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export function loader(props: LoaderFunctionArgs) {
  console.log(props);
  return getVans();
}

export default function Vans() {
  const vans = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");
  const filteredVans = typeFilter
    ? vans.filter(({ type }) => type.toLowerCase() === typeFilter.toLowerCase())
    : vans;

  const vanElements = filteredVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link
        to={van.id}
        state={{ search: "?" + searchParams.toString() }}
      aria-label={`View details for ${van.name}, priced at $${van.price} per day`}
      >
        <img src={van.imageUrl} alt={`Image of ${van.name} van`} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => setSearchParams("type=simple")}
          className={`van-type simple${
            typeFilter === "simple" ? " selected" : ""
          }`}
        >
          Simple
        </button>
        <button
          onClick={() => setSearchParams({ type: "luxury" })}
          className={`van-type luxury${
            typeFilter === "luxury" ? " selected" : ""
          }`}
        >
          Luxury
        </button>
        <Link
          to="?type=rugged"
          className={`van-type rugged${
            typeFilter === "rugged" ? " selected" : ""
          }`}
        >
          Rugged
        </Link>
        {searchParams.get("type") !== null ? (
          <button
            onClick={() => setSearchParams({})}
            className={`van-type clear-filters`}
          >
            Clear filter
          </button>
        ) : null}
        {/* <button
          onClick={() => setSearchParams("")}
          className="van-type clear-filters"
        >
          Clear filter
        </button> */}
        {/* <Link to="." className="van-type clear-filters">
          Clear filter
        </Link> */}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
