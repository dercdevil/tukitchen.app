import React, { useRef } from "react";
import { TouchableOpacity } from "react-native";

import { useTheme, useHover } from "@/hooks";
import { withStyleProps } from "@/hocs";
import { active } from "@/utils";
import { Tokens } from "@/theme";

const TouchableBase = withStyleProps(TouchableOpacity);
TouchableBase.displayName = "TouchableOpacityWithStyleProps";

export const Touchable = ({
    children,
    bg,
    hoverBg,
    roundness,
    disableHover,
    innerRef = null,
    styleElevationOnHover = false,
    elevation,
    activeOpacity=0.8,
    ...rest
}) => {
  const ref = innerRef || useRef(null);
  const { theme } = useTheme();
  const isHovered = useHover(ref);

    return (
        <TouchableBase
            ref={ref}
            bg={
                isHovered && !disableHover
                ? active(hoverBg || theme.colors.surface, 3, theme.dark)
                : bg
            }
            roundness={roundness || Tokens.unit(2)}
            activeOpacity={activeOpacity}
            elevation={styleElevationOnHover && isHovered ? elevation * 3 : elevation}
            {...rest}
        >
            {typeof children === "function" ? children({ isHovered }) : children}
        </TouchableBase>
    );
};
