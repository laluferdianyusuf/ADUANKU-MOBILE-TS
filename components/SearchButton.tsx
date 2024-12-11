import { View, Text, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface SearchButtonProps {
  style?: string;
  isDisabled?: boolean;
  isWhat?: string;
}

export const SearchButton: React.FC<SearchButtonProps> = ({
  style,
  isDisabled = false,
  isWhat,
}) => {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(screens)/search",
          params: {
            isWhat: isWhat,
          },
        })
      }
      disabled={isDisabled}
      className={`${style}`}
    >
      <Ionicons name="search-outline" size={25} color={"black"} />
    </Pressable>
  );
};
