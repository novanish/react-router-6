import { useParams, Link, useLocation, Location } from "react-router-dom";
import { Van } from "..";
import { useEffect, useState } from "react";

export default function VanDetail() {
  const { id } = useParams();
  const [van, setVan] = useState<Van | null>(null);
  const location: Location<{ search: string } | null> = useLocation();

  useEffect(() => {
    async function fetchVan() {
      const response = await fetch(`/api/vans/${id}`);
      const data = (await response.json()).vans as Van;
      setVan(data);
    }

    fetchVan();
  }, [id]);

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
      {van ? (
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
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
