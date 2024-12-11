import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import { CustomInput } from "./CustomInput";

interface FormData {
  name?: string;
  lesson?: string;
  description?: string;
}

interface ProgressFormProps {
  onPress: (active: string) => void;
  value: FormData;
  onChange: (name: string, value: string) => void;
  onSubmit: () => void;
}
export const ProgressForm: React.FC<ProgressFormProps> = ({
  onPress,
  value,
  onChange,
  onSubmit,
}) => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className="gap-3">
        <Text className="font-josefin text-black text-justify">
          Isi formulir di bawah ini untuk memperbarui perkembangan kasus yang
          sedang ditangani.
        </Text>
        <View>
          <CustomInput
            placeholder="Masukkan Nama"
            value={value.name!}
            onChange={(text) => onChange("name", text)}
            icon={"text-outline"}
            title="Nama"
          />
          <CustomInput
            placeholder="Masukkan Perkembangan"
            value={value.description!}
            onChange={(text) => onChange("description", text)}
            icon={"extension-puzzle-outline"}
            title="Perkembangan"
            multiline={true}
          />
          <Pressable
            onPress={onSubmit}
            className="p-3 rounded-xl items-center justify-center bg-custom-purple-1"
          >
            <Text className="font-josefin-bold text-white">Submit</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
