import { useState } from "react";
import { notify, validate } from "@/utils";
import axios from "axios";
import { URLS } from "@/constants";
import { DEFAULT_API_URL } from "@/constants";
const FormCompanyActions = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    to: "voraz.contacto.chile@gmail.com",
    email: "",
    name: "",
    phone: "",
    subject: "Propuesta de negocios",
    title: "Unirme al servicio de Voraz",
    message: "",
  });

  const { name, phone, title, message, subject, email } = values;
  const handleChangeForm = (name, newValue) =>
    setValues({
      ...values,
      [name]: newValue,
    });

  const shouldEnableLogin = name.length && phone.length && validate(email,"email") && message.length ? false : true;

  const sendEmail = () => {
    setIsLoading(true);
    axios
      .post(DEFAULT_API_URL+"api/send-mail-to", {
        to: values.to,
        subject: subject,
        title: title,
        message: `Nombre: ${name}, \n Telefono: ${phone}, \n Correo: ${email}, \n\n ${message}`,
      })
      .then(() => {
        setIsLoading(false);
        notify.success({
          title: "Solicitud Enviada",
        });
        navigation.navigate(URLS.login, { screen: URLS.login });
      })
      .catch(() => {
        setIsLoading(false);
        notify.error({
          title: "Ocurrio un error inesperado",
        });
      });
  };
  return {
    isLoading,
    shouldEnableLogin,
    name,
    email,
    phone,
    message,
    navigation,
    sendEmail,
    handleChangeForm,
  };
};

export default FormCompanyActions;
