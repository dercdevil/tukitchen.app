import React from "react";

import { Images } from "@/assets";
import { useTheme } from "@/hooks";

import { Image } from "../../atoms/Image";

export const BrandIcon = ({ multiplier = 1, ...rest }) => {
    const { theme } = useTheme();
    return (
        <Image
            w={12 * multiplier}
            h={28 * multiplier}
            source={theme.dark ? Images.iconDark : Images.icon}
            {...rest}
        />
    );
};