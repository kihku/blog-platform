import {
  Avatar,
  Drawer,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";
import { cloneElement, useEffect, useState } from "react";

export default function ProfileAvatar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [isSmallScreen, setSmallScreen] = useState(true);
  const renderAvatar = () => {
    return (
      <Avatar
        size="sm"
        src="https://docs.material-tailwind.com/img/face-2.jpg"
        alt="avatar"
        className="cursor-pointer"
      />
    );
  };
  return (
    <>
      {cloneElement(renderAvatar(), {
        size: "sm",
        onClick: () => setOpenMenu(true),
        className: "block lg:hidden"
      })}
      <div className="hidden lg:block z-50">
        <Popover placement="bottom-end">
          <PopoverHandler>
            {cloneElement(renderAvatar(), { size: "sm" })}
          </PopoverHandler>
          <PopoverContent className="w-72 px-5">
            <div className="flex">
              {cloneElement(renderAvatar(), { size: "lg", className: "mr-6" })}
              <div>
                <Typography color="black" type="h3">
                  Kihku
                </Typography>
                <Typography type="h4">Kihku@gmail.com</Typography>
              </div>
            </div>
            <hr className="my-3" />
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-1 font-bold"
            >
                
              Achievements
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-1 font-bold"
            >
              Settings
            </Typography>
            <hr className="my-3" />
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-1 font-bold"
            >
              Log out
            </Typography>
            <hr className="my-3" />
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-1 font-bold"
            >
              Privacy and policy
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-1 font-bold"
            >
              Frequently asked questions
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-1 font-bold"
            >
              Billing
            </Typography>
          </PopoverContent>
        </Popover>
      </div>
      <Drawer
        placement="bottom"
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        size={400}
        className="overflow-y-auto rounded-t-3xl"
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
