"use client";

import { getLesson } from "@/apis";
import { Slide } from "@/types";
import { useRequest } from "ahooks";
import { Button } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Lesson() {
  const { slug } = useParams();
  const [curSlide, setCurSlide] = useState(0);
  const { data: lesson } = useRequest(getLesson, {
    ready: !!slug,
    defaultParams: [{ id: slug as string }],
  });
  const [isCheckMultiple, SetIsCheckMultiple] = useState(false);
  const processNextSlide = () => {
    if (!needAnswer) {
      setCurSlide(curSlide + 1);
    }
    SetIsCheckMultiple(false);
  };
  const QUESTION_TYPE = ["MULTIPLE_CHOICE"];
  const [needAnswer, setNeedAnswer] = useState(false);
  useEffect(() => {
    setNeedAnswer(
      QUESTION_TYPE.includes(lesson?.data[curSlide]?.type as string)
    );
  }, [curSlide]);
  const processSlideContent = (slide: Slide) => {
    const multipleChoiceProps = {
      className: `text-base font-bold ${
        !isCheckMultiple &&
        "bg-gray-200 hover:animate-bounce hover:cursor-pointer"
      } py-2 w-[300px] rounded-md`,
      onClick: () => {
        SetIsCheckMultiple(true);
        setNeedAnswer(false);
      },
    };
    const isFinish = curSlide === lesson?.data.length;
    return (
      <div className="relative shadow-md rounded-md lg:p-28 p-5 lg:w-[80%] h-[80vh] w-full flex flex-col justify-center items-center text-center gap-5">
        {!isFinish ? (
          <div
            className={`rounded-md w-10 h-40 ${
              needAnswer
                ? "bg-gray-200 hover:cursor-not-allowed"
                : "bg-lime-300 hover:cursor-pointer"
            }  absolute -right-5 justify-center flex items-center `}
            onClick={processNextSlide}
          >
            <i className="fa-solid fa-caret-right fa-2xl" />
          </div>
        ) : (
          <>
            <div className="h-[400px]">
              <img loading="lazy" src="/img/lesson/finish.png" />
            </div>
            <Button type="primary" href="/study-journey" size="large">
              Back to Journey
            </Button>
          </>
        )}
        <p className="font-bold text-4xl">{slide?.title}</p>
        {slide?.type === "SLIDE_TEXT" && (
          <>
            <div className="h-72 w-72 rounded-md m-auto">
              <img
                loading="lazy"
                className="h-full m-auto"
                src={`http://${slide?.file?.url}`}
              />
            </div>
            <p className="font-bold text-2xl">{slide?.content}</p>
          </>
        )}
        {slide?.type === "MULTIPLE_CHOICE" && (
          <div className="flex flex-col gap-5 items-center mt-5">
            <div
              {...multipleChoiceProps}
              className={`${multipleChoiceProps.className} ${
                isCheckMultiple && slide.answerA.value && "bg-green-400"
              }`}
            >
              {slide.answerA.text}
            </div>
            <div
              {...multipleChoiceProps}
              className={`${multipleChoiceProps.className} ${
                isCheckMultiple && slide.answerB.value && "bg-green-400"
              }`}
            >
              {slide.answerB.text}
            </div>
            <div
              {...multipleChoiceProps}
              className={`${multipleChoiceProps.className} ${
                isCheckMultiple && slide.answerC.value && "bg-green-400"
              }`}
            >
              {slide.answerC.text}
            </div>
            <div
              {...multipleChoiceProps}
              className={`${multipleChoiceProps.className} ${
                isCheckMultiple && slide.answerD.value && "bg-green-400"
              }`}
            >
              {slide.answerD.text}
            </div>
          </div>
        )}
        {slide?.type === "TRUE_FALSE_QUESTION" && (
          <div className="flex flex-col gap-5 items-center mt-5"></div>
        )}
      </div>
    );
  };
  return (
    <>
      <div className="p-5 lg:px-72 py-10 h-full">
        <div className="flex justify-center h-full">
          {processSlideContent(lesson?.data[curSlide] as Slide)}
        </div>
      </div>
    </>
  );
}
