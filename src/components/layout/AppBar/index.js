import React from "react";
import { Appbar as RNPAppBar } from "react-native-paper";

import { withStyleProps } from "@/hocs";
import { useTheme } from "@/hooks";

const Appbar = withStyleProps(RNPAppBar);

export const AppBar = ({ children, ...props }) => {
  const { theme } = useTheme();
  return (
    <Appbar
        bg={theme.colors.background}
        bbc={theme.colors.border}
        statusBarHeight={64}
        boxShadow="none"
        bbw={1}
        {...props}
    >
        {children}
    </Appbar>
  );
};
