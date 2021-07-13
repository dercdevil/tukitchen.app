import React from "react";
import { View, SafeAreaView } from "react-native";
import api from "@/api/v2";
import AsyncStorage from "@react-native-community/async-storage";
import * as Updates from 'expo-updates';
import {
    Box,
    Button,
    Icon,
    Text,
  } from "@/components";

export class ErrorBoundary extends React.Component {

  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error) {
    return { error: true };
  }

  componentDidCatch(error, errorInfo) {

    //const hasError = error && error.response && error.response.status === 401;

    this.setState({ 
      hasError: true, 
      error, 
      errorInfo 
    });

    if (window.Bugsnag) {
      window.Bugsnag.notify(error);
    }
  }

  destroyAuthToken = async () => {
    await AsyncStorage.removeItem("user");
  };

  handleBackToSignIn = async () => {
    // remove user settings
    api.setAccessTokenHeader(null);
    await AsyncStorage.setItem("user", JSON.stringify({}) );
    // restart app
    await Updates.reloadAsync();
  };

  render() {

    if (this.state.hasError) {
      return (
        <SafeAreaView >
          <View >
            <Box p={40} center>
              <Icon  icon = "stopwatch" provider = "entypo" fontSize = {40} /> 
              <Text style={{ fontSize: 32 }}>Oops, Ah Ocurrido un error</Text>
              <Text
                style={{
                  marginVertical: 10,
                  lineHeight: 23,
                }}
              >
                Sentimos mucho los inconvenientes causados, estamos trabajando
                para resolverlos lo mas pronto posible, agradecemos tu
                comprensión.
              </Text>
              <Button
                onPress={() => this.handleBackToSignIn()}
                style={{
                  marginVertical: 15,
                }}
              >
                  Volver a inicio
              </Button>
            </Box>
          </View>
        </SafeAreaView>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
