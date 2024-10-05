"use client";
import { useState } from "react";

export default function Flashcard() {
  const [isFrontFace, setIsFrontFace] = useState(true);
  return (
    <div className="flex min-h-full items-center justify-center">
      <div
        className="group h-96 w-full m-10 lg:w-80 [perspective:1000px] hover:cursor-pointer "
        onClick={() => setIsFrontFace(!isFrontFace)}
      >
        <div
          className={`relative h-full w-full rounded-xl shadow-xl transition-all duration-300 [transform-style:preserve-3d] ${
            !isFrontFace
              ? " [transform:rotateY(180deg)]"
              : "[transform:rotateY(0deg)]"
          } `}
        >
          <div
            className={`${
              isFrontFace ? "absolute" : "hidden"
            } inset-0 text-center`}
          >
            <div className="flex min-h-full flex-col items-center justify-center">
              <h1 className="text-3xl font-bold">Study</h1>
            </div>
          </div>
          <div
            className={`${
              isFrontFace ? "hidden" : "absolute"
            } inset-0 h-full w-full rounded-xl px-12 text-center text-slate-800 [transform:rotateY(180deg)] [backface-visibility:hidden]`}
          >
            <div className="flex min-h-full flex-col items-center justify-center">
              <h1 className="text-3xl font-bold">勉強</h1>
              <p className="text-lg">べんきょう</p>
              <p className="text-base">Back face</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
