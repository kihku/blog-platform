"use client";

import "./index.scss";
import { useEffect, useState } from "react";
import { Button, Divider, Drawer } from "antd";
import { useSessionStorageState } from "ahooks";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
const ProfileAvatar = dynamic(() => import("./profile_avatar"), { ssr: false });
export default function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const menuItems = [
    { label: "Home", icon: "fa-solid fa-house", href: "/" },
    {
      label: "Your Journey",
      icon: "fa-solid fa-book-bookmark",
      href: "/study-journey",
    },
    { label: "Community", icon: "fa-solid fa-user-group", href: "/community" },
  ];
  const extraItems = [
    { label: "About us", icon: "fa-solid fa-circle-info", href: "/about-us" },
  ];
  const renderButton = ({
    label,
    icon,
    href,
  }: {
    label: string;
    icon: string;
    href: string;
  }) => {
    return (
      <Button
        href={href}
        iconPosition="start"
        icon={<i className={`w-5 ${icon}`} />}
        key={label}
        type="text"
        size="large"
      >
        <p className="font-semibold ml-2">{label}</p>
      </Button>
    );
  };

  const [_authToken] = useSessionStorageState<string | undefined>("authToken");
  const [authToken, setAuthToken] = useState<string>();
  useEffect(() => {
    if (_authToken) {
      setAuthToken(_authToken);
    }
  }, [_authToken]);
  return (
    <div className={`${pathname == "/login" ? "hidden" : ""}`}>
      <Drawer
        width={300}
        placement="left"
        closable={false}
        onClose={() => setOpenMenu(false)}
        open={openMenu}
        autoFocus={false}
      >
        <div className="flex flex-col menu-container">
          {menuItems.map((item) => renderButton(item))}
          <Divider />
          {extraItems.map((item) => renderButton(item))}
        </div>
      </Drawer>
      <div className="header py-3 px-12 lg:px-32 flex justify-between">
        <div className="flex items-center">
          <Button
            icon={<i className="fa-solid fa-bars fa-2xl text-white" />}
            type="text"
            onClick={() => setOpenMenu(true)}
          />
        </div>
        {authToken ? (
          <ProfileAvatar />
        ) : (
          <Button href="/login" size="large" type="primary">
            Log in
          </Button>
        )}
      </div>
    </div>
  );
}
