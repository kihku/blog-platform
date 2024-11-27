"use client";
import { Button, Card, Form, Input, Modal, Select } from "antd";
import { EditOutlined, InboxOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";

const { TextArea } = Input;

export default function ManageJourney() {
  const [form] = Form.useForm();
  const [openCreate, setOpenCreate] = useState(false);
  const [openLessonInfo, setLessonInfo] = useState(false);
  return (
    <div className="px-5 py-10 lg:px-72">
      <Modal
        title="New Unit"
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCancel={() => setOpenCreate(false)}
        footer={[
          <Button type="primary" key="create">
            Create
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          //   onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item required label="Cover Image">
            <Dragger>
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
          <Form.Item required label="Unit Name">
            <Input placeholder="Unit 1 - Meeting new friends" />
          </Form.Item>
          <Form.Item required label="Level">
            <Select placeholder="Select unit's level" />
          </Form.Item>
          <Form.Item required label="Description">
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
          href="/manage-journey/create-lesson"
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
            icon={<i className="fa-solid fa-plus"></i>}
          >
            New Unit
          </Button>
        </div>
      </div>
      <div className="mt-7">
        <Card
          className="lg:w-[300px] w-full"
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <Button
              type="text"
              key="add"
              onClick={() => {
                setLessonInfo(true);
              }}
            >
              Lesson Info
            </Button>,
            <EditOutlined key="edit" />,
          ]}
        >
          <Meta title="Card title" description="This is the description" />
        </Card>
      </div>
    </div>
  );
}
