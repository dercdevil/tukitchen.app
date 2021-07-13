import React from "react";
import { Text as RNPText } from "react-native-paper";

import { withStyleProps } from "@/hocs";
import { useTheme } from "@/hooks";
import { fontConfig } from "@/theme";

const EnhancedText = withStyleProps(RNPText);

export const Text = ({
    caption,
    title,
    subtitle,
    normal,
    medium,
    italic,
    bold,
    children,
    center,
    muted,
    small,
    tiny,
    ...rest
}) => {
  const { theme } = useTheme();
  const computedProps = {
    fontFamily: fontConfig.default.regular.fontFamily,
  };

  if (caption) computedProps.fontSize = 48;
  if (title) computedProps.fontSize = 24;
  if (subtitle) computedProps.fontSize = 18;
  if (small) computedProps.fontSize = 14;
  if (tiny) computedProps.fontSize = 11;
  if (normal) computedProps.fontFamily = fontConfig.default.regular.fontFamily;
  if (medium) computedProps.fontFamily = fontConfig.default.medium.fontFamily;
  if (italic) computedProps.fontFamily = fontConfig.default.italic.fontFamily;
  if (bold) computedProps.fontFamily = fontConfig.default.bold.fontFamily;
  if (center) computedProps.textAlign = "center";
  if (muted) computedProps.color = theme.colors.placeholder;

  return (
    <EnhancedText {...computedProps} {...rest}>
      {children}
    </EnhancedText>
  );
};

EnhancedText.displayName = "EnhancedText";
