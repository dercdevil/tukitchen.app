import React from "react";

import { Box } from "../../atoms/Box";

export const Col = ({ children, ...rest }) => (
  <Box flex={-1} direction="column" {...rest}>
    {children}
  </Box>
);
