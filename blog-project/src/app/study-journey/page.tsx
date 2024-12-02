"use client";
import { getListLesson, getUnitList } from "@/apis";
import { LessonCard } from "@/components/lesson-card";
import { Lesson, Unit } from "@/types";
import { useRequest, useUpdateEffect } from "ahooks";
import { Button, Card, Drawer } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";

const StudyJourney = () => {
  const [selectedUnit, setSelectedUnit] = useState<Unit>();
  const { data: units } = useRequest(getUnitList);
  const { data: lessons, run: runGetLessonList } = useRequest(getListLesson, {
    manual: true,
  });

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
      <div>
        {units?.map((unit: Unit) => (
          <Card
            key={unit._id}
            className="lg:w-[300px] w-full shadow-md"
            cover={<img alt="example" src={`http://${unit.coverImage.url}`} />}
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
  );
};

export default StudyJourney;
