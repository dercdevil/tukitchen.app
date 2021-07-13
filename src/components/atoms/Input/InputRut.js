import React, {useState} from "react";
import { withRut } from "@/hocs";
import { Input } from "./Input";
import { Box } from "../Box"; 
import { Text } from "../Text";
import { Colors } from "@/theme";
import { validateRut } from "@/utils";

export const InputRutRaw = withRut(Input);

InputRutRaw.displayName = "InputRutRaw";

export const InputRut = ({value,onBlur,...rest}) => {

    const [isFocus,setFocus] = useState(false); 

    const isValidRut = validateRut(value) || !isFocus ;

    const handleFocus = (event) => {
        setFocus(true);
        typeof onBlur === "function"
            && onBlur(event);
    }

    return (
        <Box>
            <InputRutRaw
                onBlur = {handleFocus}
                value = {value}
                {...rest}
                error = {!isValidRut}
            />
            {!isValidRut && (
                <Text fontSize = {10} color = {Colors.error} mt={4}>
                    Rut invalido
                </Text>
            )}
        </Box>

    )

}