import tc from "tinycolor2";

export const lighten = (color, percentage = 5) =>
  tc(color).lighten(percentage).toString();

export const darken = (color, percentage = 5) =>
  tc(color).darken(percentage).toString();

export const active = (color, percentage = 5, isDark) =>
  isDark ? lighten(color, percentage) : darken(color, percentage);

export const tinycolor = tc;
