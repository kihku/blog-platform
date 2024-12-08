import { Unit } from "@/types";
import { send_request } from "./utils";

export async function createUnit(props: Unit) {
  const data = await send_request({
    method: "POST",
    url: `/api/unit/create`,
    body: { ...props },
  });
  return data?.data;
}

export async function getUnitList() {
  const data = await send_request({
    method: "GET",
    url: `/api/unit/list`,
  });
  return data?.data;
}
