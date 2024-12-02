import { Skeleton } from "antd";

export default function Loading() {
  return (
    <div className="h-full flex content-center justify-center w-full">
      <Skeleton className="mt-10 lg:mx-72" />
    </div>
  );
}
