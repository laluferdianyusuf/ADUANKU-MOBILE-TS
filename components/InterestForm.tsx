import { View, Text, Pressable } from "react-native";
import React from "react";
import { CustomInput } from "./CustomInput";
import { ScrollView } from "react-native";

interface FormData {
  name?: string;
  lesson?: string;
  description?: string;
}

interface InterestFormProps {
  onPress: (active: string) => void;
  value: FormData;
  onChange: (name: string, value: string) => void;
  onSubmit: () => void;
}
export const InterestForm: React.FC<InterestFormProps> = ({
  value,
  onPress,
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
          Isi formulir di bawah ini untuk memilih minat pelatihan yang sesuai
          dengan kebutuhan Anda. Pilihan Anda akan membantu kami menyediakan
          pelatihan yang relevan dan bermanfaat.
        </Text>
        <View>
          <CustomInput
            placeholder="Masukkan minat"
            value={value.lesson! || ""}
            icon={"bonfire-outline"}
            onChange={(text) => onChange("lesson", text)}
            errorMessage=""
            title="Minat Pelatihan"
            background="bg-white"
          />
          <Pressable
            onPress={onSubmit}
            className="bg-custom-purple-1 items-center justify-center p-3 rounded-xl"
          >
            <Text className="font-josefin-bold text-white">Submit</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
