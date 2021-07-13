import { useState , useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as ExpoSplash from "expo-splash-screen";
import * as Font from 'expo-font';

import { useFonts, FONTS } from "@/theme";
import { delay, isWeb } from "@/utils";
import axios from 'axios';
import { DEFAULT_API_URL } from '../../constants';

const validateUserToken = async token => {
  try{
    const res = await axios.get(
      `${DEFAULT_API_URL}users`,
      {
        headers: {
          "X-access-token": token
        }
      }
    )
    if(res.data?.id){
      return {
        isAuthenticated: true
      }
    }
  }catch(err){
    return {
      isAuthenticated: false
    }
  }
}

// Load any resources or data that we need prior to rendering the app
export const useAppConfig = () => {

    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [sidebarInitialState, setSidebarInitialState] = useState(false);
    const [user, setUser] = useState(null);
    const [defaultTheme, setDefaultTheme] = useState(
      isWeb() ? localStorage.getItem("theme") || "light" : "light" // TODO: Fix, this wont work in native
    );

    const [fontsLoaded] = useFonts(FONTS);
  
    // Load any resources or data that we need prior to rendering the app
    useEffect(() => {
      const loadResourcesAndDataAsync = async () => {
        try {
  
          ExpoSplash.preventAutoHideAsync();
  
          // Load our initial navigation state
          setDefaultTheme((await AsyncStorage.getItem("theme")) || null);
          setSidebarInitialState(
            (await AsyncStorage.getItem("sidebar")) === "true" || null
          );
  
          const savedUser = await AsyncStorage.getItem("user");
          if (savedUser) {
            if(savedUser.token){
              const {isAuthenticated} = await validateUserToken(savedUser.token);
              isAuthenticated &&
                setUser(JSON.parse(savedUser));
            }
          }
          // Load fonts
          await Font.loadAsync({
            ...MaterialCommunityIcons.font,
          });
          
        } catch (e) {
          // We might want to provide this error information to an error reporting service
          console.warn(e);
  
        } finally {
  
          await delay(1000);
          setLoadingComplete(true);
          ExpoSplash.hideAsync();
  
        }
      };
  
      loadResourcesAndDataAsync();
    }, []);

    return {
        isLoadingComplete,
        fontsLoaded,
        sidebarInitialState,
        defaultTheme,
        user
    }

}