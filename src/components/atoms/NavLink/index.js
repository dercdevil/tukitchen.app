import React from "react";
import { Touchable } from "../Touchable";
import { Text } from "../Text";
import { Colors } from "@/theme";
import * as Linking from 'expo-linking';

const navigateTo = (url) => {
    Linking.openURL(url);
}

export const NavLink = ({
    children,
    to
}) => {
    return (
        <Touchable
            onPress = {() => { navigateTo(to) }}
        >
            <Text
                style={{
                    textDecorationLine: "underline",
                    textDecorationColor: Colors.primary,
                    textDecorationStyle: "solid"
                }}
            >
                {children}
            </Text>
        </Touchable>        
    )
}