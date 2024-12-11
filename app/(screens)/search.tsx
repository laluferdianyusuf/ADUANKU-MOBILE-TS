import { View, Text } from "react-native";
import React from "react";
import { SearchScreen } from "@/screens";
import { useLocalSearchParams } from "expo-router";

export default function search() {
  const { isWhat } = useLocalSearchParams();
  return <SearchScreen isWhat={isWhat as string} />;
}
