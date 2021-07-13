import React from "react";

import {
    Box,
    ResponsiveImage,
    Text
} from "@/components";

import { Images } from "@/assets";
import { EmptyBag } from "@/assets/svgs";

const Empty = ({
    description
}) => {

    return(
        <Box mt = {150} h = "100%">
            <EmptyBag
                width = {150}
                height = {150}
                style = {{
                    alignSelf: 'center',
                }}
            />
            <Text
                self = "center"
                mt = {20}
                w={300}
                fontSize={18}
                muted
            >
                {description}
            </Text>
        </Box>
    )

}

export const EmptyState = ({
    when : isEmpty,
    children,
    ...rest
}) => {

    return isEmpty 
        ? <Empty {...rest} />
        : children
}