import React from "react";

import { Tokens } from "@/theme";
import { isWeb } from "@/utils";

import { Col } from "../Col";
import { Footer } from "../Footer";

export const Layout = ({
  showFooter,
  children,
  isLargeScreen,
  footerProps,
  ...rest
}) => {
  const p = Tokens.unit(isLargeScreen ? 6 : 2.5);
  const mb = Tokens.unit(isLargeScreen ? 0 : 2.5);
  const pt = Tokens.unit(5);
  const h = isWeb() ? "-webkit-fill-available" : "auto";
  return (
    <Col flex={1} grow={1} p={p} pt={pt} mb={mb} h={h} {...rest}>
      {children}
    </Col>
  );
};
