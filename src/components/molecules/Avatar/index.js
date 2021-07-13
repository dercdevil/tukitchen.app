import React, { useRef } from "react";

import { useHover } from "@/hooks";
import { Tokens } from "@/theme";

import { nameToColor } from "./nameToColor";
import { Box, Text, Image, Touchable } from "../../atoms";

const AvatarInitial = ({ size, initial, roundness }) => {
    return (
        <Box center size={size} roundness={roundness} bg={nameToColor(initial)}>
            <Text color="black" center maxFontSizeMultiplier={1}>
                {initial.toUpperCase()}
            </Text>
        </Box>
    );
};

export const Avatar = ({
    size = Tokens.unit(6),
    source,
    name,
    email,
    onPress,
    withShadow,
    circle=false,
    ...rest
}) => {
    const ref = useRef(null);
    const isHovered = useHover(ref);
    const AvatarWrapper = onPress ? Touchable : Box;
    const roundness = size * ( circle ? 0.5 : 0.35 );
    const wrapperProps = {};

    let initial = null;

    if (name?.length) {
        [initial] = name;
        if (name.split(" ").length > 2) {
            initial = `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
        }
    } 
    else if (email?.length) {
        [initial] = email;
    }

    if (onPress) wrapperProps.onPress = onPress;
    if (withShadow) {
        wrapperProps.transitionDuration = "0.5s";
        wrapperProps.transitionProperty = "all";
        wrapperProps.transitionTimingFunction = "ease-out";
        wrapperProps.elevation = 4;
        if (isHovered) {
            wrapperProps.elevation = 8;
            wrapperProps.transform = [{ scale: 1.08 }];
        }
    }

    return (
        <AvatarWrapper
            center
            innerRef={ref}
            size={size}
            roundness={roundness}
            {...wrapperProps}
        >
            {source ? (
                <Image size={size} roundness={roundness} source={{uri:source}} {...rest} />
            ) : (
                <AvatarInitial initial={initial || ""} size={size} roundness={roundness} />
            )}
        </AvatarWrapper>
    );
};