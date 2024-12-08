import { Lesson } from "@/types";
type props = {
  lesson: Lesson;
  onClick?: () => Window | null;
  disabled?: boolean;
};
export function LessonCard({ lesson, onClick, disabled }: props) {
  return (
    <div
      onClick={onClick}
      className={`${
        onClick && `hover:${disabled ? "cursor-not-allowed" : "cursor-pointer"}`
      } ${
        disabled && "bg-blue-gray-50"
      } lg:w-[400px] w-full border-[1px] p-5 rounded-md border-gray-200`}
    >
      <p className="text-lg font-bold">{lesson.name}</p>
      <p className="text-xs text-gray-400">{lesson.type}</p>
      <p>{lesson.description}</p>
    </div>
  );
}
