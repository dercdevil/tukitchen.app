import React from "react";
import { useState, useRef, useCallback } from "react";
import { View } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { styles } from "./Map.styles";
import { DEFAULT_API_GOOGLE_MAPS } from "@/constants";
import { Box, Button, Icon, Text, Loader, Title } from "@/components";
import Search from "./Search";
import axios from "axios";
import { Portal } from "react-native-paper";

const INIT_REGION = {
    latitude: -20.2307033,
    longitude: -70.1356692,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

const getGoogleMapUrl = (latitude,longitude) => 
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${DEFAULT_API_GOOGLE_MAPS}`

export const MapRefactored = ({
    onChange,
    open = false,
    onClose
}) => {

    const [region, setRegion] = useState(INIT_REGION);
    const [markers, setMarkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState("");

    const markerRef = useRef(null);

    const showCallout = () => {markerRef?.current?.showCallout?.();}

    const hideCallout = () => {markerRef?.current?.hideCallout?.();}
    
    //is the process of converting geographic coordinates into a human-readable address.
    const reverseGeocode = async (latitude, longitude) => {
        if (latitude && longitude) {
            try {
                const res = await axios.get( getGoogleMapUrl(latitude,longitude) );
                const googleLocation = res.data.results[0];
                setData(googleLocation.formatted_address);
                if(typeof onChange === "function"){
                    onChange({
                        latitude,
                        longitude,
                        address: googleLocation.formatted_address,
                        city: googleLocation.address_components[3].long_name,
                        description: "no especifica",
                    });
                }
            }catch(err){
                console.log(err);
            }finally{
                setLoading(false);
            }
        }
    };

    const onMapClick = useCallback((e) => {
        const latitude = e.nativeEvent.coordinate.latitude;
        const longitude = e.nativeEvent.coordinate.longitude;
        reverseGeocode( latitude , longitude ); 
        setMarkers([{ lat: latitude, lng: longitude }]);
        setRegion( oldRegion => ({...oldRegion, latitude, longitude}) );
    }, []);

    const onRegionChange = useCallback((e) => {
        const latitude = e.latitude;
        const longitude = e.longitude;

        setLoading(false);
        setRegion( oldRegion => ({...oldRegion, latitude, longitude}) );
        setMarkers([{
            lat: e.latitude,
            lng: e.longitude,
            data: e.address,
        }]);

        if(typeof onChange === "function" ){
            onChange({
                latitude,
                longitude: e.longitude,
                address: e.address,
                city: e.city,
                description: e.description,
            });
        }
    }, []);

    if(!open) return null;

    return(
        <Portal> 
            <Box
                flex={1}
                bg="#fff"
                alignItems = "center"
                justifyContent = "center"
            >
                <MapView
                    initialRegion={region}
                    region={region}
                    minZoomLevel={13}
                    maxZoomLevel={16}
                    toolbarEnabled={false}
                    onPress={onMapClick}
                    onRegionChangeComplete={showCallout}
                    showsUserLocation
                    loadingEnabled
                    onMarkerPress={showCallout}
                    onCalloutPress={hideCallout}
                    style={styles.map}
                >
                    {markers.map((marker) => (
                        <Marker
                            key={`${marker.lat}-${marker.lng}`}
                            coordinate={{ 
                                latitude: marker.lat, 
                                longitude: marker.lng
                            }}
                            title={"Direccion:"}
                            ref={markerRef}
                            draggable
                            collapsable
                            onDragEnd={onMapClick}
                        >
                            <Callout style={{ backgroundColor: "white", width: 250 }}>
                            {loading 
                                ? ( <Loader /> ) 
                                : (
                                    <View>
                                        <Title center bold>
                                            Direccion:
                                        </Title>
                                        <Text center>{marker.data || data}</Text>
                                    </View>
                                )}
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
                {/* Buscador del mapa */}
                <Search onRegionChange={onRegionChange} />
                {/* boton de salida */}
                <Button
                    position={"absolute"}
                    type="tertiary"
                    ml={110}
                    top={-80}
                    onPress = {onClose}
                >
                    <Icon
                        provider="ant-design"
                        icon="checkcircle"
                        color={"red"}
                        fontSize={40}
                    />
                </Button>
            </Box>
        </Portal>
    )
}

