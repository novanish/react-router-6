import { useOutletContext } from "react-router-dom";
import { Van } from "../../../../vans";

export default function HostVanPricing() {
  const { van } = useOutletContext<{ van: Van }>();
  return (
    <h3 className="host-van-price">
      ${van.price}
      <span>/day</span>
    </h3>
  );
}
