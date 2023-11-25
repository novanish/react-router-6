import { useOutletContext } from "react-router-dom";
import { Van } from "../../../../vans";

export default function HostVanPhotos() {
  const { van } = useOutletContext<{ van: Van }>();
  return <img src={van.imageUrl} className="host-van-detail-image" />;
}
