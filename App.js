import * as International from "./src/configIntl";
import React, { useRef } from "react";
import { QueryClient, QueryClientProvider, focusManager } from "react-query";
import { enableScreens } from "react-native-screens";
import { AppearanceProvider } from "react-native-appearance";
import { NotifierWrapper } from "react-native-notifier";
import { AppState } from 'react-native';

import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { ThemeManager, SidebarManager } from "@/contexts";
import { useAppConfig } from "@/hooks";
import { store, persistor } from "@/redux/store";
import { Wrapper } from "@/wrapper";
import ErrorBoundary from "./src/ErrorBoundary";
import "react-native-get-random-values";
import { REFETCH_INTERVAL } from "constants";


const queryClient = new QueryClient();

enableScreens(); //https://reactnavigation.org/docs/react-native-screens/#setup-when-you-are-using-expo


focusManager.setEventListener(handleFocus => {
  AppState.addEventListener('change', handleFocus)
  return () => {
    AppState.removeEventListener('change', handleFocus)
  }
})


const App = ({ skipLoadingScreen }) => {
  const containerRef = useRef();

  const {
    sidebarInitialState,
    defaultTheme,
    user,
    isLoadingComplete,
    fontsLoaded,
  } = useAppConfig();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppearanceProvider>
          <SidebarManager initialState={sidebarInitialState}>
            <ThemeManager defaultTheme={defaultTheme}>
              <NotifierWrapper>
                <ReduxProvider store={store}>
                  <PersistGate loading={null} persistor={persistor}>
                    <Wrapper
                      containerRef={containerRef}
                      isLoggedIn={user?.isLoggedIn}
                      showSplash={
                        !isLoadingComplete && !skipLoadingScreen && !fontsLoaded
                      }
                    />
                  </PersistGate>
                </ReduxProvider>
              </NotifierWrapper>
            </ThemeManager>
          </SidebarManager>
        </AppearanceProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
