import React from "react";

import { Touchable, Icon } from "@/components";
import { Tokens, Colors } from "@/theme";

export const ScrollToTopButton = ({ scrollRef }) => {
  const scrollToTop = () =>
    scrollRef?.current?.scrollTo({ x: 0, y: 0, animated: true });
  return (
    <Touchable
      disableHover
      elevation={4}
      w={55}
      h={55}
      bg={Colors.primary}
      roundness={35}
      display="flex"
      justify="center"
      align="center"
      mb={Tokens.unit(4)}
      mr={Tokens.unit(3)}
      position="absolute"
      bottom={1}
      right={1}
      onPress={scrollToTop}
    >
      <Icon
        fontSize={32}
        color={Colors.white}
        provider="Entypo"
        icon="chevron-up"
        self="center"
        p={Tokens.unit(1.2)}
      />
    </Touchable>
  );
};
