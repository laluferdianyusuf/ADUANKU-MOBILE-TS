import { View, TextInput, Pressable } from "react-native";
import React, { RefObject } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

interface SearchBarProps {
  placeholder?: string;
  handleSearch: (query: string) => void;
  searchQuery?: string;
  handleClear?: () => void;
  inputRef?: RefObject<TextInput>;
}

export const SearchBar = ({
  placeholder = "Aduanku",
  handleSearch,
  searchQuery,
  handleClear,
  inputRef,
}: SearchBarProps) => {
  const { colors, dark } = useTheme();

  return (
    <View
      className={`flex-row items-center rounded-2xl py-3 px-4 flex-1 border border-custom-purple-2`}
    >
      <TextInput
        ref={inputRef}
        style={{
          color: "#a7b7db",
          fontFamily: "Josefin",
          flex: 1,
        }}
        placeholder={placeholder}
        placeholderTextColor={"#a7b7db"}
        value={searchQuery}
        onChangeText={handleSearch}
        returnKeyType="search"
        autoFocus
      />
      {searchQuery!.length > 0 ? (
        <Pressable onPress={handleClear}>
          <Ionicons name="close-outline" size={25} color={"#a7b7db"} />
        </Pressable>
      ) : (
        <Ionicons name="search-outline" size={25} color={"#a7b7db"} />
      )}
    </View>
  );
};
