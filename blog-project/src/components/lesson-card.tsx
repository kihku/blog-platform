import { Lesson } from "@/types";
type props = {
  lesson: Lesson;
  onClick?: () => Window | null;
};
export function LessonCard({ lesson, onClick }: props) {
  return (
    <div
      onClick={onClick}
      className={`${
        onClick && "hover:cursor-pointer"
      } max-w-[400px] border-[1px] p-5 rounded-md border-gray-200`}
    >
      <p className="text-lg font-bold">{lesson.name}</p>
      <p className="text-xs text-gray-400">{lesson.type}</p>
      <p>{lesson.description}</p>
    </div>
  );
}
