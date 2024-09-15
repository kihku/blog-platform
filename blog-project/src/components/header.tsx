"use client";

import Link from "next/link";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import "./index.scss";
import { openLink } from "@/utils";
export default function Header() {
  return (
    <>
      <div className="header">
        <Link href="/" className="logo">
          Logo
        </Link>
        <Link href="#contact">Contact</Link>
        <Link href="/about">About</Link>
        <div className="header-right">
          <Link href="setting">
            <SettingsIcon />
          </Link>
          <Link href="/profile">
            <AccountCircleIcon />
          </Link>
        </div>
      </div>
    </>
  );
}
