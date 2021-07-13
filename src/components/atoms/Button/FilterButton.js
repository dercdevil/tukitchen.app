import React from "react";

import { TouchableIcon, Tooltip } from "@/components";
import { Tokens } from "@/theme";
import { COPY } from "@/copy";

export const FilterButton = ({ isLargeScreen, ...props }) => (
  <Tooltip
    title={COPY["localbitcoins.filter"]}
    position="bottom"
    distance={10}
    disabled={!isLargeScreen}
  >
    <TouchableIcon
      size={20}
      p={Tokens.unit(1.25)}
      w="auto"
      h="auto"
      provider="material-community-icons"
      icon="filter-variant"
      {...props}
    />
  </Tooltip>
);
