"use client";

import AppName from "@/components/AppName";
import Button from "@/components/Button";
import TextFieldWithLabel from "@/components/TextFieldWithLabel";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

export default function Form() {
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [showLoginButton, setShowLoginButton] = useState(false);

  const validInputMap = useRef({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
      callbackUrl: "/",
    });

    if (!response?.error) {
      toast.success("Successfully Logged In");
      router.push("/");
      router.refresh();
    } else {
      toast.error(
        "Unable to login. Please check your registered email and pasword"
      );
    }
  };

  function enableButton() {
    setShowLoginButton(
      validInputMap.current.email != "" && validInputMap.current.password != ""
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 m-5 md:m-0 w-full md:max-w-md md:w-[60%] h-[60%] justify-center shadow-2xl items-center border border-venmoBlue rounded-2xl px-10 py-10"
      >
        <AppName />
        <TextFieldWithLabel
          name="email"
          label={"Email Id"}
          placeholderText={"Enter your Email Address"}
          errorText={"Please Enter Valid Email Id"}
          pattern="^[A-Za-z0-9]+@[a-zA-Z0-9]+\.[a-z]{2,}$"
          ref={emailRef}
          onValidText={function (text: string): void {
            validInputMap.current.email = text;
            enableButton();
          }}
        />
        <TextFieldWithLabel
          label={"Password"}
          type="password"
          name="password"
          placeholderText={"Enter your Password"}
          errorText={"Please Enter Valid Password minimum 6 length"}
          pattern="^[A-Za-z0-9]{6,}$"
          ref={passwordRef}
          onValidText={function (text: string): void {
            validInputMap.current.password = text;
            enableButton();
          }}
        />
        <Button
          type={"submit"}
          label="LogIn"
          onClick={() => {}}
          enabled={showLoginButton}
        />

        <Link
          href="/signup"
          replace={true}
          className="text-venmoBlue font-bold"
        >
          Signup?
        </Link>
      </form>
    </>
  );
}
