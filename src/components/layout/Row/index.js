import React from "react";

import { Box } from "../../atoms/Box";

export const Row = ({ children, ...rest }) => (
    <Box flex={-1} direction="row" {...rest}>
        {children}
    </Box>
);
