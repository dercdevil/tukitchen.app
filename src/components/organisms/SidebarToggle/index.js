import React from "react";

import { Touchable, Icon } from "@/components/atoms";
import { Tooltip } from "@/components/molecules";
import { Tokens } from "@/theme";
import { COPY } from "@/copy";

export const SidebarToggle = ({ collapsed, toggle, ...rest }) => {
    return (
        <Tooltip
            title={COPY[`menu.expand.sidebar.${collapsed ? "expand" : "minimize"}`]}
            position="right"
            distance={-100}
            disabled={!collapsed}
        >
            <Touchable
                flex={1}
                onPress={toggle}
                roundness={Tokens.unit(3)}
                p={Tokens.unit(2)}
                {...rest}
            >
                <Icon
                    fontSize={24}
                    provider="feather"
                    icon={collapsed ? "chevrons-right" : "chevrons-left"}
                />
            </Touchable>
        </Tooltip>
    );
};
