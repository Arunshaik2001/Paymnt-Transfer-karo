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
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const userNameRef = useRef<HTMLInputElement | null>(null);

  const [showSignUpButton, setShowSignUpButton] = useState(false);

  const [password, setPassword] = useState("");
  const [showPasswordError, setShowPasswordError] = useState(false);

  const inputMap = useRef({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });

  const validInputMap = useRef({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
        userName: formData.get("userName"),
      }),
    });
    console.log({ response });
    if (response.status === 201) {
      toast.success("Succefully Signed up. You can sign in now.");
      router.replace("/login");
      router.refresh();
    } else {
      toast.error("Failed to SignUp.");
    }
  };

  function enableButton() {
    setShowSignUpButton(
      validInputMap.current.email != "" &&
        validInputMap.current.password != "" &&
        validInputMap.current.confirmPassword != ""
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 max-w-md w-[60%] h-[90%] justify-center shadow-2xl items-center border border-venmoBlue rounded-2xl px-10"
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
            console.log(text);
            inputMap.current.email = text;
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
            setPassword(text);
            inputMap.current.password = text;
            validInputMap.current.password = text;

            console.log("Confirm Passwrd", inputMap.current.confirmPassword);

            if (inputMap.current.confirmPassword != "") {
              if (text !== inputMap.current.confirmPassword) {
                setShowPasswordError(true);
                inputMap.current.confirmPassword = "";
                validInputMap.current.confirmPassword = "";
              }
            }
            enableButton();
          }}
        />

        <TextFieldWithLabel
          label={"Confirm Password"}
          type="password"
          name="confirm_password"
          placeholderText={"Confirm your Password"}
          errorText={"Please match Password"}
          pattern={password}
          showError={showPasswordError}
          ref={confirmPasswordRef}
          onValidText={function (text: string): void {
            console.log(text);

            validInputMap.current.confirmPassword = text;
            setShowPasswordError(false);
            enableButton();
          }}
          onTextChange={(value) => {
            inputMap.current.confirmPassword = value;
          }}
        />

        <TextFieldWithLabel
          label={"User Name"}
          type="text"
          name="userName"
          placeholderText={"Enter your User Name (OPTIONAL)"}
          showError={false}
          errorText=""
          ref={userNameRef}
          onValidText={function (text: string): void {
            inputMap.current.userName = text;
            validInputMap.current.userName = text;
          }}
        />

        <Button
          type={"submit"}
          label="SignUp"
          onClick={() => {}}
          enabled={showSignUpButton}
        />

        <Link href="/login" replace={true} className="text-venmoBlue font-bold">
          Login?
        </Link>
      </form>
    </>
  );
}
