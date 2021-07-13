import React, { useState, useCallback, useRef } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import Search from "./Search";
import axios from "axios";
import { DEFAULT_API_GOOGLE_MAPS } from "@/constants";
import { Button, Icon, Text, Loader, Title } from "@/components";

export * from "./MapRefactored";
export * from "./CustomMap";
export {
  Marker
}

const GoogleMaps = ({ 
  close, 
  onChangeA
}) => {

  const getRequest = (latitude, longitude) => {
    if (latitude && longitude) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${DEFAULT_API_GOOGLE_MAPS}`
        )
        .then((response) => {
          setLoading(false);
          setData(response.data.results[0].formatted_address);
          onChangeA({
            latitude: latitude,
            longitude: longitude,
            address: response.data.results[0].formatted_address,
            city: response.data.results[0].address_components[3].long_name,
            description: response.data.results[0].plus_code.compound_code,
          });
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  const [region, setRegion] = useState({
    latitude: -20.2307033,
    longitude: -70.1356692,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState([]);
  const markerRef = useRef(null);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const onMapClick = useCallback((e) => {
    getRequest(
      e.nativeEvent.coordinate.latitude,
      e.nativeEvent.coordinate.longitude
    );
    setMarkers([
      {
        lat: e.nativeEvent.coordinate.latitude,
        lng: e.nativeEvent.coordinate.longitude,
      },
    ]);
    setRegion({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }, []);
  const onRegionChange = useCallback((e) => {
    setLoading(false);
    setRegion({
      latitude: e.latitude,
      longitude: e.longitude,
      latitudeDelta: e.latitudeDelta,
      longitudeDelta: e.longitudeDelta,
    });
    setMarkers([
      {
        lat: e.latitude,
        lng: e.longitude,
        data: e.address,
      },
    ]);
    onChangeA({
      latitude: e.latitude,
      longitude: e.longitude,
      address: e.address,
      city: e.city,
      description: e.description,
    });
  }, []);
  const show = () => {
    if (markerRef && markerRef.current && markerRef.current.showCallout) {
      markerRef.current.showCallout();
    }
  };
  const hide = () => {
    markerRef?.current?.hideCallout?.();
  };
  
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={region}
        region={region}
        minZoomLevel={13}
        maxZoomLevel={16}
        showsUserLocation
        loadingEnabled
        toolbarEnabled={false}
        onPress={onMapClick}
        onRegionChangeComplete={show}
        onMarkerPress={show}
        onCalloutPress={hide}
        style={styles.map}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
            title={"Direccion:"}
            ref={markerRef}
            draggable
            collapsable
            onDragEnd={onMapClick}
          >
            <Callout style={{ backgroundColor: "white", width: 250 }}>
              {loading ? (
                <Loader />
              ) : (
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
        onPress={() => close()}
      >
        <Icon
          provider="ant-design"
          icon="checkcircle"
          color={"red"}
          fontSize={40}
        />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: 747,
  },
});

export default GoogleMaps;
