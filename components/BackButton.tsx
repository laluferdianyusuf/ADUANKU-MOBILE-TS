import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

interface BackButtonProps {
  onBack: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onBack }) => {
  return (
    <Pressable onPress={onBack} className="">
      <Ionicons name="chevron-back-outline" color="black" size={25} />
    </Pressable>
  );
};
