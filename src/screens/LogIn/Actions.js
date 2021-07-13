import { useEffect, useState } from "react";

import { IS_DEVELOPMENT } from "@/constants";
import { useAuth } from "@/hooks";
import { delay, isWeb, notify } from "@/utils";
import { URLS } from "@/constants";
import { checkDigit } from "@/utils";

const LogInActions = ({ navigation }) => {

  const { 
    error, 
    resetError, 
    loading, 
    isLoggedIn, 
    logIn, 
    user,
    profile
  } = useAuth();

  const [values, setValues] = useState({
    rut: "",
    password: "",
  });
  const { rut, password } = values;
  const handleChangeForm = (name, newValue) =>
  setValues({
      ...values,
      [name]: newValue,
    });

  const shouldEnableLogin = rut.length >= 7 && password.length ? false : true;

  useEffect(() => {
    if (isLoggedIn) {

      notify.success({
        title: `${profile ? `BIenvenido ${profile.name}` : `Bienvenido` }`
      });

      if(!profile){
        navigation.navigate(URLS.profile);
      }else{
        navigation.navigate(URLS.home)
      }
      
    }
  }, [isLoggedIn,profile]);

  const handleLogIn = async () => {
    await logIn({ rut:`${rut}-${checkDigit(rut)}`, password });

    if (IS_DEVELOPMENT) {
      await delay(1500);
    }
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
        await handleLogIn();
      }
    }
  };

  return {
    error,
    resetError,
    loading,
    handleChangeForm,
    password,
    rut,
    shouldEnableLogin,
    handleLogIn,
    onEnterPress,
  };
};

export default LogInActions;
