import { send_request } from "./utils";
type props = {
  id: string | string[];
};
export async function getUserInfo({ id }: props) {
  const data = await send_request({
    method: "GET",
    url: `/api/user/${id}`,
  });
  return data?.data;
}
