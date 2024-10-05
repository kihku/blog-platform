"use client";

import Link from "next/link";

import "./index.scss";
import ProfileAvatar from "./profile_avatar";
import { Drawer, IconButton, Typography } from "@material-tailwind/react";
import { useState } from "react";
export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <div className="header h-14 py-2 px-12 lg:px-32">
        <div className=" hidden lg:block">
          <Link href="/" className="logo">
            Logo
          </Link>
          <Link href="/study-journey">Journey</Link>
          <Link href="/flashcards">Flashcard</Link>
          <Link href="/about">About</Link>
        </div>
        <IconButton
          size="lg"
          variant="text"
          color="white"
          className="lg:hidden"
          onClick={() => setOpenMenu(true)}
        >
          <i className="fa-solid fa-bars"></i>
        </IconButton>
        <div className="header-right">
          <ProfileAvatar />
        </div>
      </div>
      <Drawer
        placement="left"
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        className="overflow-y-auto"
        size={250}
      >
        <div className="py-5 px-5 lg:py-10 lg:px-32">
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Unit 1
            </Typography>
          </div>
        </div>
      </Drawer>
    </>
  );
}
