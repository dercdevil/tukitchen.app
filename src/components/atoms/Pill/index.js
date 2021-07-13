import React from "react";
import { Chip as RNPChip } from 'react-native-paper';
import { withStyleProps } from "@/hocs";
import { Colors } from "@/theme";
import { Text, Box } from "../../atoms";

const Chip = withStyleProps(RNPChip);

export const Pill = ({tone, color : colorProp, children, ...props}) => {

    const color = Colors[tone] || colorProp;

    return (
        <Chip
            {...props}
            bs = "dashed"
            bw={2}
            bc={ color }
            bg="transparent"
            color={ color }
            outline
        >
            <Text color = {color} >
                {children}
            </Text>
        </Chip>
    )

}
