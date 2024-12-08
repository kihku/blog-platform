import { send_request } from "./utils";
type props = {
  id: string | string[];
};
export async function getUserInfo({ id }: props) {
  const data = await send_request({
    method: "GET",
    url: `/user/${id}`,
  });
  return data?.data;
}

type updateProgressProps = {
  id: string;
  lesson: { id: string; order: number };
  unit: { id: string };
};
export async function updateProgress(props: updateProgressProps) {
  const data = await send_request({
    method: "POST",
    url: "/user/updateProgress",
    body: { ...props },
  });
  return data?.data;
}
