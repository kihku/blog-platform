"use client";
import { Button, DatePicker, Form, Input, Select, Spin } from "antd";
import React from "react";
// import { validateMessages } from "../utils";
import dayjs from "dayjs";
type props = {
  userData: {
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: Date;
  };
  loading?: boolean;
};
export function PersonalInfo({ userData, loading }: props) {
  const [form] = Form.useForm();

  return (
    <Spin spinning={loading}>
      {userData && (
        <Form
          className="dark:bg-stone-900"
          //   validateMessages={validateMessages}
          form={form}
          layout="vertical"
          name="basic"
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
            name="email"
          >
            <Input
              size="large"
              type="email"
              placeholder="name@mail.com"
              defaultValue={userData?.email}
            />
          </Form.Item>
          <div>
            <div className="flex items-center gap-4">
              <Form.Item
                className="w-full"
                label="First Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="firstName"
              >
                <Input
                  placeholder="Andy"
                  size="large"
                  defaultValue={userData?.firstName}
                />
              </Form.Item>
              <Form.Item
                className="w-full"
                label="Last Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="lastName"
              >
                <Input
                  size="large"
                  placeholder="Williams"
                  defaultValue={userData?.lastName}
                />
              </Form.Item>
            </div>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                size="large"
                allowClear
                placeholder="Please select"
                options={[
                  {
                    value: "MALE",
                    label: "Male",
                  },
                  {
                    value: "FEMALE",
                    label: "Female",
                  },
                ]}
                defaultValue={userData?.gender}
              />
            </Form.Item>
            <Form.Item
              label="Date of birth"
              name="dob"
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue={dayjs(userData?.birthDate)}
            >
              <DatePicker
                size="large"
                className="w-full"
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
          </div>
          {/* <div className="flex w-full items-center gap-4">
        <Form.Item
          label="Country"
          rules={[
            {
              required: true,
            },
          ]}
          name="country"
          className="w-full"
        >
          <Select
            placeholder="Latvia"
            options={[{ value: "FIN", label: "Finland" }]}
            defaultValue={userData?.country}
          />
        </Form.Item>
        <Form.Item
          className="w-full"
          label="City"
          rules={[
            {
              required: true,
            },
          ]}
          name="city"
        >
          <Select
            placeholder="Liepāja"
            options={[{ value: "LAH", label: "Lahti" }]}
            defaultValue={userData?.city}
          />
        </Form.Item>
      </div> */}
          {/* <div className="flex">
        <Button>Save</Button>
      </div> */}
        </Form>
      )}
    </Spin>
  );
}
