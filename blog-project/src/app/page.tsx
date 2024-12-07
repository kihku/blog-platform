"use client";
import { useCookies } from "next-client-cookies";
import { useEffect } from "react";
import { useSessionStorageState } from "ahooks";
import { Button } from "antd";
import Transition from "@/components/transition";

export default function Home() {
  const [, setAuthToken] = useSessionStorageState<string | undefined>(
    "authToken"
  );
  const [, setUserId] = useSessionStorageState<string | undefined>("userId");
  const cookies = useCookies();
  useEffect(() => {
    setAuthToken(cookies.get("auth_token"));
    setUserId(cookies.get("user_id"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies, setAuthToken]);
  return (
    <Transition>
      <div className="lg:px-72 lg:py-32 py-10 px-5">
        <div className="flex lg:flex-row gap-20 flex-col">
          <img
            className="lg:h-[500px] lg:w-[500px]"
            src="/img/homepage/img1.jpg"
            alt="Homepage Image 1"
          />
          <div className="text-center justify-center flex gap-5 flex-col">
            <p className="font-bold text-4xl lg:text-5xl ">Language Buddy</p>
            <p className="font-bold text-xl lg:text-2xl">
              Learn new language efficiently with tailored courses for all level
            </p>
            <div>
              <Button
                className="w-72 shadow-md h-12"
                type="primary"
                size="large"
                href={`/study-journey`}
              >
                <p className="font-bold">Get started</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-gray-200 p-5 w-full font-bold align-middle">
        <div className="flex justify-center text-center">
          <img
            className="h-10 mr-3"
            src="/img/flags/japan.png"
            alt="japan-flag"
          />
          <p className="mt-2">JAPANESE</p>
        </div>
      </div>
    </Transition>
  );
}
