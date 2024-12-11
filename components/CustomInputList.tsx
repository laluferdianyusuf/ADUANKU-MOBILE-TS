import React from "react";
import { View, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface InputListProps {
  setSelected: (key: string) => void;
  data: { key: string; value: string }[];
  isSearched: boolean;
  icon: string;
  placeholder: string;
  label: string;
  noDataText: string;
  value?: "value" | "key";
  selectedValue: string | number | null;
  width?: number;
}

export const CustomInputList = ({
  setSelected,
  data,
  isSearched,
  icon,
  placeholder,
  label,
  noDataText,
  value,
  selectedValue,
  width = 300,
}: InputListProps) => {
  const { colors } = useTheme();

  const defaultOption =
    data.find((item) => item.value === selectedValue) || null;

  return (
    <View className="mb-4">
      <Text className="font-josefin-bold mb-2 capitalize opacity-75">
        {label}
      </Text>
      <View className="px-3 border border-custom-purple-1 rounded-2xl flex-row items-center gap-3">
        <Ionicons name={icon as any} size={20} color={"#5e7dbd"} />
        <View className="h-[35%] bg-custom-purple-1" style={{ width: 1 }} />
        <SelectList
          setSelected={(val: string) => setSelected(val)}
          data={data}
          search={isSearched}
          save={value}
          boxStyles={{
            borderColor: "transparent",
            paddingHorizontal: 0,
            width: width - 20,
            paddingVertical: 10,
          }}
          inputStyles={{ color: "black", fontFamily: "Josefin" }}
          placeholder={placeholder}
          searchPlaceholder="Search"
          searchicon={
            <Ionicons name="search-outline" size={20} color={"#5e7dbd"} />
          }
          arrowicon={
            <Ionicons name="chevron-down" size={20} color={"#5e7dbd"} />
          }
          closeicon={
            <Ionicons name="close-outline" size={20} color={"#5e7dbd"} />
          }
          dropdownStyles={{
            borderColor: "transparent",
            marginTop: -10,
          }}
          dropdownTextStyles={{
            color: "#5e7dbd",
            marginLeft: -20,
            fontFamily: "Josefin",
          }}
          notFoundText={noDataText}
        />
      </View>
    </View>
  );
};
