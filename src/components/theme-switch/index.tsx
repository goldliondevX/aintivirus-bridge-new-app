"use client";
import { Button, SwitchProps } from "@heroui/react";
import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/assets/icons";

export interface ThmemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

const ThemeSwitch: FC<ThmemeSwitchProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const onChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={className}>
      <div className="flex items-center">
        <Button isIconOnly className="bg-transparent" onPress={onChange}>
          {theme === "dark" ? (
            <MoonIcon height={20} width={20} />
          ) : (
            <SunIcon height={20} width={20} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ThemeSwitch;
