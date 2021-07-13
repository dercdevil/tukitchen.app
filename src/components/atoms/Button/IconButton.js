import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler"
import { withStyleProps } from "../../../hocs";
import { Icon } from "../../atoms";

const Touchable = withStyleProps(TouchableOpacity);

export const IconButton = ({
    onPressed,
    ...props
}) => {

    return(
        <Touchable
            onPress={onPressed}
            onPressed = {onPressed}
            roundness={8}
            activeOpacity = {0.8}
            p = {8}
        >
            <Icon {...props} />
        </Touchable>
    )

}