import React from "react";
import { Box, Text } from "../../atoms";
import { lighten } from "@/utils";
import { Colors } from "@/theme";

export const StatusPill = ({children, tone, color}) => {
    return (
      <Box 
        roundness={2}
        bg={lighten(Colors?.[tone] || color , 42.5)} 
        flex={0} 
        w="auto"
        direction="row" 
        pb={2}
        paddingHorizontal={5}
        align="center"
        justify="center"
    >
        <Text color={ Colors?.[tone] || color }>
          {children}
        </Text>
      </Box>
    )
}