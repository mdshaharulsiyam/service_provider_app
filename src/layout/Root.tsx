import { PortalProvider } from "@gorhom/portal";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Toast from "react-native-toast-message";
import GlobalContextProvider from "../providers/GlobalContextProvider";
import { salonTheme } from "../theme/salonTheme";
import DrawerLayout from "./DrawerLayout";

const navigationTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: salonTheme.colors.primary,
    background: salonTheme.colors.background,
    card: salonTheme.colors.surface,
    text: salonTheme.colors.text,
    border: salonTheme.colors.border,
    notification: salonTheme.colors.accent,
  },
};

const Root = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <PortalProvider>
        <KeyboardProvider>
          <NavigationContainer theme={navigationTheme}>
            <GlobalContextProvider>
              <StatusBar
                style="dark"
                backgroundColor={salonTheme.colors.background}
              />
              <DrawerLayout />
              <Toast />
            </GlobalContextProvider>
          </NavigationContainer>
        </KeyboardProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
};

export default Root;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: salonTheme.colors.background,
  },
});
