import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../utils/getVans";

export interface Van {
  name: string;
  id: string;
  description: string;
  price: number;
  type: string;
  imageUrl: string;
}

interface ThrownError {
  message: string;
  statusCode: number;
  statusText: string;
}

export default function Vans() {
  const [vans, setVans] = useState<Van[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ThrownError | null>(null);

  useEffect(() => {
    async function loadVans() {
      try {
        setIsLoading(true);
        const data = await getVans();
        setVans(data);
      } catch (error) {
        const { message } = error as unknown as ThrownError;
        console.error(message);
        setError(error as unknown as ThrownError);
      } finally {
        setIsLoading(false);
      }
    }

    loadVans();
  }, []);

  const typeFilter = searchParams.get("type");
  const filteredVans = typeFilter
    ? vans.filter(({ type }) => type.toLowerCase() === typeFilter.toLowerCase())
    : vans;

  const vanElements = filteredVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link to={van.id} state={{ search: "?" + searchParams.toString() }}>
        <img src={van.imageUrl} />
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

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

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
