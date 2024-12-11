import React from "react";
import { View, Text } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface MultipleListProps {
  setSelected: (key: string) => void;
  data: { key: string; value: string }[];
  isSearched: boolean;
  icon: string;
  label: string;
  value?: "value" | "key";
  selectedValue: string[] | string;
  width?: number;
  placeholder?: string;
}

export const CustomMultipleList = ({
  setSelected,
  data,
  isSearched,
  icon,
  label,
  value,
  selectedValue,
  placeholder,
  width = 300,
}: MultipleListProps) => {
  const { colors } = useTheme();

  return (
    <View className="mb-4">
      <Text className="font-josefin-bold mb-2 capitalize opacity-75">
        {label}
      </Text>
      <View className="px-3 border border-custom-purple-1 rounded-2xl flex-row items-center gap-3">
        <Ionicons name={icon as any} size={20} color={"#5e7dbd"} />
        <View className="h-[35%] bg-custom-purple-1" style={{ width: 1 }} />
        <MultipleSelectList
          setSelected={(values: string) => setSelected(values)}
          data={data}
          save={value}
          label={label}
          search={isSearched}
          placeholder={placeholder}
          arrowicon={
            <Ionicons name="chevron-down" size={20} color={"#5e7dbd"} />
          }
          boxStyles={{
            borderRadius: 8,
            borderColor: "transparent",
            backgroundColor: "transparent",
            paddingHorizontal: 0,
            paddingVertical: 5,
            width: width - 20,
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            top: 5,
          }}
          fontFamily="Josefin"
          inputStyles={{
            color: "black",
          }}
          dropdownStyles={{
            borderRadius: 8,
            borderColor: "transparent",
            backgroundColor: "transparent",
            paddingHorizontal: 0,
            marginHorizontal: 0,
          }}
          dropdownItemStyles={{
            paddingHorizontal: 0,
            paddingVertical: 5,
          }}
          dropdownTextStyles={{
            color: "#5e7dbd",
          }}
          checkBoxStyles={{
            borderColor: "#5e7dbd",
          }}
          badgeStyles={{
            borderRadius: 10,
            backgroundColor: "#5e7dbd",
            paddingVertical: 4,
          }}
        />
      </View>
    </View>
  );
};
