import Link from "next/link";
import Button from '@mui/material/Button';
import "./index.scss";
import Icon from "./icon";
import { IconButton } from "@mui/material";
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
            <IconButton>
                <Icon iconName="AccessAlarm"></Icon>
            </IconButton>
        </div>
      </div>
    </>
  );
}
