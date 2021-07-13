import React from "react";
import { Tooltip as Tippy } from "react-tippy";

import "react-tippy/dist/tippy.css";

export const Tooltip = ({ animation = "perspective", children, ...rest }) => (
    <Tippy animation={animation} {...rest}>
        {children}
    </Tippy>
);
