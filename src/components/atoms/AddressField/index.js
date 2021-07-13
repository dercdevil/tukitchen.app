import React, { Fragment, useState, useRef } from "react";
import { Box } from "../Box";
import { Spacing } from "../../layout/Spacing";
import { Input } from "../Input";
import { Text } from "../Text";
import { MapRefactored as Map, CustomMap, Marker } from "../../app/Map";


import { Colors } from "@/theme";
import { useEffect } from "react";
import { parse } from "react-native-svg";

export const AddressField = ({
    mode = "outlined",
    label,
    onChange,
    value,
    ...props
}) => {

    const [visible, setVisible] = useState(false);
    const [location,setLocation] = useState({ address: "" });
    const inputRef = useRef();

    useEffect( () => {

        if(value != undefined){
            if(
                value?.latitude &&
                value?.longitude
            ){
                const l = {
                    ...value,
                    latitude: parseFloat(value.latitude),
                    longitude: parseFloat(value.longitude)
                }
                setLocation({
                    ...l
                })
            }
        }

    } , [value]);

    const close = () => {
        setVisible(false);
        if(inputRef.current){
            inputRef.current.blur();
        }
    }

    const open = () => {
        setVisible(true);
    }

    const handleChange = (a) => {
        setLocation(a);
        if(typeof onChange === "function"){
            onChange(a);
        }
    }

    const isValidAddress = !!location.latitude && !!location.longitude;

    return(
        <Fragment>
            <Box>
                <Input
                    ref={inputRef}
                    onFocus = {open}
                    label = {label}
                    mode = {mode}
                    selection={{
                        start: 0,
                        end: 0
                    }}
                    value = {location.address}
                    {...props}
                />
            </Box>
            {isValidAddress && 
                <Fragment>
                    <Spacing top = {15} />
                    <Box
                        width="100%"
                        roundness={8}
                        pt={8}
                        pb={8}
                        be="#e1e1e1"
                        display="flex"
                        direction="row"
                    >
                        <Box width = "40%" height={120} bg={Colors.muted} roundness = {8} >
                            <CustomMap
                                onPress = {open}
                                onMarkerPress = {open}
                                width = "100%"
                                height = {120}
                                region = {{
                                    latitudeDelta: 0.1,
                                    longitudeDelta: 0.1,
                                    latitude: location.latitude,
                                    longitude: location.longitude
                                }}
                            >
                                {isValidAddress &&
                                    (
                                        <Marker
                                            coordinate={{ 
                                                latitude: location.latitude, 
                                                longitude: location.longitude
                                            }}
                                        >
                                            <Box position="relative"> 
                                                <Box 
                                                    height={40} 
                                                    width = {40} 
                                                    roundness={20} 
                                                    bg = "#F8D397" 
                                                    bw={1} 
                                                    bc={Colors.secondary}
                                                    style={{
                                                        opacity: .6
                                                    }}
                                                />
                                                <Box 
                                                    width = {10}
                                                    height = {10} 
                                                    roundness={5} 
                                                    bg = {Colors.secondary} 
                                                    position = "absolute"
                                                    left = {15}
                                                    top={15}
                                                />
                                            </Box>
                                        </Marker>
                                    )
                                }
                            </CustomMap>
                        </Box>
                        <Box ml={8} flex={1}>
                            <Text bold fontSize={20} > 
                                {location.city} 
                            </Text>
                            <Text fontSize = {12} mt={8} color={Colors.muted}>
                                {location.address}
                            </Text>
                        </Box>
                    </Box>
                </Fragment>
            }
            <Map
                open = {visible}
                onClose={close}
                onChange={handleChange}
            />
         </Fragment>
    )

}