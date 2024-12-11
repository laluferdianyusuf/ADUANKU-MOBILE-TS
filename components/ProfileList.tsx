import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

interface ProfileListCategory {
  id: string;
  title: string;
  icon: any;
  background: string;
  uri: string;
}

interface ItemsProps {
  item: ProfileListCategory;
  onPress: () => void;
}

export const ProfileList: React.FC<ItemsProps> = ({ item, onPress }) => {
  return (
    <View className="" key={item.id}>
      <Pressable
        className="flex-row items-center justify-between"
        onPress={onPress}
      >
        <View className="flex-row gap-6 items-center">
          <View className={`${item.background} p-2 rounded-lg`}>
            <Ionicons name={item.icon} size={25} color={"white"} />
          </View>
          <Text className="font-josefin font-md">{item.title}</Text>
        </View>
        <View className="">
          <Ionicons name="chevron-forward-outline" size={25} color={"black"} />
        </View>
      </Pressable>
    </View>
  );
};
