import React, { useRef } from "react";
import * as Animatable from "react-native-animatable";

import { withStyleProps } from "@/hocs";
import { Box } from "../Box";

const EnhancedImage = withStyleProps(Animatable.Image);
EnhancedImage.displayName = "EnhancedImage"

const ImageWithPlaceholder = (props) => {

    const ref = useRef();
    const { 
        initialWidth, 
        initialHeight, 
        source, 
        containerProps, 
    } = props;

    return (
        <Box
            w={initialWidth}
            h={initialHeight}
            maxW="100%"
            position="relative"
            {...containerProps}
        >
            <EnhancedImage
                ref={ref}
                source={source}
                resizeMode="contain"
                position="absolute"
                top={0}
                right={0}
                bottom={0}
                left={0}
                w="100%"
                h="100%"
            />
        </Box>
    );
};

export const ResponsiveImage = withStyleProps(ImageWithPlaceholder);
ResponsiveImage.displayName = "ResponsiveImage";
