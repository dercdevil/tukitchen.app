import { useState } from "react";
import { useAuth } from "@/hooks";
import { URLS } from "@/constants";
import { notify } from "@/utils";
import { checkDigit } from "@/utils";

const SignUpActions = ({ navigation }) => {
  const { error: signUpError, resetError, loading, signUp } = useAuth();
  const [values, setValues] = useState({
    rut: "",
    password: "",
    passwordRepeat: "",
  });
  const { rut, password, passwordRepeat } = values;

  const [
    userAcceptTermsAndConditions,
    setUserAcceptTermsAndConditions,
  ] = useState(false);

  const handleChangeForm = (name, newValue) =>
    setValues({
      ...values,
      [name]: newValue,
    });

  const shouldEnableLogin =
    userAcceptTermsAndConditions &&
    rut.length >= 7 &&
    password === passwordRepeat
      ? false
      : true;

  const handleSignUp = () => {
    signUp({
      rut: `${rut}-${checkDigit(rut)}`,
      password: password,
      passwordRepeat: passwordRepeat,
    }).then(() => {
      notify.success({
        title: "Tu cuenta ha sido creada con exito",
      });
      navigation.navigate(URLS.login, { screen: URLS.login });
    });
  };

  const onEnterPress = async ({ currentTarget, key }) => {
    if (key === "Enter") {
      if (currentTarget.type === "text" && isWeb()) {
        document.querySelector("input[type=password]").focus();
      } else if (
        currentTarget.type === "password" &&
        !loading &&
        shouldEnableLogin
      ) {
        await handleSignUp();
      }
    }
  };

  return {
    error: signUpError,
    resetError,
    loading,
    rut,
    password,
    passwordRepeat,
    handleChangeForm,
    shouldEnableLogin,
    handleSignUp,
    onEnterPress,
    userAcceptTermsAndConditions,
    setUserAcceptTermsAndConditions,
  };
};

export default SignUpActions;
