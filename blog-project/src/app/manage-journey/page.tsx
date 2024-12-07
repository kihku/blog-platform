"use client";
import { Button, Card, Form, Input, message, Modal, Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";
import { useRequest, useUpdateEffect } from "ahooks";
import { createUnit, getLesson, getListLesson, getUnitList } from "@/apis";
import { Unit } from "@/types";

const { TextArea } = Input;

export default function ManageJourney() {
  const [form] = Form.useForm();
  const [openCreate, setOpenCreate] = useState(false);
  const [openLessonInfo, setLessonInfo] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const uploadProps = {
    name: "file",
    multiple: false,
    action: `${process.env.SERVER_HOST}/upload`,
  };
  const { run: runCreateUnit } = useRequest(createUnit, {
    manual: true,
    onSuccess: () => {
      message.success("Create unit successfully");
    },
  });
  const { run: runGetLessons } = useRequest(getListLesson, {
    manual: true,
  });
  useRequest(getLesson, { defaultParams: [{ id: "123" }] });
  const { data: units } = useRequest(getUnitList);
  const onFinish = (value: Unit) => {
    runCreateUnit(value);
  };
  useUpdateEffect(() => {
    runGetLessons({ journeyUnitId: selectedUnit!._id });
  }, [selectedUnit]);
  return (
    <div className="px-5 py-10 lg:px-72">
      <Modal
        title="New Unit"
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCancel={() => setOpenCreate(false)}
        footer={[
          <Button
            form="createForm"
            key="submit"
            htmlType="submit"
            type="primary"
          >
            Create
          </Button>,
        ]}
      >
        <Form
          id="createForm"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item required label="Cover Image" name="coverImage">
            <Dragger
              {...uploadProps}
              onChange={({ file }) => {
                const { status } = file;
                if (status === "done") {
                  form.setFieldValue("coverImage", file.response.data);
                  message.success(`${file.name} file uploaded successfully.`);
                } else if (status === "error") {
                  message.error(`${file.name} file upload failed.`);
                }
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </Form.Item>
          <Form.Item required label="Unit Name" name="name">
            <Input placeholder="Unit 1 - Meeting new friends" />
          </Form.Item>
          <Form.Item required label="Language" name="language">
            <Select
              placeholder="Select unit's language"
              options={[{ label: "Japanese", value: "JP" }]}
            />
          </Form.Item>
          <Form.Item required label="Level" name="level">
            <Select
              placeholder="Select unit's level"
              options={[
                { label: "Basic", value: "BASIC" },
                { label: "Novice", value: "NOVICE" },
                { label: "Intermediate", value: "INTERMEDIATE" },
                { label: "Upper Intermediate", value: "UPPER_INTERMEDIATE" },
                { label: "Advanced", value: "ADVANCED" },
              ]}
            />
          </Form.Item>
          <Form.Item required label="Description" name="description">
            <TextArea
              autoSize={{ minRows: 3 }}
              placeholder="In this unit, learners will explore vocabulary, grammar structure..."
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Lesson Info"
        open={openLessonInfo}
        onClose={() => setLessonInfo(false)}
        onCancel={() => setLessonInfo(false)}
        footer={[]}
      >
        <Button
          href={`/manage-journey/create-lesson/${selectedUnit?._id}`}
          icon={<i className="fa-solid fa-plus"></i>}
        >
          Add Lesson
        </Button>
        <div className="mt-5">
          <Card>
            <p>Lesson 1</p>
            <p>Grammar</p>
            <p>Present Tense</p>
            <p>Description ... </p>
          </Card>
        </div>
      </Modal>
      <div className="lg:flex justify-between">
        <p className="text-3xl font-bold mb-5 lg:mb-0">Units</p>
        <div className="flex gap-x-5">
          <Select
            defaultValue={{
              label: (
                <div className="flex">
                  <img
                    className="h-10 mr-3"
                    src="/img/flags/japan.png"
                    alt="japan-flag"
                  />
                  <p>Japanese</p>
                </div>
              ),
              value: "JP",
            }}
            className="w-48"
            placeholder="Language"
            size="large"
            options={[{ label: "Japanese", value: "JP" }]}
          />
          <Button
            onClick={() => setOpenCreate(true)}
            size="large"
            icon={<i className="fa-solid fa-plus" />}
          >
            New Unit
          </Button>
        </div>
      </div>
      <div className="mt-7 gap-5 flex flex-wrap">
        {units?.map((unit: Unit) => (
          <Card
            key={unit._id}
            className="lg:w-[300px] w-full"
            cover={<img alt="example" src={`http://${unit.coverImage.url}`} />}
            actions={[
              <Button
                type="text"
                key="add"
                onClick={() => {
                  setSelectedUnit(unit);
                  setLessonInfo(true);
                }}
              >
                Lesson Info
              </Button>,
              // <EditOutlined key="edit" />,
            ]}
          >
            <Meta title={unit.name} description={unit.description} />
          </Card>
        ))}
      </div>
    </div>
  );
}
