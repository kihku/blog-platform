import { Lesson } from "@/types";
import { send_request } from "./utils";

type Filter = {
  journeyUnitId: string;
};

export async function createLesson(props: Lesson) {
  const data = await send_request({
    method: "POST",
    url: `/lesson/create`,
    body: { ...props },
  });
  return data?.data;
}

export async function getListLesson(props: Filter) {
  const data = await send_request({
    method: "GET",
    url: "/lesson/list",
    params: { ...props },
  });
  return data?.data;
}

export async function getLesson({ id }: { id: string }) {
  const data = await send_request({ method: "GET", url: `/lesson/${id}` });
  return data?.data as Lesson;
}

export async function completeLesson() {
  const data = await send_request({
    method: "POST",
    url: "/user/completeLesson",
    // params: { ...props },
  });
  return data?.data;
}
