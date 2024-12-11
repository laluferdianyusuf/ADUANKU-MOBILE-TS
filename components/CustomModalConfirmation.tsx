import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, Text, View } from "react-native";

interface CustomModalConfirmationProps {
  showModal: number | boolean | null;
  closeModal: () => void;
  onPress: () => void;
  title: string;
  icon: any;
  isLoading: boolean;
  isLoggedOut?: boolean;
  confirm?: string;
}

export const CustomModalConfirmation: React.FC<
  CustomModalConfirmationProps
> = ({
  showModal,
  closeModal,
  onPress,
  title,
  icon,
  isLoading,
  isLoggedOut,
  confirm,
}) => {
  return (
    <Modal
      visible={!!showModal}
      transparent={true}
      animationType="slide"
      onRequestClose={closeModal}
      statusBarTranslucent
    >
      <Pressable
        onPress={closeModal}
        className="flex-1 justify-end"
        style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      >
        <View
          className="pt-8 pb-4 px-6 gap-5 bg-white h-1/2 rounded-t-2xl z-50"
          onStartShouldSetResponder={() => true}
        >
          <View className="w-12 h-[5px] bg-custom-grey-2 rounded-full self-center" />
          <View className="flex-row items-center self-end">
            <Pressable onPress={closeModal}>
              <Ionicons name="close" size={25} color={"black"} />
            </Pressable>
          </View>
          <Text className="capitalize font-josefin-bold text-custom-grey-2 text-2xl text-center">
            {title}
          </Text>
          <View className="flex-1 items-center justify-center gap-5 ">
            <Ionicons name={icon} size={170} color={"#ededed"} />
            <View className="flex-row ">
              <Pressable className="p-3 flex-1 self-end" onPress={closeModal}>
                <Text className="font-josefin text-custom-black-1 text-center">
                  Kembali
                </Text>
              </Pressable>
              <Pressable
                disabled={isLoading}
                className="p-3 flex-1 self-end"
                onPress={onPress}
              >
                <Text
                  className={`font-josefin ${
                    confirm ? "text-custom-info-2" : "text-custom-error-2"
                  }  text-center`}
                >
                  {isLoading
                    ? "Loading..."
                    : isLoggedOut
                    ? "Keluar"
                    : confirm
                    ? confirm
                    : "Hapus"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};
