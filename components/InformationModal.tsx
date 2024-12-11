import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, Text, View } from "react-native";

interface InformationModalProps {
  selectedModal: number | null;
  closeModal: () => void;
  title?: string;
  descriptions?: string;
}

export const InformationModal: React.FC<InformationModalProps> = ({
  selectedModal,
  closeModal,
  title,
  descriptions,
}) => {
  return (
    <Modal
      visible={!!selectedModal}
      transparent={true}
      animationType="slide"
      onRequestClose={closeModal}
    >
      <View
        className="pt-8 pb-4 px-6 gap-5 bg-white h-4/5 rounded-t-2xl z-50"
        onStartShouldSetResponder={() => true}
      >
        <View className="flex-row items-center justify-between">
          <Text className="font-josefin-bold capitalize text-lg">
            Informasi
          </Text>
          <Pressable onPress={closeModal} className="">
            <Ionicons name="close" size={25} color={"black"} />
          </Pressable>
        </View>
        <View className="flex-1 bg-white">
          <Text className="font-josefin-bold text-2xl capitalize">
            {title || ""}
          </Text>
          <Text className="font-josefin text-justify">
            {descriptions || ""}
          </Text>
        </View>
      </View>
    </Modal>
  );
};
