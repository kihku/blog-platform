import {
  Avatar,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";

export default function ProfileAvatar() {
  return (
    <Popover placement="bottom-end">
      <PopoverHandler>
        <Avatar
          size="sm"
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="avatar"
        />
      </PopoverHandler>
      <PopoverContent className="w-72 px-5">
        <div className="flex">
          <Avatar
            className="mr-6"
            size="lg"
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
          />
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
          Logout
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
  );
}
