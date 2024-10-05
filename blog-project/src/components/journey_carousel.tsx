"use client";

import "./index.scss";
import {
  Button,
  Carousel,
  IconButton,
  Typography,
} from "@material-tailwind/react";
export default function JourneyCarousel() {
  return (
    <>
      <Carousel
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-slate-800" : "w-4 bg-slate-400/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="black"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4"
          >
            <i className="fa-solid fa-chevron-left fa-2xl" />
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="black"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !right-4 -translate-y-2/4"
          >
            <i className="fa-solid fa-chevron-right fa-2xl" />
          </IconButton>
        )}
      >
        <div className="relative h-screen w-screen flex justify-center items-center ">
          <img
            src="/img/winter.png"
            alt="image 1"
            className="h-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center">
            <div className="w-3/4 h text-center md:w-2/4">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                Unit 1
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80"
              >
                It is not so much for its beauty that the forest makes a claim
                upon men&apos;s hearts, as for that subtle something, that
                quality of air that emanation from old trees, that so
                wonderfully changes and renews a weary spirit.
              </Typography>
              <div className="flex justify-center gap-2">
                <Button size="lg" color="white">
                  Explore
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </>
  );
}
