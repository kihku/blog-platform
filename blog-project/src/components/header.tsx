"use client";

import "./index.scss";
import ProfileAvatar from "./profile_avatar";
import { useState } from "react";
import { Button, Divider, Drawer } from "antd";
export default function Header() {
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
  return (
    <>
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
      <div className="header h-16 py-2 px-12 lg:px-32 flex justify-between">
        <div className="flex items-center">
          <Button
            icon={<i className="fa-solid fa-bars fa-2xl text-white" />}
            type="text"
            onClick={() => setOpenMenu(true)}
          />
        </div>

        <div>
          <ProfileAvatar />
        </div>
      </div>
    </>
  );
}
