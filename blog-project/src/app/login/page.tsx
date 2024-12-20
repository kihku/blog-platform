"use client";
import Transition from "@/components/transition";
import { Button, Checkbox, Form, Input } from "antd";

export default function Login() {
  return (
    <Transition>
      <section className="flex justify-center h-screen gap-4 px-8 lg:px-72 py-10 dark:bg-stone-900">
        <div className="mt-24 w-full lg:w-[500px] shadow-md p-10 h-fit rounded-md">
          <div className="text-center">
            <p className="mb-4 font-bold text-4xl dark:text-white">Sign In</p>
            <p className="text-base font-semibold dark:text-slate-400 mb-5">
              Enter your email and password to Sign In.
            </p>
          </div>
          <Form className="mx-auto mb-2 mt-8 w-full max-w-screen-lg">
            <div className="mb-1 flex flex-col gap-6 w-full">
              <p className="-mb-3 font-medium dark:text-white">Your email</p>
              <Input disabled size="large" placeholder="name@mail.com" />
              <p className="-mb-3 font-medium dark:text-white ">Password</p>
              <Input
                className="w-full"
                type="password"
                disabled
                size="large"
                placeholder="********"
              />
            </div>
            <div className="flex flex-col gap-5 mt-3">
              <Checkbox>
                <p
                  color="gray"
                  className="flex items-center justify-start font-medium dark:text-slate-400"
                >
                  I agree the&nbsp;
                  <a
                    href="#"
                    className="font-normal text-black underline transition-colors hover:text-gray-900 dark:text-white"
                  >
                    Terms and Conditions
                  </a>
                </p>
              </Checkbox>
              <Button disabled>Sign In</Button>
            </div>

            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="font-medium text-gray-900">
                <a href="#">Forgot Password</a>
              </p>
            </div>
            <div className="mt-8 space-y-4">
              <Button
                href={`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/auth/google`}
                size="large"
                className="flex items-center justify-center gap-2 shadow-md"
              >
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1156_824)">
                    <path
                      d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z"
                      fill="#34A853"
                    />
                    <path
                      d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z"
                      fill="#FBBC04"
                    />
                    <path
                      d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z"
                      fill="#EA4335"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1156_824">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span>Sign in With Google</span>
              </Button>
            </div>
          </Form>
        </div>
      </section>
    </Transition>
  );
}
