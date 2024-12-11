import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { formatDate, formatTime } from "@/utils/datetime";
import { User } from "@/types/types";
interface ItemsCategory {
  id: number;
  name: string;
  case: string;
  status: string;
  created: string;
  loc: string;
}

interface ItemsProps {
  item: ItemsCategory;
  onPress: () => void;
  isHistory?: boolean;
  isProgress?: boolean;
  user?: User;
}

export const Items: React.FC<ItemsProps> = ({
  item,
  onPress,
  isHistory = false,
  isProgress = false,
  user,
}) => {
  const { colors } = useTheme();

  return (
    <View className={`pb-2 border-b border-custom-grey-1`}>
      <View className={`flex-row items-center gap-3 w-full justify-between`}>
        <View
          className={`${
            isHistory || isProgress ? "flex-row items-center gap-3" : ""
          }`}
        >
          <Text className="font-josefin-bold capitalize text-md">
            {item.name}
          </Text>
          {isHistory && !isProgress ? (
            <>
              <Text className={`font-josefin`}>-</Text>
              <Pressable
                className="flex-row items-center justify-center gap-1 px-2 rounded-md"
                onPress={onPress}
              >
                <Text className="font-josefin capitalize text-sm">minat</Text>
                <Ionicons name="bonfire-outline" size={10} color={"#de5757"} />
              </Pressable>
            </>
          ) : isProgress && !isHistory ? (
            <>
              <Text className={`font-josefin`}>-</Text>
              <Pressable
                className="flex-row items-center justify-center gap-1 px-2 rounded-md"
                onPress={onPress}
              >
                <Text className="font-josefin capitalize text-sm">
                  perkembangan
                </Text>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={10}
                  color={"#47a855"}
                />
              </Pressable>
            </>
          ) : null}
        </View>
        <View
          className={`${
            item.status === "complaint is processing"
              ? "bg-custom-info-1"
              : item.status === "complaint is waiting"
              ? "bg-custom-indigo-1"
              : "bg-custom-success-1"
          } items-center justify-center px-3 py-1 flex-row rounded-md`}
        >
          <Text className="font-josefin capitalize text-xs">
            {item.status === "complaint is waiting"
              ? "menunggu"
              : item.status === "complaint is processing"
              ? "diproses"
              : "selesai"}
          </Text>
        </View>
      </View>
      <Text className="font-josefin capitalize">
        {item.case} - {item.loc}
      </Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="flex-row items-center gap-1">
            <Ionicons name="today-outline" size={10} />
            <Text className="font-josefin text-xs">
              {formatDate(item.created).split(",")[0]}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="calendar-outline" size={10} />
            <Text className="font-josefin text-xs">
              {formatDate(item.created).split(",")[1]}
            </Text>
          </View>
          {/* <View className="flex-row items-center gap-1">
            <Ionicons name="alarm-outline" size={10} />
            <Text className="font-josefin text-xs">
              {formatTime(item.created.slice(11, 18))}
            </Text>
          </View> */}
        </View>
        <View className="flex-row items-center gap-3">
          {isHistory ||
            (!isProgress && (
              <Pressable
                className="px-2 flex-row gap-2 items-center"
                onPress={onPress}
              >
                <Text
                  className={`text-sm font-josefin text-custom-error-2 capitalize`}
                >
                  hapus
                </Text>
              </Pressable>
            ))}
          <Pressable
            className="px-2 flex-row items-center gap-2"
            onPress={() =>
              router.push({
                pathname: "/(screens)/details",
                params: {
                  id: item.id,
                },
              })
            }
          >
            <Text className="text-sm font-josefin text-custom-info-2 capitalize">
              detail
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
