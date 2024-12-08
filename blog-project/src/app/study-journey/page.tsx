"use client";
import { getListLesson, getUnitList, getUserInfo } from "@/apis";
import { LessonCard } from "@/components/lesson-card";
import Transition from "@/components/transition";
import { Lesson, Unit } from "@/types";
import { useRequest, useSessionStorageState, useUpdateEffect } from "ahooks";
import { Button, Card, Drawer } from "antd";
import Meta from "antd/es/card/Meta";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const StudyJourney = () => {
  const [selectedUnit, setSelectedUnit] = useState<Unit>();
  const { data: units } = useRequest(getUnitList);
  const {
    data: lessons,
    run: runGetLessonList,
    loading: loadingLesson,
  } = useRequest(getListLesson, {
    manual: true,
  });

  const [userId] = useSessionStorageState<string | undefined>("userId");
  const { data: userData } = useRequest(getUserInfo, {
    defaultParams: [{ id: userId! }],
    ready: !!userId,
  });
  useEffect(() => {
    if (!userId) {
      redirect("/login");
    }
  }, [userId]);
  const [open, setOpen] = useState(false);
  useUpdateEffect(() => {
    if (selectedUnit) {
      runGetLessonList({ journeyUnitId: selectedUnit!._id });
    }
  }, [selectedUnit]);
  const [windowWidth, setWindowWidth] = useState<number>();
  useEffect(() => {
    setWindowWidth(window?.innerWidth);
  }, []);

  return (
    <Transition>
      <div className="p-5 lg:px-72 py-10">
        <Drawer
          height={windowWidth && windowWidth < 960 ? 720 : 378}
          loading={loadingLesson}
          title={selectedUnit?.name}
          placement="bottom"
          onClose={() => setOpen(false)}
          open={open}
        >
          <div className="flex gap-5 lg:flex-row flex-col">
            {lessons?.map((lesson: Lesson) => (
              <LessonCard
                disabled={lesson.order > userData?.progress?.lesson?.order + 1}
                key={lesson._id}
                lesson={lesson}
                onClick={() =>
                  window.open(`/study-journey/lesson/${lesson._id}`, "_self")
                }
              />
            ))}
          </div>
        </Drawer>
        <div className="flex flex-wrap gap-5">
          {units?.map((unit: Unit) => (
            <Card
              key={unit._id}
              className="lg:w-[300px] w-full shadow-md"
              cover={
                <img
                  alt="example"
                  loading="lazy"
                  src={`${unit.coverImage.url}`}
                />
              }
              actions={[
                <Button
                  // disabled={(unit.order > userData?.progress?.unit?.order + 1 ) && ()}
                  type="text"
                  key="add"
                  onClick={() => {
                    setSelectedUnit(unit);
                    setOpen(true);
                  }}
                >
                  Study
                </Button>,
              ]}
            >
              <Meta title={unit.name} description={unit.description} />
            </Card>
          ))}
        </div>
      </div>
    </Transition>
  );
};

export default StudyJourney;
