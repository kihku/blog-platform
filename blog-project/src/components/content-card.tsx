type props = {
  onClick?: () => void;
  active?: boolean;
};
export default function ContentCard({ onClick, active }: props) {
  return (
    <div
      onClick={onClick}
      className={`${
        active ? "bg-blue-100" : ""
      } flex content-center gap-2 cursor-pointer p-2 w-full`}
    >
      <i className="fa-solid fa-trash" />
      <div className="w-48 h-28 border-2 border-blue-950 rounded-md"></div>
    </div>
  );
}
