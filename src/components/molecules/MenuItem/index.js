import React, { useRef } from "react";
import { Menu } from "react-native-paper";
import { withStyleProps } from "@/hocs";
import { useHover, useFocus, useTheme } from "@/hooks";
import { active } from "@/utils";

const EnhancedMenuItem = withStyleProps(Menu.Item);

export const MenuItem = (props) => {
  const ref = useRef(null);
  const hovered = useHover(ref);
  const focused = useFocus(ref);
  const { theme } = useTheme();
  const itemProps = {
    style: {
      background:
        (hovered || focused) && active(theme.colors.surface, 5, theme.dark),
    },
    textStyle: {
      alignItems: "flex-end",
    },
  };
  return <EnhancedMenuItem ref={ref} {...itemProps} {...props} />;
};
