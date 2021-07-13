import React, { Component } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { DEFAULT_API_GOOGLE_MAPS } from "@/constants";
const palette = {
  primary: {
    main: "#FF5A5F",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#006c70",
    contrastText: "#ffffff",
  },

  dark: {
    main: "#000000",
    contrastText: "#ffffff",
    lightDark: "#353535",
    metalblue: "#3E4A63",
  },
  grayScale: {
    gray100: "#FAFAFA",
    gray200: "#F5F5F5",
    gray300: "#ECECEC",
  },
};
const Search = ({ onRegionChange }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Buscar en Google"
      minLength={3}
      placeholderTextColor="#333"
      onPress={(data, details = null) => {
        onRegionChange({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          address: data.description,
          city: data.terms[2].value,
          description: data.reference,
        });
      }}
      query={{
        key: DEFAULT_API_GOOGLE_MAPS,
        language: "es",
      }}
      textInputProps={{
        autoCapitalize: "none",
        autoCorrect: false,
      }}
      fetchDetails
      enablePoweredByContainer={false}
      styles={{
        container: {
          position: "absolute",
          top: Platform.select({ ios: 60, android: 50 }),
          width: "100%",
        },
        textInputContainer: {
          marginHorizontal: 10,
          flex: 1,
          backgroundColor: "transparent",
          height: 54,
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
        textInput: {
          height: 54,
          margin: 0,
          padding: 0,
          borderRadius: 9,
          elevation: 5, // Shadow android
          shadowColor: palette.dark.main, // Shadow ios
          shadowOpacity: 0.1, // Shadow ios
          shadowOffset: { x: 0, y: 0 }, // Shadow ios
          shadowRadius: 15, // Shadow ios
          borderWidth: 1,
          borderColor: palette.grayScale.gray100,
          fontSize: 18,
        },
        listView: {
          marginHorizontal: 20,
          borderWidth: 1,
          borderColor: palette.grayScale.gray100,
          backgroundColor: palette.primary.contrastText,
          elevation: 5,
          shadowColor: palette.dark.main, // Shadow ios
          shadowOpacity: 0.1, // Shadow ios
          shadowOffset: { x: 0, y: 0 }, // Shadow ios
          shadowRadius: 15, // Shadow ios
          marginTop: 15,
        },
        description: {
          fontSize: 15,
        },
        row: {
          padding: 18,
          height: 58,
        },
      }}
    />
  );
};

export default Search;
