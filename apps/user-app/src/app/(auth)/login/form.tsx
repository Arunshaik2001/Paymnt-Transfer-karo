"use client";

import AppName from "@/components/AppName";
import Button from "@/components/Button";
import TextFieldWithLabel from "@/components/TextFieldWithLabel";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Turnstile, { useTurnstile } from "react-turnstile";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

export default function Form() {
  const router = useRouter();
  const turnstile = useTurnstile();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [showLoginButton, setShowLoginButton] = useState(false);

  const validInputMap = useRef({
    email: "",
    password: "",
    captchaToken: ""
  });

  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const captachaRes = await fetch(`/api/checkCaptchaValidity`, {
      method: "POST",
      body: JSON.stringify({
        token: validInputMap.current.captchaToken,
      }),
    });
    console.log({ captachaRes });
    if (captachaRes.status === 200) {
      const response = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
       
        redirect: false,
        callbackUrl: "/transfer",
      });
  
      if (!response?.error) {
        toast.success("Successfully Logged In");
        router.push("/transfer");
        router.refresh();
      } else {
        toast.error(
          "Unable to login. Please check your registered email and pasword"
        );
      }
    } else {
      toast.error((await captachaRes.json()).message);
    }

    
  };

  function enableButton() {
    setShowLoginButton(
      validInputMap.current.email != "" && validInputMap.current.password != "" && validInputMap.current.captchaToken != ''
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
        
        <Turnstile
          sitekey={process.env.NEXT_PUBLIC_CAPTCHA!}
          onVerify={(token) => {
            validInputMap.current.captchaToken = token;
            console.log(token);
            enableButton()
          }}
          onLoad={(widgetId, boundTurntile) => {
            console.log(widgetId);
            boundTurntile.reset();
          }}
          onError={(error) => {
            console.log(error);
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
