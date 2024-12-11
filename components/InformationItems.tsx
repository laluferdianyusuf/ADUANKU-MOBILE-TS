import React from "react";
import { View, Text, Pressable } from "react-native";
import { User } from "@/types/types";

interface InformationItemsCategory {
  id: number;
  title: string;
  description: string;
}

interface ItemsProps {
  item: InformationItemsCategory;
  onPress: () => void;
  onDelete: () => void;
  user: User;
}

export const InformationItems: React.FC<ItemsProps> = ({
  item,
  onPress,
  onDelete,
  user,
}) => {
  return (
    <View className="gap-2" key={item.id}>
      <View className="flex-row items-center justify-between">
        <Text className="font-josefin-bold text-2xl capitalize flex-1">
          {item.title}
        </Text>
        <View className="flex-row gap-3">
          {user.role === "admin" || user.role === "superadmin" ? (
            <Pressable
              onPress={onDelete}
              className="flex-row items-center gap-2"
            >
              <Text className="font-josefin capitalize text-custom-error-2">
                hapus
              </Text>
            </Pressable>
          ) : null}
          <Pressable onPress={onPress} className="flex-row items-center gap-2">
            <Text className="font-josefin capitalize text-custom-purple-1">
              detail
            </Text>
          </Pressable>
        </View>
      </View>
      <View className="h-[1px] bg-custom-grey-1" />
      <Text
        className="font-josefin text-justify"
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {item.description}
      </Text>
    </View>
  );
};
