import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import { Button as RNPButton } from "react-native-paper";
import PropTypes from "prop-types";

import { Box, Text } from "@/components";
import { withStyleProps } from "@/hocs";
import { useHover } from "@/hooks";
import { Colors } from "@/theme";

import { getStyleSheet } from "./Button.styles";

// TODO: add hover/focus support

const PrimitiveButton = withStyleProps(RNPButton);

export const Button = ({
  type,
  uppercase,
  colorOnHover,
  children,
  onPress,
  disabled,
  ...args
}) => {
  const ref = useRef(null);
  const isHovered = useHover(ref);

  const s = getStyleSheet(colorOnHover);
  const style = (element) => {
    let extraButtonStyles = StyleSheet.compose(
      disabled ? s[`${element}-${type}-disabled`] : {}, 
      isHovered ? s[`${element}-${type}-hover`] : {}
    )

    return StyleSheet.compose(
      extraButtonStyles,
      s[`${element}-${type}`],
    );
  };

  const mode = () => {
    if (type === "secondary") {
      return "outlined";
    }
    if (type === "tertiary") {
      return "text";
    }

    return "contained";
  };

  return (
    // TODO: Use Pressable component of RNW 0.14 instead of button element
    <Box ref={ref}>
      <PrimitiveButton
        mode={mode()}
        uppercase={uppercase}
        onPress={onPress}
        transitionDuration="0.25s"
        transitionProperty="background-color"
        style={style("button")}
        disabled = {disabled}
        {...args}
      >
        {typeof children === "string" ? (
          <Text style={style("text")}>{children}</Text>
        ) : (
          children
        )}
      </PrimitiveButton>
    </Box>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  uppercase: PropTypes.bool,
  colorOnHover: PropTypes.string,
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
};

Button.defaultProps = {
  type: "primary",
  uppercase: false,
  colorOnHover: Colors.primary,
};

