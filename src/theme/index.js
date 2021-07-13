import { Dimensions } from "react-native";
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import {
  configureFonts,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Colors,
} from "react-native-paper";

import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

export const FONTS = {
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_700Bold,
};

export const fontConfig = {
  default: {
    regular: {
      fontFamily: "DMSans_400Regular",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "DMSans_500Medium",
      fontWeight: "normal",
    },
    italic: {
      fontFamily: "DMSans_400Regular_Italic",
      fontWeight: "normal",
    },
    bold: {
      fontFamily: "DMSans_700Bold",
      fontWeight: "normal",
    },
  },
};

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    background: "#FFFFFF",
    surface: "#F8F8F8",
    primary: "#ff4040",
    accent: "#023E8A",
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    background: "#121212",
    surface: "#121212",
    primary: "#ff4040",
    accent: "#023E8A",
  },
};

export const getTheme = (scheme) => {
  if (scheme === "dark") {
    return CombinedDarkTheme;
  }
  return CombinedDefaultTheme;
};

Colors.darkBg = "rgb(18, 18, 18)";
Colors.primary = "#ff4040";
Colors.accent = "#023E8A";
Colors.pink = "#73C5D9";
Colors.silver = "#ced1d6";
Colors.gray = "#bdb8b8";
Colors.muted = "#bdb8b8";
Colors.darkGray = "rgb(106, 106, 107)";
Colors.secondary = "#fdb846";
Colors.secondaryLight = "#fef5d3"
Colors.success="#72E544"
Colors.error= "#F74733";
Colors.warning = "#F9CC02"

const { width, height } = Dimensions.get("window");

export const Tokens = {
  unit: (n = 1) => 8 * n,
  width,
  height,
  isLargeScreen: width >= 1024,
  borderRadius: 20,
  isSmallDevice: width < 375,
};

export const Styles = {
  web: {
    base: {
      touchable: {
        borderRadius: Tokens.borderRadius,
      },
      text: {},
    },
    light: {
      box: {},
      header: {
        backgroundColor: Colors.white,
      },
      touchable: {
        backgroundColor: Colors.white,
        hovered: {
          shadowColor: Colors.darkBg,
        },
      },
      text: {
        color: "#1C1C1E8",
      },
    },
    dark: {
      box: {
        shadowColor: Colors.white,
      },
      header: {
        backgroundColor: Colors.darkBg,
      },
      touchable: {
        backgroundColor: Colors.darkBg,
        hovered: {
          shadowColor: Colors.white,
        },
      },
      text: {
        color: "#E5E5E7",
      },
    },
  },
  android: {},
  ios: {},
};

export const breakpointModal = 450;

export { Colors, useFonts };
