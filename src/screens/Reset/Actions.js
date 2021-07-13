import { useEffect, useState } from "react";

import { useAuth } from "@/hooks";
import { URLS } from "@/constants";
import {validate} from "@/utils"
const ResetActions = () => {
  const { error: signUpError, resetError, loading, recoverPassword } = useAuth();
  const [email, setEmail] = useState("");
  const shouldEnableRecoverPassword = validate(email,"email") ? false : true;

  const handleReset = async () => {
    await recoverPassword({
       email,
     }).then(() => {
       navigation.navigate(URLS.login);
     });
  };

  const onEnterPress = async ({ currentTarget, key }) => {
    if (key === "Enter") {
      if (currentTarget.type === "text" && isWeb()) {
        document.querySelector("input[type=password]").focus();
      } else if (
        currentTarget.type === "password" &&
        !loading &&
        shouldEnableRecoverPassword
      ) {
        await handleReset();
      }
    }
  };

  return {
    error: signUpError,
    resetError,
    loading,
    email,
    setEmail,
    shouldEnableRecoverPassword,
    handleReset,
    onEnterPress,
  };
};

export default ResetActions;
