"use client";
import { getListLesson, getUnitList } from "@/apis";
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
  const { data: lessons, run: runGetLessonList } = useRequest(getListLesson, {
    manual: true,
  });
  const [userId] = useSessionStorageState<string | undefined>("userId");
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
  useEffect(() => {
    async () => {};
  });
  return (
    <Transition>
      <div className="p-5 lg:px-72 py-10">
        <Drawer
          title={selectedUnit?.name}
          placement="bottom"
          onClose={() => setOpen(false)}
          open={open}
        >
          {lessons?.map((lesson: Lesson) => (
            <LessonCard
              key={lesson._id}
              lesson={lesson}
              onClick={() =>
                window.open(`/study-journey/lesson/${lesson._id}`, "_self")
              }
            />
          ))}
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
                  src={`http://${unit.coverImage.url}`}
                />
              }
              actions={[
                <Button
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
