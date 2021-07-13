import React from "react";
import { ActivityIndicator } from "react-native";

import { Colors } from "@/theme";

export const Spinner = ({ size = "small", color, ...rest }) => {
    return (
        <ActivityIndicator size={size} color={color || Colors.primary} {...rest} />
    );
};
