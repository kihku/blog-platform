"use client";
import { getUserInfo } from "@/apis";
import { PersonalInfo } from "@/components/personal-info";
import Transition from "@/components/transition";
import { useRequest } from "ahooks";
import { Avatar, Tabs } from "antd";
import { useParams } from "next/navigation";

export default function Profile() {
  const { slug } = useParams();
  const { data: userData, loading: loadingUserData } = useRequest(getUserInfo, {
    defaultParams: [{ id: slug }],
  });
  const TAB_ITEMS = [
    {
      key: "PERSONAL_INFO",
      label: "Personal Information",
      children: (
        <div className="h-[500px] bg-white dark:bg-stone-900">
          <PersonalInfo loading={loadingUserData} userData={userData} />
        </div>
      ),
    },
    {
      key: "SETTING",
      label: "Settings",
      disabled: true,
    },
  ];

  return (
    <Transition>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full scale-100 bg-[url('/img/profile/background.jpg')] bg-cover bg-center" />
        {/* <div className="absolute top-0 h-full w-full bg-black/40 bg-cover bg-center dark:bg-slate-900/40" /> */}
      </section>
      <section className="relative flex bg-white py-16 dark:bg-stone-900">
        <div className="relative -mt-40 mb-6 flex w-full min-w-0 flex-col break-words bg-white px-4 dark:bg-stone-900">
          <div className="container mx-auto">
            <div className="-mt-20 flex flex-col justify-between gap-10 lg:flex-row ">
              <div className="rounded-xl relative flex w-full basis-1/3 flex-col items-center gap-6 border border-gray-200 bg-white p-5 dark:border-stone-700 dark:bg-stone-900">
                <div className="h-40 w-40">
                  <Avatar
                    src="/img/profile/avatar.jpg"
                    size={150}
                    alt="Profile picture"
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-col text-center">
                  <p className="text-xl font-bold  dark:text-white">
                    {userData?.firstName} {userData?.lastName}
                  </p>
                  <p className="text-sm text-gray-400">{userData?.email}</p>
                  <hr className="my-3 w-full dark:border-stone-700" />
                  <div className="flex gap-5">
                    <p className="dark:text-white font-bold">Followers: 0</p>
                    <p className="dark:text-white font-bold">Friends: 0</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl px-5 relative mb-10 flex grow items-center justify-between border border-gray-200 bg-white dark:border-stone-700 dark:bg-stone-900 lg:mb-0 lg:flex-col lg:px-4">
                <div className="flex w-full">
                  <div className=" w-full">
                    <Tabs defaultActiveKey="1" items={TAB_ITEMS}></Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Transition>
  );
}
