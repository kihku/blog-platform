"use client";
import ContentCard from "@/components/content-card";
import { Button, Form, Input, message, Modal, Select, Upload } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { SLIDE_TYPE } from "@/constants";
import LargeLabel from "@/components/large-label";

import "./index.scss";

export default function CreateLesson() {
  const [form] = Form.useForm();
  const [slides, setSlide] = useState([]);
  console.log(JSON.stringify(slides));
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideType, setSlideType] = useState();
  const [openSlide, setOpenSide] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const uploadProps = {
    name: "file",
    multiple: false,
    action: "http://localhost:2000/upload",
    onChange({ file }) {
      const { status } = file;
      if (status === "done") {
        form.setFieldValue("media", file.response.data);
        message.success(`${file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${file.name} file upload failed.`);
      }
    },
  };
  return (
    <div>
      <Modal
        title="New Slide"
        open={openSlide}
        onClose={() => setOpenSide(false)}
        onCancel={() => setOpenSide(false)}
        footer={[]}
      >
        <Form
          form={form}
          className="h-[400px]"
          onFinish={(value) => {
            setSlide([...slides, value]);
            form.resetFields();
          }}
        >
          <div className="overflow-y-auto h-[350px] mb-5">
            <Form.Item>
              <Select
                onChange={(value) => setSlideType(value)}
                placeholder="Choose slide type"
                size="large"
                defaultValue={{
                  value: SLIDE_TYPE.MULTIPLE_CHOICE,
                  label: "Multiple choice",
                }}
                options={[
                  {
                    value: SLIDE_TYPE.MULTIPLE_CHOICE,
                    label: "Multiple choice",
                  },
                  { value: SLIDE_TYPE.SLIDE_TEXT, label: "Slide text" },
                  {
                    value: SLIDE_TYPE.TRUE_FALSE_QUESTION,
                    label: "True-false question",
                  },
                ]}
              />
            </Form.Item>
            {slideType == SLIDE_TYPE.SLIDE_TEXT && (
              <>
                <Form.Item name="title">
                  <Input size="large" placeholder="Enter some text" />
                </Form.Item>
                <Form.Item name="media">
                  <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p>
                      Support for a single or bulk upload. Strictly prohibited
                      from uploading company data or other banned files.
                    </p>
                  </Dragger>
                </Form.Item>
                <Form.Item name="content">
                  <Input size="large" placeholder="Type some description" />
                </Form.Item>
              </>
            )}
            {slideType == SLIDE_TYPE.MULTIPLE_CHOICE && (
              <>
                <Form.Item name="title">
                  <Input size="large" placeholder="Enter some text" />
                </Form.Item>
                <Form.Item name="answerA">
                  <Input size="large" placeholder="Enter Answer 1" />
                </Form.Item>
                <Form.Item name="answerB">
                  <Input size="large" placeholder="Enter Answer 2" />
                </Form.Item>
                <Form.Item name="answerC">
                  <Input size="large" placeholder="Enter Answer 3" />
                </Form.Item>
                <Form.Item name="answerD">
                  <Input size="large" placeholder="Enter Answer 4" />
                </Form.Item>
              </>
            )}
            {slideType == SLIDE_TYPE.TRUE_FALSE_QUESTION && (
              <>
                <Form.Item name="title">
                  <Input size="large" placeholder="Enter some text" />
                </Form.Item>
              </>
            )}
          </div>
          <Form.Item key="create">
            <Button className="w-full" htmlType="submit" type="primary">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        width={900}
        title={
          <p className="font-bold">
            <i className="fa-solid fa-gear mr-2 fa-sm" /> Lesson Settings
          </p>
        }
        open={openSettings}
        onClose={() => setOpenSettings(false)}
        onCancel={() => setOpenSettings(false)}
        footer={[]}
      >
        <Form layout="vertical">
          <div className="flex flex-col lg:flex-row gap-10">
            <div>
              <Form.Item
                name="lessonTitle"
                label={LargeLabel({
                  title: "Title",
                  subtitle: "Enter a Title for your Lesson",
                })}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="lessonLanguage"
                label={LargeLabel({
                  title: "Language",
                  subtitle: "Choose a language for your lesson.",
                })}
              >
                <Select size="large" />
              </Form.Item>
              <Form.Item
                name="lessonDescription"
                label={LargeLabel({
                  title: "Description",
                  subtitle:
                    "Provide a short description for your lesson to increase visibility.",
                })}
              >
                <Input.TextArea size="large" />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label={LargeLabel({
                  title: "Cover Image",
                  subtitle: "Upload a cover image for your lesson",
                })}
                className="customSizedUpload"
              >
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  // fileList={fileList}
                  // onPreview={handlePreview}
                  // onChange={handleChange}
                >
                  <p className="font-bold bg-slate-500 text-white py-1 px-3 rounded-md">
                    Add Image
                  </p>
                </Upload>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
      <div className="w-full shadow-md justify-between flex p-5">
        <Button
          onClick={() => {
            setOpenSettings(true);
          }}
          icon={
            <p className="font-bold text-gray-400 mr-8">Enter slide title...</p>
          }
          size="large"
        >
          <p className="font-bold bg-gray-200 py-[0.5px] rounded-md px-3">
            Settings
          </p>
        </Button>
        <Button size="large" type="primary">
          Submit
        </Button>
      </div>
      <div className="pr-5 lg:pr-72 flex">
        <div className="flex flex-col w-60 border h-screen overflow-y-auto items-center gap-2">
          {slides.map((_, index) => (
            <ContentCard
              active={currentSlideIndex === index}
              onClick={() => {
                setCurrentSlideIndex(index);
              }}
              key={index}
            />
          ))}

          <Button
            onClick={() => setOpenSide(true)}
            size="large"
            type="primary"
            className="mt-5 w-full"
          >
            Add Slide
          </Button>
        </div>
        <div className="ml-10 mt-28 w-[80%] text-center gap-5 flex flex-col">
          <p className="font-bold text-2xl lg:text-5xl">
            {slides[currentSlideIndex]?.title}
          </p>
          <img
            alt="Slide content"
            src={`http://${slides[currentSlideIndex]?.media?.url}`}
            className="ml-auto mr-auto h-[55%] w-fit rounded-md border-2"
          />
          <p className="font-bold text-2xl lg:text-5xl">
            {slides[currentSlideIndex]?.content}
          </p>
        </div>
      </div>
    </div>
  );
}
