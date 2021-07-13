import React, { useState } from "react";
import { Box } from "../../atoms";

export const Collapse = ({

    children,
    header

}) => {

    const [ open , setOpen ] = useState(false)

    return(
        <Box>
            <Box
                onPress = {() => setOpen(!open)}
            >
                {header}
            </Box>
            <Box>
                {open 
                    ? <Box size = {25} bg = "blue">
                    </Box>
                    : null
                }
            </Box>
        </Box>
    )

}