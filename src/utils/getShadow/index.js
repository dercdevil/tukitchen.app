import { useTheme } from "../../hooks";
import { isIOS, isWeb } from "../platform";

// https://github.com/material-components/material-components-web/blob/master/packages/mdc-elevation/_variables.scss
// https://ethercreative.github.io/react-native-shadow-generator/
const ambient = [
  "0px 0px 0px 0px",
  "0px 1px 3px 0px",
  "0px 1px 5px 0px",
  "0px 1px 8px 0px",
  "0px 1px 10px 0px",
  "0px 1px 14px 0px",
  "0px 1px 18px 0px",
  "0px 2px 16px 1px",
  "0px 3px 14px 2px",
  "0px 3px 16px 2px",
  "0px 4px 18px 3px",
  "0px 4px 20px 3px",
  "0px 5px 22px 4px",
  "0px 5px 24px 4px",
  "0px 5px 26px 4px",
  "0px 6px 28px 5px",
  "0px 6px 30px 5px",
  "0px 6px 32px 5px",
  "0px 7px 34px 6px",
  "0px 7px 36px 6px",
  "0px 8px 38px 7px",
  "0px 8px 40px 7px",
  "0px 8px 42px 7px",
  "0px 9px 44px 8px",
  "0px 9px 46px 8px",
];

const parseShadow = (raw) => {
  const values = raw.split(" ").map((val) => +val.replace("px", ""));
  return {
    x: values[0],
    y: values[1],
    blur: values[2],
    spread: values[3], // unused
  };
};

const interpolate = (i, a, b, a2, b2) => ((i - a) * (b2 - a2)) / (b - a) + a2;

export const getShadow = (depth = 4) => {
  const { theme } = useTheme();
  const s = parseShadow(ambient[depth]);
  const y = s.y === 1 ? 1 : Math.floor(s.y * 0.5);
  const c = theme.dark ? 255 : 0;

  if (isWeb()) {
    return {
      boxShadow: `${s.x}px ${y}px ${s.blur}px 0 rgba(${c}, ${c}, ${c}, 0.35)`,
    };
  }
  if (isIOS()) {
    return {
      shadowOffset: {
        width: 0,
        height: y,
      },
      shadowOpacity: Number(interpolate(depth, 1, 24, 0.2, 0.6).toFixed(2)),
      shadowRadius: Number(interpolate(s.blur, 1, 38, 1, 16).toFixed(2)),
    };
  }
  return {
    elevation: depth,
  };
};
