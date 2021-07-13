import React from "react";

import { useTheme, useDimensions } from "@/hooks";
import { URLS } from "@/constants";
import { Tokens } from "@/theme";

import { Col } from "../Col";
import { Row } from "../Row";
import { Spacing } from "../Spacing";
import { Text } from "../../atoms/Text";
import { BrandLogo } from "../../app/Brand";
import { COPY } from "@/copy";

export const Footer = ({ navigation, ...rest }) => {
  const { theme } = useTheme();
  const { window } = useDimensions();
  const isLargeScreen = window.width >= 650;
  const Wrapper = isLargeScreen ? Row : Col;
  const ElementsSpacing = isLargeScreen ? (
    <Spacing horizontal={6} />
  ) : (
    <Spacing vertical={1} />
  );
  const goTo = (to) => () => {
    navigation.navigate(to);
  };

  return (
    <Col
      center
      flex={0}
      p={Tokens.unit(isLargeScreen ? 2 : 4)}
      h={Tokens.unit(isLargeScreen ? 24 : 26)}
      bg={theme.colors.card}
      {...rest}
    >
      <BrandLogo multiplier={0.8} onPress={goTo(URLS.landing)} />

      <Col center>
        <Wrapper center p={Tokens.unit(isLargeScreen ? 2 : 6)}>
          <Text muted onPress={goTo(URLS.help)}>
            {COPY["footer.page.link1"]}
          </Text>
          {ElementsSpacing}
          <Text muted onPress={goTo(URLS.help)}>
            {COPY["footer.page.link2"]}
          </Text>
          {ElementsSpacing}
          <Text muted onPress={goTo(URLS.help)}>
          {COPY["footer.page.link3"]}
          </Text>
        </Wrapper>
        <Text muted>{COPY["footer.page.Copyright"]}</Text>
      </Col>
    </Col>
  );
};
