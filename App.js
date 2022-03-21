import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation/Navigation";
import { AuthProvider } from "./src/context/AuthContext";

/**
 * @name App
 * @description Main componente of this app
 * @returns JSX.Element
 */
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </NavigationContainer>
  );
}
