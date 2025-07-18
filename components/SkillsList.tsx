import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";

interface SkillsListCategory {
  id: number;
  name: string;
  description: any;
  date: string;
}

interface SkillListProps {
  item: SkillsListCategory;
  index: number;
  total: number;
}

export const SkillList: React.FC<SkillListProps> = ({ item, index, total }) => {
  const { colors } = useTheme();

  return (
    <View
      key={item.id}
      className={`items-center py-2 ${
        index % 2 ? "bg-custom-purple-3" : ""
      } border-x border-custom-purple-3 ${
        index + 1 === total ? "rounded-b-xl" : ""
      } `}
    >
      <View className={`flex-row items-center gap-5 p-2`}>
        <Text className="font-josefin flex-1 text-center capitalize">
          {item.name}
        </Text>
        <Text className="font-josefin flex-1 text-center capitalize">
          {item.description}
        </Text>
      </View>
    </View>
  );
};
