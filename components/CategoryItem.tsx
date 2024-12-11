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
      className={`mx-2 items-center rounded-2xl bg-custom-grey-1 `}
      onPress={handlePress}
    >
      <View className={`p-4 flex-row items-center gap-3 w-full`}>
        <View
          className={`${item.color} p-2 rounded-2xl items-center justify-center`}
          style={{
            width: 50,
            height: 50,
          }}
        >
          <Ionicons name={item.icon as any} size={30} color={"white"} />
        </View>
        <View>
          <Text className="font-josefin-bold">{item.name}</Text>
          <Text className="font-josefin text-sm">{item.desc}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CategoryItem;
