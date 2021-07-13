import React from "react";
import { ImageBackground } from "react-native";
import { Images } from "@/assets";
import { overflowValue } from "@/utils";
import { COPY } from "@/copy";
import { Colors } from "@/theme";
import {
  Col,
  Screen,
  Spacing,
  Title,
  Header,
  Text,
  Box,
  Button,
  InputWithCensorToggle
} from "@/components";


const ChangePassword = ({
    error,
    setPassword,
    onPress,
    password,
    isLoading,
    shouldEnableUpdate,
    ...props
}) => {
    return(
        <>
        <Header {...props} />
        <Screen
            error={error}
            notifyError
            navigation={props.navigation}
            noHeader
            containerProps={{
                contentContainerStyle: {
                flex: 1,
                paddingBottom: 0,
                overflow: overflowValue(),
                },
            }}
        >
            <ImageBackground 
                source={Images.bg} 
                style={{ height: "100%", flex: 1 }}
            >
                <Box pl={30} pr={30}> 
                    <Spacing/> 
                    <Col flex={0} self="center">
                        <Title bold center>
                            {COPY["update-your-password"]}
                        </Title>
                        <Text fontSize={10} color={Colors.gray} center >
                            Ingresa tu nueva contraseña
                        </Text>
                    </Col>
                    <Col flex={0} self="center" w="100%">
                        <Spacing top={25}/>
                        <InputWithCensorToggle
                            onChangeText={setPassword}
                            mode="outlined"
                            value={password}
                            label={COPY["new-password"]}
                        />
                        <Spacing top={25}/>
                        <Button
                            mode="contained"
                            onPress={onPress}
                            loading={isLoading}
                            disabled={isLoading || !shouldEnableUpdate}
                        >
                            {COPY["update"]}
                        </Button>
                    </Col>
                </Box>
            </ImageBackground>
        </Screen>
        </>
    )
}

export default ChangePassword;