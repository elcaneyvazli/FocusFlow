import dynamic from "next/dynamic";
import Google from "@/ui/assets/google.png";
import Image from "next/image";
const Logo = dynamic(() => import("@/ui/module/blocks/Logo/Logo"), {
  loading: () => <p>loading...</p>,
});
const LoginForm = dynamic(() => import("./LoginForm"), {
  loading: () => <p>loading...</p>,
});
const Button = dynamic(() => import("@/ui/module/blocks/Button/Button"), {
  loading: () => <p>loading...</p>,
});

export default function LoginContainer() {
  return (
    <div className="w-full h-full z-50 relative px-0 py-0 lg:px-8 lg:py-8 2xl:w-[37%] xl:w-[37%] lg:w-[50%]">
      <div className="w-full h-full bg-background border border-border rounded-none lg:rounded-md z-50 flex flex-col justify-between p-16">
        <Logo text={"Focus Flow"} size={36} textSize={"text-sm"} />
        <LoginForm />
        <div className="flex flex-col gap-16">
          <div className="flex flex-row items-center gap-12">
            <div className="bg-border h-[1px] w-full"></div>
            <p className="text-light font-medium text-xs">or</p>
            <div className="bg-border h-[1px] w-full"></div>
          </div>
          <Button
            text={"Authorize with Google"}
            icon={<Image src={Google} alt="logo" width={18} height={18} />}
          />
        </div>
      </div>
    </div>
  );
}
