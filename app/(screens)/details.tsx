import { View, Text } from "react-native";
import React from "react";
import { DetailScreen } from "@/screens";
import { useLocalSearchParams } from "expo-router";

export default function details() {
  const { id } = useLocalSearchParams();
  return <DetailScreen id={Number(id)} />;
}
