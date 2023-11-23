import { useParams } from "react-router-dom";
import { Van } from "..";
import { useEffect, useState } from "react";

export default function VanDetail() {
  const { id } = useParams();
  const [van, setVan] = useState<Van | null>(null);

  useEffect(() => {
    async function fetchVan() {
      const response = await fetch(`/api/vans/${id}`);
      const data = (await response.json()).vans as Van;
      console.log(data);
      setVan(data);
    }

    fetchVan();
  }, [id]);

  return (
    <div className="van-detail-container">
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
