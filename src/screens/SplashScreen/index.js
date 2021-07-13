import React from "react";

import { Layout, BrandLogo, Spinner, Spacing } from "@/components";
import { useTheme } from "@/hooks";

export const SplashScreen = () => {
  const { theme } = useTheme();

  return (
    <Layout center bg={theme.colors.background}>
        <BrandLogo />
        <Spacing top={8} />
        <Spinner />
    </Layout>
  );
};
