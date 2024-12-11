import React from "react";
import { View } from "react-native";

export const Loading: React.FC<{}> = () => {
  return (
    <View className="flex flex-row gap-2">
      <View className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></View>
      <View className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></View>
      <View className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.5s]"></View>
    </View>
  );
};
