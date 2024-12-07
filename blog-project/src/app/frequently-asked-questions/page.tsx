"use client";
import Transition from "@/components/transition";
import { Collapse, CollapseProps } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

export default function FrequentlyAskedQuestion() {
  const getItems: () => CollapseProps["items"] = () => [
    {
      key: "1",
      label: "How does the Language Buddy matching process work?",
      children: (
        <p>
          The application matches users based on their language learning goals,
          proficiency levels, and preferences (e.g., time zone, availability, or
          common interests). You can refine your profile to improve match
          accuracy.
        </p>
      ),
    },
    {
      key: "2",
      label: "What tools are available to assist with language practice?",
      children: (
        <p>
          The platform offers features like vocabulary games, and AI-powered
          language correction to help make learning interactive and effective.
        </p>
      ),
    },
    {
      key: "3",
      label: "How do I ensure my language buddy sessions are productive?",
      children: (
        <p>
          Set clear goals for each session, such as practicing specific grammar
          points, learning new vocabulary, or engaging in free conversation. Use
          built-in guides and suggested activities provided by the app to stay
          focused.
        </p>
      ),
    },
  ];
  return (
    <Transition>
      <section className="flex justify-center h-screen gap-4 px-8 lg:px-72 py-10 dark:bg-stone-900">
        <div className="mt-24 w-full lg:w-[800px] shadow-md p-10 h-fit rounded-md text-center">
          <p className="mb-4 font-bold text-4xl dark:text-white">
            Frequently Asked Questions
          </p>
          <Collapse
            bordered={false}
            defaultActiveKey={["1", "2", "3"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            // style={{ background: token.colorBgContainer }}
            items={getItems()}
          />
        </div>
      </section>
    </Transition>
  );
}
