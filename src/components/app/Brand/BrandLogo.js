import React from "react";

import { Images } from "@/assets";
import { useTheme } from "@/hooks";

import { Image } from "../../atoms/Image";

export const BrandLogo = ({ multiplier = 1, ...rest }) => {
    const { theme } = useTheme();
    return (
        <Image
            h={43 * multiplier}
            w={81 * multiplier}
            source={theme.dark ? Images.logoDark : Images.logo}
            {...rest}
        />
    );
};
