"use client";
import Button from "@/ui/module/blocks/Button/Button";
import Input from "@/ui/module/blocks/Input/Input";
import PassInput from "@/ui/module/blocks/Input/PassInput";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginForm() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-16">
      <Input
        title={"Email or username"}
        required="true"
        icon={<User size={16} className="text-text" />}
        placeholder={"Email or username"}
      />
      <div className="flex flex-col gap-2 items-end">
        <PassInput />
        <p className="text-text text-[10px] cursor-pointer font-medium">
          Forgot Password
        </p>
      </div>
      <div className="flex flex-col gap-4 items-start w-full">
        <Button text={"login"} width={"full"} type="base" />
        <p
          className="text-light text-xs cursor-pointer font-normal"
          onClick={() => {
            router.push("/register");
          }}
        >
          Don't have an account?
          <span className="text-text font-medium cursor-pointer"> Sign Up</span>
        </p>
      </div>
    </div>
  );
}
