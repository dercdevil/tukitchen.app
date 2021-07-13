import React from "react";

import { Box } from "@/components";

export const Hide = ({ children }) => {
  return <Box visibility="hidden">{children}</Box>;
};
