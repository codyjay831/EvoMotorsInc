import { getFeaturedVehicles } from "@/lib/api";
import { HomeFeaturedVehicles } from "./HomeFeaturedVehicles";

export async function HomeFeaturedInventoryLoader() {
  try {
    const vehicles = await getFeaturedVehicles(6);
    return <HomeFeaturedVehicles vehicles={vehicles} />;
  } catch {
    return <HomeFeaturedVehicles vehicles={[]} loadError />;
  }
}
