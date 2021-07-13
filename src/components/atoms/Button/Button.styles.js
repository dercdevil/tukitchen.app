import { StyleSheet } from "react-native";

import { Colors } from "@/theme";
import { lighten } from "@/utils";

export const getStyleSheet = (colorOnHover) => {
  return StyleSheet.create({
    "button-primary": {
      borderWidth: 1,
      borderRadius: 50,
    },
    "button-primary-hover": {},
    "button-primary-disabled": {
      backgroundColor: lighten(Colors.primary,20)
    },

    "text-primary": {
      color: Colors.white,
    },
    "text-primary-hover": {},

    "button-secondary": {
      borderColor: Colors.gray,
      borderWidth: 1,
      borderRadius: 50,
    },
    "button-secondary-hover": {
      backgroundColor: colorOnHover,
      borderColor: colorOnHover,
    },
    "text-secondary": {},
    "text-secondary-hover": {
      color: Colors.white,
    },

    "button-tertiary": {},
    "button-tertiary-hover": {
      // borderBottomWidth: 1,
      // borderColor: colorOnHover,
      // borderRadius: 1,
    },
    "text-tertiary": {},
    "text-tertiary-hover": {
      // color: colorOnHover,
    },
  });
};
