import { validate, format, getCheckDigit } from "rut.js";

export const formatRut = (rut) => {
  return format(rut);
};

export const formatValid = (rut) => {
  let val = rut
  .replace(/[a-zA-Z|^ñ|^Ñ]/g, "");
  return val;
}
export const validateRut = (rut) => {
  return validate(rut);
};

export const checkDigit = (rut) => {
  return getCheckDigit(rut);
};
