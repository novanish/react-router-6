import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface Van {
  name: string;
  id: number;
  description: string;
  price: number;
  type: string;
  imageUrl: string;
}

export default function Vans() {
  const [vans, setVans] = useState<Van[]>([]);

  useEffect(() => {
    async function fetchVans() {
      const response = await fetch("/api/vans");
      const data = (await response.json()).vans as Van[];
      setVans(data);
    }

    fetchVans();
  }, []);

  const vanElements = vans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link to={`/vans/${van.id}`}>
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
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
