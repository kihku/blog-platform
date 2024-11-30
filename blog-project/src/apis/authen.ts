import { send_request } from "./utils";

export async function authenGgUser() {
  const data = await send_request({
    method: "GET",
    url: `/auth/google`,
  });
  return data;
}
