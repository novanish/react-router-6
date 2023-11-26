import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export interface Van {
  name: string;
  id: string;
  description: string;
  price: number;
  type: string;
  imageUrl: string;
}

export default function Vans() {
  const [vans, setVans] = useState<Van[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function fetchVans() {
      const response = await fetch("/api/vans");
      const data = (await response.json()).vans as Van[];
      setVans(data);
    }

    fetchVans();
  }, []);

  const typeFilter = searchParams.get("type");
  const filteredVans = typeFilter
    ? vans.filter(({ type }) => type.toLowerCase() === typeFilter.toLowerCase())
    : vans;

  const vanElements = filteredVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link to={van.id}>
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
