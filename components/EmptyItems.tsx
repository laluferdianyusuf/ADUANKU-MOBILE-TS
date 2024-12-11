import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface EmptyItemProps {
  icon: any;
  text: string;
}

export const EmptyItems: React.FC<EmptyItemProps> = ({ icon, text }) => {
  return (
    <View className="flex-1 justify-center items-center gap-5">
      <Ionicons name={icon} size={55} color={"#b1bcbd"} />
      <Text className="font-josefin capitalize  text-custom-grey-2">
        {text}
      </Text>
    </View>
  );
};
