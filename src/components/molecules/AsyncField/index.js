import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import {Input} from "../../atoms/Input";
import {Box} from "../../atoms/Box";
import {Text} from "../../atoms/Text";
import { Colors } from "@/theme";
import { Icon } from "../../atoms/Icon";
import { debounce } from "@/utils";
//import { useThrottle } from "react-use";

const AsyncFunction = (async () => {}).constructor;
const GeneratorFunction = (function* (){}).constructor;
const isAsyncFunction = (fn) => {
    return fn instanceof AsyncFunction && 
        AsyncFunction !== GeneratorFunction
}

export const AsyncField = ({
    onTextChange,
    onSuccess,
    message,
    ...props
}) => {

    const [ loading, setLoading ] = useState(false);
    const [ response, setResponse ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ text , setText ] = useState();

    //const throttleText = useThrottle(text);

    useEffect( () => {
        const executeAsyncFunction = () => {
            if(isAsyncFunction(onTextChange) && text){
                setLoading(true);
                setResponse(null);
                setError(null);
                onTextChange(text)
                    .then( res => {
                        typeof onSuccess === "function" 
                            && onSuccess(res)
                        setResponse(res);
                    })
                    .catch( err => {
                        console.log(err);
                        setError(err);
                    })
                    .finally( () => {
                        setLoading(false);
                    })
            };
        }
        executeAsyncFunction();
    } , [ text ]);

    const getTone = (fallbackColor) => {
        return response
            ? Colors.success
            : error
                ? Colors.error
                : fallbackColor
    }

    const handleChange = value => {
        setText(value);
        !isAsyncFunction(onTextChange) 
            && onTextChange(value);
    }

    const debounceHandleChange = debounce(handleChange,400);

    return(
        <Box
            position="relative"
        >
            <Input
                {...props}
                theme={{
                    colors: {
                        primary: getTone( Colors.primary ),
                        placeholder: getTone( Colors.muted )
                    }
                }}
                onChangeText={debounceHandleChange}
                right={
                    <Box width={30} />
                }
            />
            {response &&
                (
                    <Adornment>
                        <Icon 
                            icon="checkcircle" 
                            provider = "ant-design"
                            fontSize={18} 
                            color = {Colors.success} 
                        />
                    </Adornment>
                )
            }
            {loading && 
                (
                    <Adornment>
                        <ActivityIndicator 
                            size = "small" 
                            color={Colors.primary}
                        />
                    </Adornment>
                )
            }
            {error &&
                (
                    <Adornment>
                        <Icon 
                            icon="error" 
                            provider = "material-icons" 
                            color = {Colors.error} 
                            fontSize={18} 
                        />
                    </Adornment>
                )
            }
            <Box mt={2}>
                <Text
                    color={ getTone(Colors.muted) }
                    fontSize={10}
                >
                    {typeof message === "function"
                        ? message(response,error,loading)
                        : message
                    }
                </Text>
            </Box>
        </Box>

    )
}

const Adornment = (props) => (
    <Box 
        pt={15}
        pb={15}
        pr={15}
        {...props}
        style={{
            position: "absolute",
            right: 0,
            top: 2
        }}
    />
)