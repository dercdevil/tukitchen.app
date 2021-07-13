import React, { useRef } from "react";

import { useHover } from "@/hooks";

import { Button } from "./Button";

export const CTAButton = ({ children, ...rest }) => {
  const ref = useRef(null);
  const hovered = useHover(ref);
  return (
    <Button
      ref={ref}
      userSelect="none"
      mode={hovered ? "contained" : "outlined"}
      transitionDuration="0.12s"
      transitionProperty="all"
      transitionTimingFunction="ease-in"
      {...rest}
    >
      {children}
    </Button>
  );
};
