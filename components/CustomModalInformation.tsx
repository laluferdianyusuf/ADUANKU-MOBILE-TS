import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { CustomInput } from "./CustomInput";

interface FieldProps {
  title: string;
  descriptions: string;
}

interface CustomModalInfProps {
  showModal: boolean;
  closeModal: () => void;
  onChange: (name: string, value: string) => void;
  onSubmit: () => void;
  item: FieldProps;
  isLoading: boolean;
}

export const CustomModalInformation: React.FC<CustomModalInfProps> = ({
  closeModal,
  showModal,
  item,
  onChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <Modal
      visible={!!showModal}
      transparent={true}
      animationType="slide"
      onRequestClose={closeModal}
      statusBarTranslucent
    >
      <View className="flex-1">
        <Pressable
          onPress={closeModal}
          className=" justify-end flex-1"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        >
          <View
            className="pt-8 pb-4 px-6 gap-5 bg-white h-4/5 rounded-t-2xl z-50"
            onStartShouldSetResponder={() => true}
          >
            <View className="w-12 h-[5px] bg-custom-grey-2 rounded-full self-center" />
            <View className="flex-row items-center justify-between">
              <Text className="font-josefin-bold capitalize text-lg">
                Tambah Informasi Baru
              </Text>
              <Pressable onPress={closeModal} className="">
                <Ionicons name="close" size={25} color={"black"} />
              </Pressable>
            </View>
            <Text className="font-josefin text-justify">
              Masukkan detail informasi yang ingin ditambahkan. Pastikan semua
              kolom telah diisi dengan benar sebelum mengirimkan.
            </Text>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View>
                <CustomInput
                  placeholder="Masukkan nama atau judul informasi."
                  value={item.title}
                  title="Judul Informasi"
                  onChange={(text) => onChange("title", text)}
                  icon={"pencil-outline"}
                />
                <CustomInput
                  placeholder="Berikan deskripsi singkat terkait informasi."
                  value={item.descriptions}
                  title="Deskripsi"
                  onChange={(text) => onChange("descriptions", text)}
                  icon={"reorder-three-outline"}
                  multiline={true}
                />
                <Pressable
                  onPress={onSubmit}
                  className="p-3 rounded-xl bg-custom-purple-1 items-center"
                  disabled={isLoading}
                >
                  <Text className="font-josefin-bold text-white">
                    {isLoading ? "Loading..." : "Submit"}
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </Pressable>
      </View>
    </Modal>
  );
};
