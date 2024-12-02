"use client";
import ContentCard from "@/components/content-card";
import {
  Button,
  Checkbox,
  Empty,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Select,
  Upload,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { SLIDE_TYPE } from "@/constants";
import LargeLabel from "@/components/large-label";

import "./index.scss";
import { useRequest } from "ahooks";
import { createLesson } from "@/apis/lesson";
import { useParams } from "next/navigation";

export default function CreateLesson() {
  const [form] = Form.useForm();
  const [basicInfoForm] = Form.useForm();
  const [slides, setSlide] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideType, setSlideType] = useState();
  const [openSlide, setOpenSide] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const uploadProps = {
    name: "file",
    multiple: false,
    action: `${process.env.SERVER_HOST}/upload`,
  };

  const { run: runCreateLesson } = useRequest(createLesson, { manual: true });
  const { slug } = useParams();
  console.log(slides);
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
            <Form.Item name="type">
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
                <Form.Item name="file">
                  <Dragger
                    {...uploadProps}
                    onChange={({ file }) => {
                      const { status } = file;
                      if (status === "done") {
                        form.setFieldValue("file", file.response.data);
                        message.success(
                          `${file.name} file uploaded successfully.`
                        );
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
            <Form.Item name="answerA" className="hidden" />
            {slideType == SLIDE_TYPE.MULTIPLE_CHOICE && (
              <>
                <Form.Item name="title">
                  <Input size="large" placeholder="Enter some text" />
                </Form.Item>
                <Form.Item name={["answerA", "text"]}>
                  <Input size="large" placeholder="Enter Answer 1" />
                </Form.Item>
                <Form.Item valuePropName="checked" name={["answerA", "value"]}>
                  <Checkbox value={false} defaultChecked={false} />
                </Form.Item>
                <Form.Item name={["answerB", "text"]}>
                  <Input size="large" placeholder="Enter Answer 2" />
                </Form.Item>
                <Form.Item valuePropName="checked" name={["answerB", "value"]}>
                  <Checkbox value={false} defaultChecked={false} />
                </Form.Item>
                <Form.Item name={["answerC", "text"]}>
                  <Input size="large" placeholder="Enter Answer 3" />
                </Form.Item>
                <Form.Item valuePropName="checked" name={["answerC", "value"]}>
                  <Checkbox value={false} defaultChecked={false} />
                </Form.Item>
                <Form.Item name={["answerD", "text"]}>
                  <Input size="large" placeholder="Enter Answer 4" />
                </Form.Item>
                <Form.Item valuePropName="checked" name={["answerD", "value"]}>
                  <Checkbox value={false} defaultChecked={false} />
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
        <Form form={basicInfoForm} layout="vertical">
          <div className="flex flex-col lg:flex-row gap-10">
            <div>
              <Form.Item
                name="name"
                label={LargeLabel({
                  title: "Title",
                  subtitle: "Enter a Title for your Lesson",
                })}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="language"
                label={LargeLabel({
                  title: "Language",
                  subtitle: "Choose a language for your lesson.",
                })}
              >
                <Select
                  size="large"
                  options={[{ value: "JP", label: "Japanese" }]}
                />
              </Form.Item>
              <Form.Item
                name="type"
                label={LargeLabel({
                  title: "Type",
                  subtitle: "Provide a type for your lesson.",
                })}
              >
                <Select
                  options={[
                    { value: "GRAMMAR", label: "Grammar" },
                    { value: "VOCAB", label: "Vocabulary" },
                  ]}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="description"
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
                name="coverImage"
                label={LargeLabel({
                  title: "Cover Image",
                  subtitle: "Upload a cover image for your lesson",
                })}
                className="customSizedUpload"
              >
                <Upload
                  {...uploadProps}
                  onChange={({ file }) => {
                    const { status } = file;
                    if (status === "done") {
                      basicInfoForm.setFieldValue(
                        "coverImage",
                        file.response.data
                      );
                      message.success(
                        `${file.name} file uploaded successfully.`
                      );
                    } else if (status === "error") {
                      message.error(`${file.name} file upload failed.`);
                    }
                  }}
                  listType="picture-card"
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
        <Button
          size="large"
          type="primary"
          onClick={() => {
            runCreateLesson({
              journeyUnitId: slug,
              ...basicInfoForm.getFieldsValue(),
              data: slides,
            });
          }}
        >
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
        <div className="w-full">
          {slides.length > 0 ? (
            <div className="ml-10 mt-28 w-[80%] text-center gap-5 flex flex-col">
              <p className="font-bold text-2xl lg:text-5xl">
                {slides[currentSlideIndex]?.title}
              </p>
              <img
                alt="Slide content"
                src={`http://${slides[currentSlideIndex]?.file?.url}`}
                className="ml-auto mr-auto h-[55%] w-fit rounded-md border-2"
              />
              <p className="font-bold text-2xl lg:text-5xl">
                {slides[currentSlideIndex]?.content}
              </p>
            </div>
          ) : (
            <Empty className="mt-48" />
          )}
        </div>
      </div>
    </div>
  );
}
