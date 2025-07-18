import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Category } from "@/types/types";

interface CategoryItemProps {
  item: Category;
  handlePress: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item, handlePress }) => {
  const { colors } = useTheme();

  return (
    <Pressable
      className={`rounded-3xl items-center justify-center border border-gray-100 flex-1 bg-custom-grey-1 `}
      onPress={handlePress}
    >
      <View className={`p-4 py-6 items-center gap-3 flex-col `}>
        <View
          className={`${item.color} w-20 h-20 p-2 rounded-2xl items-center justify-center`}
        >
          <Ionicons name={item.icon as any} size={30} color={"white"} />
        </View>
        <View>
          <Text className="font-josefin-bold text-center">{item.name}</Text>
          <Text className="font-josefin text-sm text-center">{item.desc}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CategoryItem;
