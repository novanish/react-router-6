import { useOutletContext } from "react-router-dom";
import { Van } from "../../../vans";

export default function HostVanDetail() {
  const { van } = useOutletContext<{ van: Van }>();

  return (
    <section className="host-van-detail-info">
      <h4>
        Name: <span>{van.name}</span>
      </h4>
      <h4>
        Category: <span>{van.type}</span>
      </h4>
      <h4>
        Description: <span>{van.description}</span>
      </h4>
      <h4>
        Visibility: <span>Public</span>
      </h4>
    </section>
  );
}
