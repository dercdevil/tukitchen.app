import React from "react";
import { View } from "react-native";

export const Spacing = ({
  fill,
  spacing,
  top,
  right,
  bottom,
  left,
  horizontal,
  vertical,
}) => {
  const s = [];
  if (spacing) s.push({ padding: spacing });
  if (horizontal) s.push({ paddingHorizontal: horizontal });
  if (vertical) s.push({ paddingVertical: vertical });
  if (top) s.push({ paddingTop: top });
  if (right) s.push({ paddingRight: right });
  if (bottom) s.push({ paddingBottom: bottom });
  if (left) s.push({ paddingLeft: left });
  if (fill) s.push({ flex: 1, flexGrow: 1 });
  return <View style={s} />;
};
