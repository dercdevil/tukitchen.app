import React from "react";

import { useAuth } from "@/hooks";

import { Button } from "./Button";
import { Text } from "../Text";

export const LogInButton = (props) => {
  const { logIn } = useAuth();

  const handleLogIn = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    await logIn();
  };

  return (
    <Button mode="contained" onPress={handleLogIn} {...props}>
      <Text>Log in</Text>
    </Button>
  );
};
