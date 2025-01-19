"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Google from "@/ui/assets/google.png";
import Image from "next/image";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addToast } from "@/redux/features/ToastSlice/ToastSlice";
import {
  googleAuth,
  selectAuth,
  resetAuthState,
} from "@/redux/features/AuthSlice/AuthSlice";

const Logo = dynamic(() => import("@/ui/module/blocks/Logo/Logo"), {
  loading: () => <p>loading...</p>,
});

const RegisterForm = dynamic(() => import("./RegisterForm"), {
  loading: () => <p>loading...</p>,
});

const Button = dynamic(() => import("@/ui/module/blocks/Button/Button"), {
  loading: () => <p>loading...</p>,
});

export default function RegisterContainer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { status, error } = useSelector(selectAuth);

  useEffect(() => {
    // Reset auth state when component mounts
    dispatch(resetAuthState());
  }, [dispatch]);

  const handleGoogleSuccess = async (codeResponse) => {
    try {
      if (codeResponse.code) {
        const result = await dispatch(googleAuth(codeResponse.code)).unwrap();
        if (result) {
          router.push("/dashboard");
          dispatch(
            addToast({
              id: Date.now(),
              title: "Success",
              message: "Successfully registered with Google!",
              variant: "success",
            })
          );
        }
      }
    } catch (error) {
      console.error("Google registration error:", error);
      dispatch(
        addToast({
          id: Date.now(),
          title: error?.title || "Error",
          message: error?.desc || "Google registration failed. Please try again.",
          variant: "error",
        })
      );
    }
  };

  const handleGoogleError = (error) => {
    console.error("Google OAuth error:", error);
    dispatch(
      addToast({
        id: Date.now(),
        title: "Error",
        message: "Google registration failed. Please try again.",
        variant: "error",
      })
    );
  };

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
    scope: "email profile",
  });

  return (
    <div className="w-full h-full z-50 relative px-0 py-0 lg:px-8 lg:py-8 2xl:w-[37%] xl:w-[37%] lg:w-[50%]">
      <div className="w-full h-full bg-background border border-border rounded-none lg:rounded-md z-50 flex flex-col justify-between p-16">
        <Logo text={"Focus Flow"} size={36} textSize={"text-sm"} />
        <RegisterForm />
        <div className="flex flex-col gap-16">
          <div className="flex flex-row items-center gap-12">
            <div className="bg-border h-[1px] w-full"></div>
            <p className="text-light font-medium text-xs">or</p>
            <div className="bg-border h-[1px] w-full"></div>
          </div>
          <Button
            text={status === "loading" ? "Loading..." : "Authorize with Google"}
            icon={<Image src={Google} alt="logo" width={18} height={18} />}
            onClick={() => googleLogin()}
            disabled={status === "loading"}
          />
        </div>
      </div>
    </div>
  );
}
