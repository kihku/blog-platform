"use client";

import { completeLesson, getLesson } from "@/apis";
import Transition from "@/components/transition";
import { Slide } from "@/types";
import { useRequest } from "ahooks";
import { Button } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import "./index.scss";

export default function Lesson() {
  const { slug } = useParams();
  const [fadeClass, setFadeClass] = useState("");

  const [curSlide, setCurSlide] = useState(0);
  useEffect(() => {
    setFadeClass("fade-in");
  }, [curSlide]);
  const { data: lesson } = useRequest(getLesson, {
    ready: !!slug,
    defaultParams: [{ id: slug as string }],
  });
  const { run: runCompleteLesson } = useRequest(completeLesson, {
    manual: true,
    onSuccess: () => {
      window.open(`/study-journey`, "_self");
    },
  });
  const [isCheckMultiple, SetIsCheckMultiple] = useState(false);
  const processNextSlide = () => {
    if (!needAnswer) {
      setFadeClass("");
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
      <div
        className={`${fadeClass} relative shadow-md rounded-md lg:p-28 p-5 lg:w-[80%] h-[80vh] w-full flex flex-col justify-center items-center text-center gap-5`}
      >
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
            <div className={`${fadeClass} h-[400px]`}>
              <img
                alt="slide-image"
                loading="lazy"
                src="/img/lesson/finish.png"
              />
            </div>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                runCompleteLesson();
              }}
            >
              Back to Journey
            </Button>
          </>
        )}
        <p className="font-bold text-4xl">{slide?.title}</p>
        {slide?.type === "SLIDE_TEXT" && (
          <>
            <div className="h-72 w-72 rounded-md m-auto">
              <img
                alt="slide image"
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
          <div className="flex gap-5 items-center mt-5">
            <Button>True</Button>
            <Button>False</Button>
          </div>
        )}
      </div>
    );
  };
  return (
    <Transition>
      <div className="p-5 lg:px-72 py-10 h-full">
        <div className="flex justify-center h-full">
          {processSlideContent(lesson?.data[curSlide] as Slide)}
        </div>
      </div>
    </Transition>
  );
}
