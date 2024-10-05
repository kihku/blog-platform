"use client";

import Link from "next/link";

import "./index.scss";
export default function Header() {
  return (
    <>
      <div className="header">
        <Link href="/" className="logo">
          Logo
        </Link>
        <Link href="/study-journey">Journey</Link>
        <Link href="/about">About</Link>
        <div className="header-right">
          <Link href="setting">Settings</Link>
          <Link href="/profile">Profile</Link>
        </div>
      </div>
    </>
  );
}
