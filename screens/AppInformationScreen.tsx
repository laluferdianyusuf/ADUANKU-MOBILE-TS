import { BackButton, SearchButton } from "@/components";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

interface AppInformationScreenProps {}

export const AppInformationScreen: React.FC<AppInformationScreenProps> = () => {
  return (
    <ThemedView className={`flex-1`}>
      <View className="pt-16 pb-10 px-6">
        <View className="flex-row items-center justify-between pb-4">
          <BackButton onBack={() => router.back()} />
          <Text className="font-josefin text-xl">Informasi Aplikasi</Text>
          <SearchButton style="opacity-0" isDisabled={true} />
        </View>
      </View>
    </ThemedView>
  );
};
