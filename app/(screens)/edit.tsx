import { View, Text } from "react-native";
import React from "react";
import { EditProfileScreen } from "@/screens";
import { useLocalSearchParams } from "expo-router";

export default function edit() {
  const { userId, user } = useLocalSearchParams();
  const userData = user && typeof user === "string" ? JSON.parse(user) : null;
  return <EditProfileScreen id={Number(userId)} item={userData} />;
}
