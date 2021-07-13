import React from "react";

import { Text } from "./Text";

export const Title = ({ children, ...rest }) => {
    return (
        <Text title {...rest}>
            {children}
        </Text>
    );
};
