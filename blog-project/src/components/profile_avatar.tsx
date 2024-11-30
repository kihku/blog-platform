import {
  Drawer,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";
import { useSessionStorageState } from "ahooks";
import { Avatar, Button } from "antd";
import { cloneElement, useState } from "react";

export default function ProfileAvatar() {
  const [openMenu, setOpenMenu] = useState(false);
  const renderAvatar = () => {
    return (
      <Avatar
        size={64}
        src="/img/profile/avatar.jpg"
        alt="avatar"
        className="cursor-pointer"
      />
    );
  };
  const [userId] = useSessionStorageState<string | undefined>("userId");
  return (
    <div>
      <div>
        <Popover placement="bottom-end">
          <PopoverHandler>
            {cloneElement(renderAvatar(), { size: "large" })}
          </PopoverHandler>
          <PopoverContent className="w-72 px-5">
            <div className="flex">
              {cloneElement(renderAvatar(), { className: "mr-6" })}
              <div>
                <p className="text-black font-semibold text-xl">Kihku</p>
                <p className="font-base">Kihku@gmail.com</p>
              </div>
            </div>
            <hr className="my-2" />
            <div>
              <Button
                href={`/profile/${userId}`}
                type="text"
                className="mb-1 font-bold"
              >
                Your profile
              </Button>
              <hr className="my-2" />
              <Button type="text" className="mb-1 font-bold">
                Logout
              </Button>
              <hr className="my-2" />
              <Button type="text" className="mb-1 font-bold">
                Privacy and policy
              </Button>
              <Button type="text" className="mb-1 font-bold">
                Frequently asked questions
              </Button>
              <Button type="text" className="mb-1 font-bold">
                Billing
              </Button>
            </div>
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
    </div>
  );
}
