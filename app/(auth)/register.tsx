import { View, Text } from "react-native";
import React from "react";
import { RegisterScreen } from "@/screens";
import { useLocalSearchParams } from "expo-router";

export default function register() {
  const { isAdmin } = useLocalSearchParams();

  return <RegisterScreen isAdmin={isAdmin as string} />;
}
