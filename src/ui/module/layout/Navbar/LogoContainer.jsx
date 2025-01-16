import React from "react";
import Logo from "../../blocks/Logo/Logo";
import useScreenWidth from "../../utils/UseScreenWidth/useScreenWidth";

export default function LogoContainer() {
  const mobilescreen = useScreenWidth(1024);
  return (
    <Logo
      size={40}
      textSize={"text-xl"}
      text={mobilescreen ? "Focus Flow" : null}
    />
  );
}
