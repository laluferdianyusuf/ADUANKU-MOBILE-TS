import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { LoginScreen, RegisterScreen, StartScreen } from "@/screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function App() {
  const [showStartScreen, setShowStartScreen] = useState<boolean>(false);
  const [showRegisterScreen, setShowRegisterScreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkIfFirstTime = async () => {
      const hasSeenStartScreen = await AsyncStorage.getItem(
        "hasSeenStartScreen"
      );
      setShowStartScreen(!hasSeenStartScreen);

      const userToken = await AsyncStorage.getItem("token");
      if (userToken) {
        setIsLoggedIn(true);
      }

      setIsLoading(false);
    };
    checkIfFirstTime();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/(tabs)");
    }
  }, [isLoggedIn]);

  if (isLoading) {
    return (
      <View className="bg-custom-purple-1 flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (showStartScreen) {
    return (
      <StartScreen
        onComplete={async () => {
          await AsyncStorage.setItem("hasSeenStartScreen", "true");
          setShowStartScreen(false);
          setShowRegisterScreen(true);
        }}
      />
    );
  }

  if (showRegisterScreen) {
    return <RegisterScreen />;
  }

  return <LoginScreen />;
}
