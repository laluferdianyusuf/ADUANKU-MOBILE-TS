import { View, Text, Pressable } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export const Search = () => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={() => router.push("/(tabs)/explore")}
      className="opacity-60"
    >
      <View
        className="flex-row items-center rounded-2xl px-4 py-4 mt-4"
        style={{ backgroundColor: colors.background }}
      >
        <MaterialCommunityIcons name="magnify" size={20} color={colors.text} />
        <View className="h-[60%] bg-custom-green-2 ml-1" style={{ width: 1 }} />
        <Text
          className="ml-2"
          style={{ color: colors.text, fontFamily: "Josefin" }}
        >
          Monitoring absensi siswa
        </Text>
      </View>
    </Pressable>
  );
};
