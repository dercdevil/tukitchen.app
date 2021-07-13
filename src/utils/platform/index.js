import { Dimensions, Platform, StatusBar } from "react-native";

export const isIPhoneXSize = (dim) => dim.height === 812 || dim.width === 812;

export const isIPhoneXrSize = (dim) => dim.height === 896 || dim.width === 896;

export const isIphoneX = () => {
  const dim = Dimensions.get("window");

  return Platform.OS === "ios" && (isIPhoneXSize(dim) || isIPhoneXrSize(dim));
};

export const isAndroid = () => Platform.OS === "android";

export const isIOS = () => Platform.OS === "ios";

export const isMobileApp = () => isAndroid() || isIOS();

export const isWeb = () => Platform.OS === "web";

export const statusBarHeight = () =>
  isAndroid() ? StatusBar.currentHeight : 20;
