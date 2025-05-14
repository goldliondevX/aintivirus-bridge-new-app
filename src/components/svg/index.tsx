import { cn } from "@/utils";
import React from "react";

export type SvgProp = React.SVGAttributes<SVGElement>;

const Svg: React.FC<SvgProp> = ({ className, children, ...props }) => {
  return (
    <svg
      className={cn("shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
};

export default Svg;
