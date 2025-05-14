"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Logo = () => {
  const { theme, resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState<string>(
    "/assets/images/logolight.png"
  );

  useEffect(() => {
    if (resolvedTheme === "dark") {
      setLogoSrc("/assets/images/logolight.png");
    } else {
      setLogoSrc("/assets/images/logodark.png");
    }
  }, [resolvedTheme, theme]);

  return <Image alt="Logo" height={50} src={logoSrc} width={150} />;
};

export default Logo;
