import { BackButton, CustomInput, SearchButton } from "@/components";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

interface ChangePasswordProps {}

export const ChangePasswordScreen: React.FC<ChangePasswordProps> = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [reTypePassword, setReTypePassword] = useState<string>("");

  const handleChangePassword = () => {
    try {
      console.log("berhasil");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ThemedView className={`flex-1`}>
      <View className="pt-16 pb-6 px-6 flex-1">
        <View className="flex-row items-center justify-between pb-4">
          <BackButton onBack={() => router.back()} />
          <Text className="font-josefin text-xl">Ganti Password</Text>
          <SearchButton style="opacity-0" isDisabled={true} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Text className="text-justify font-josefin text-custom-black-1">
            Fungsionalitas perubahan kata sandi adalah proses aman yang
            dirancang untuk memungkinkan Anda memperbarui kata sandi saat ini
            dengan memverifikasi identitas Anda dan memastikan kata sandi baru
            memenuhi kriteria yang diperlukan.
          </Text>
          <View className="mt-5 flex-1">
            <View>
              <Text className="font-josefin text-custom-black-1">
                Password Sekarang
              </Text>
              <CustomInput
                icon={"lock-open-outline"}
                placeholder="password sekarang"
                isPassword={true}
                onChange={(text) => setCurrentPassword(text)}
                value={currentPassword}
                border="border-custom-grey-3"
                background="bg-custom-grey-3"
                paddingHorizontal="py-2"
                paddingVertical="px-5"
                activeBorder="border-custom-purple-1"
              />
            </View>
            <View>
              <Text className="font-josefin text-custom-black-1">
                Password Baru
              </Text>
              <CustomInput
                icon={"lock-closed-outline"}
                placeholder="password baru"
                isPassword={true}
                onChange={(text) => setPassword(text)}
                value={password}
                border="border-custom-grey-3"
                background="bg-custom-grey-3"
                paddingHorizontal="py-2"
                paddingVertical="px-5"
                activeBorder="border-custom-purple-1"
              />
              <CustomInput
                icon={"repeat"}
                placeholder="ketik ulang password"
                isPassword={true}
                onChange={(text) => setReTypePassword(text)}
                value={reTypePassword}
                border="border-custom-grey-3"
                background="bg-custom-grey-3"
                paddingHorizontal="py-2"
                paddingVertical="px-5"
                activeBorder="border-custom-purple-1"
              />
            </View>
          </View>
          <Pressable
            onPress={handleChangePassword}
            className="py-5 justify-center items-center rounded-xl bg-custom-purple-1"
          >
            <Text className="font-josefin text-white">Simpan</Text>
          </Pressable>
        </ScrollView>
      </View>
    </ThemedView>
  );
};
