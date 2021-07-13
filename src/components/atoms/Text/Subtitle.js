import React from "react";

import { Text } from "./Text";

export const Subtitle = ({ children, ...rest }) => {
    return (
        <Text subtitle {...rest}>
            {children}
        </Text>
    );
};
