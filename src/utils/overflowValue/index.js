import { useDimensions } from "@/hooks";
import { isWeb } from "@/utils";

export const overflowValue = () => {
  const { window } = useDimensions();
  const isLargeScreen = window.height >= 850;

  if (isLargeScreen) {
    return "hidden";
  }

  if (isWeb()) {
    return "unset";
  }

  return undefined;
};