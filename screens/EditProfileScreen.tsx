import { BackButton, SearchButton } from "@/components";
import { ThemedView } from "@/components/ThemedView";
import { useUserData } from "@/hooks/useUserData";
import { User } from "@/types/types";
import { formatDate } from "@/utils/datetime";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface EditScreenProps {
  id?: number;
  item?: User;
}

export const EditProfileScreen: React.FC<EditScreenProps> = ({ id, item }) => {
  const { handleChangeField, isLoading, saveChanges, fields } = useUserData({
    id: Number(id),
  });

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isGenderPickerVisible, setGenderPickerVisible] =
    useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setSelectedDate(selectedDate);
      handleChangeField("birthday", selectedDate.toISOString());
    }
  };

  const handleGenderSelect = (gender: string) => {
    handleChangeField("gender", gender);
    setGenderPickerVisible(false);
    setSelectedGender(gender);
  };

  return (
    <ThemedView className={`flex-1`}>
      <View className="pt-16 pb-6 px-6 flex-1">
        <View className="flex-row items-center justify-between pb-4">
          <BackButton onBack={() => router.back()} />
          <Text className="font-josefin text-xl">Edit Profil</Text>
          <SearchButton style="opacity-0" isDisabled={true} />
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerClassName="gap-12 justify-center"
        >
          <View className="flex-1">
            <View>
              <View className="flex-row items-center gap-4 py-8">
                <View className="p-3 bg-custom-purple-2 self-start items-center rounded-full">
                  <AntDesign name="user" size={45} color={"white"} />
                </View>
                <View className="flex-1">
                  <TextInput
                    onChangeText={(text) => handleChangeField("name", text)}
                    keyboardType={"default"}
                    placeholder={item?.name || "LOREM, IPSUM DOLOR."}
                    placeholderTextColor={"#b1bcbd"}
                    style={{
                      fontFamily: "Josefin",
                      color: "black",
                    }}
                    className={`font-josefin-bold text-xl`}
                    value={fields.name}
                    numberOfLines={1}
                  />
                  <View className="h-[2px] bg-custom-grey-1" />
                  <TextInput
                    onChangeText={(text) => handleChangeField("username", text)}
                    keyboardType={"default"}
                    placeholder={item?.username || "Username"}
                    placeholderTextColor={"#b1bcbd"}
                    style={{
                      fontFamily: "Josefin",
                      color: "#b1bcbd",
                    }}
                    className={`font-josefin text-custom-grey-2`}
                    value={fields.username}
                  />
                </View>
              </View>
            </View>
            <View className="gap-10">
              <View className="flex-row gap-10 items-center">
                <View className="w-1/6">
                  <Text className="text-custom-grey-2 font-josefin">Email</Text>
                </View>
                <View className="flex-1">
                  <TextInput
                    onChangeText={(text) => handleChangeField("email", text)}
                    keyboardType={"email-address"}
                    placeholder={item?.email || "contoh@gmail.com"}
                    placeholderTextColor={"#b1bcbd"}
                    style={{
                      fontFamily: "Josefin",
                      color: "black",
                    }}
                    className={`font-josefin text-custom-grey-2`}
                    value={fields.email}
                  />
                  <View className="h-[2px] bg-custom-grey-1 " />
                </View>
              </View>
              <View className="flex-row gap-10 items-center">
                <View className="w-1/6">
                  <Text className="text-custom-grey-2 font-josefin">
                    Alamat
                  </Text>
                </View>
                <View className="flex-1">
                  <TextInput
                    onChangeText={(text) => handleChangeField("address", text)}
                    keyboardType={"default"}
                    placeholder={item?.address || "Jln. xxxxx, No. xx"}
                    placeholderTextColor={"#b1bcbd"}
                    style={{
                      fontFamily: "Josefin",
                      color: "black",
                    }}
                    className={`font-josefin text-custom-grey-2`}
                    value={fields.address}
                  />
                  <View className="h-[2px] bg-custom-grey-1 " />
                </View>
              </View>
              <View className="flex-row gap-10 items-center">
                <View className="w-1/6">
                  <Text className="text-custom-grey-2 font-josefin">
                    Tanggal Lahir
                  </Text>
                </View>
                <View className="flex-1">
                  <Pressable
                    onPress={() => setShowDatePicker(true)}
                    className="py-2"
                  >
                    {item?.birthday || selectedDate ? (
                      <Text className="text-custom-grey-2 font-josefin">
                        {selectedDate
                          ? formatDate(selectedDate.toISOString())
                          : formatDate(String(item?.birthday))}
                      </Text>
                    ) : (
                      <Text className="font-josefin">Pilih Tanggal</Text>
                    )}
                  </Pressable>
                  {showDatePicker && (
                    <DateTimePicker
                      value={
                        fields.birthday ? new Date(fields.birthday) : new Date()
                      }
                      mode="date"
                      display="default"
                      onChange={handleDateChange}
                    />
                  )}
                  <View className="h-[2px] bg-custom-grey-1 " />
                </View>
              </View>
              <View className="flex-row gap-10 items-center">
                <View className="w-1/6">
                  <Text className="text-custom-grey-2 font-josefin">
                    Jenis Kelamin
                  </Text>
                </View>
                <Pressable
                  onPress={() => setGenderPickerVisible(true)}
                  className="flex-1"
                >
                  <Text
                    className={`font-josefin ${
                      item?.gender ? "text-custom-grey-2" : "text-black"
                    }`}
                  >
                    {selectedGender === "male"
                      ? "Laki - laki"
                      : selectedGender === "female"
                      ? "Perempuan"
                      : item?.gender === "male"
                      ? "Laki - laki"
                      : "Perempuan"}
                  </Text>
                  <View className="h-[2px] bg-custom-grey-1 " />
                </Pressable>
              </View>
              <View className="flex-row gap-10 items-center">
                <View className="w-1/6">
                  <Text className="text-custom-grey-2 font-josefin">
                    Telpon
                  </Text>
                </View>
                <View className="flex-1">
                  <TextInput
                    onChangeText={(text) =>
                      handleChangeField("phoneNumber", text)
                    }
                    keyboardType={"number-pad"}
                    placeholder={item?.phoneNumber || "+123456789"}
                    placeholderTextColor={"#b1bcbd"}
                    style={{
                      fontFamily: "Josefin",
                      color: "black",
                    }}
                    className={`font-josefin text-custom-grey-2`}
                    value={fields.phoneNumber}
                  />
                  <View className="h-[2px] bg-custom-grey-1 " />
                </View>
              </View>
            </View>
          </View>
          <View className="">
            <Pressable
              className="bg-custom-purple-1 rounded-xl py-4"
              onPress={saveChanges}
              disabled={isLoading}
            >
              <Text className="font-josefin text-white text-center">
                {isLoading ? "Loading..." : "Simpan"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      {isGenderPickerVisible && (
        <Modal transparent={true} animationType="slide" statusBarTranslucent>
          <View
            className="flex-1 justify-center items-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <View className="bg-white p-6 rounded-lg">
              <Text className="font-josefin text-lg mb-4">
                Pilih Jenis Kelamin
              </Text>
              <Pressable
                onPress={() => handleGenderSelect("male")}
                className="py-2"
              >
                <Text className="font-josefin">Laki - laki</Text>
              </Pressable>
              <Pressable
                onPress={() => handleGenderSelect("female")}
                className="py-2"
              >
                <Text className="font-josefin">Perempuan</Text>
              </Pressable>
              <Pressable
                onPress={() => setGenderPickerVisible(false)}
                className="mt-4 bg-custom-purple-1 py-2 rounded-lg"
              >
                <Text className="text-white text-center font-josefin">
                  Tutup
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </ThemedView>
  );
};
