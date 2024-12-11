import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

interface ItemProps {
  id: string;
  name: string;
  data: string | string[];
  title: string;
  icon: any;
  multiline?: boolean;
}
interface DetailListProps {
  title: string;
  item: ItemProps;
  onPress: (id: number) => void;
  icon: any;
}

export const DetailList: React.FC<DetailListProps> = ({
  title,
  item,
  onPress,
  icon,
}) => {
  const truncateAfterWords = (text: string, wordLimit: number) => {
    const words = text?.split(" ");
    return words?.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  const { colors } = useTheme();

  return (
    <View>
      <View
        className={`${
          item.name === "chronology"
            ? ""
            : "flex-row items-center justify-between"
        }`}
      >
        <View className="flex-row flex-1 items-center gap-3">
          <Ionicons name={icon} size={20} color={"black"} />
          <Text className="font-josefin" numberOfLines={1} ellipsizeMode="tail">
            {truncateAfterWords(title, 2)}
          </Text>
        </View>
        <View className="flex-1">
          <Text
            className={`${
              item.name === "chronology" ? "ps-9" : ""
            } font-josefin text-justify`}
          >
            {Array.isArray(item.data)
              ? item.data.join(" - ")
              : item.data || "complaint name"}
          </Text>
        </View>
      </View>
    </View>
  );
};
