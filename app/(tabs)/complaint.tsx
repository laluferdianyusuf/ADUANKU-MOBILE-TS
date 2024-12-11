import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, FlatList } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import {
  CustomModalConfirmation,
  Items,
  LoadingWave,
  SearchButton,
} from "@/components";
import { useUserData } from "@/hooks/useUserData";
import { useCallback, useState } from "react";
import { useComplaintData } from "@/hooks/useComplaintData";
import { useFocusEffect } from "expo-router";
import { EmptyItems } from "@/components/EmptyItems";

export default function TabTwoScreen() {
  const { user, validateUser } = useUserData({});
  const [selectedModal, setSelectedModal] = useState<number | null>(null);
  useFocusEffect(
    useCallback(() => {
      validateUser();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      validateProcessingComplaints();
    }, [user?.id])
  );

  const handleShowModal = (id: number) => {
    setSelectedModal(id);
  };

  const closeModal = () => {
    setSelectedModal(null);
  };

  const {
    complaintsProcess,
    validateProcessingComplaints,
    isLoading,
    deleteComplaintById,
  } = useComplaintData({
    id: user.id || 0,
    user: user,
    complaintId: Number(selectedModal),
    closeModal: closeModal,
  });

  return (
    <ThemedView className={`flex-1`}>
      <View className="pt-16 pb-10 px-6 flex-1">
        <View className="flex-row items-center gap-3 pb-4">
          {/* <Text className="text-2xl mb-4 flex-1 font-josefin-bold text-custom-purple-1">
            Solvo
          </Text> */}
          <View className="flex-1">
            <Text className=" font-josefin-bold text-custom-purple-1 text-2xl">
              Aduanku
            </Text>
            <Text className="font-josefin-bold text-custom-purple-1 text-xs">
              by TPDCOM
            </Text>
          </View>
          <SearchButton isWhat="isProcess" />
        </View>
        {isLoading ? (
          <LoadingWave />
        ) : complaintsProcess.length > 0 ? (
          <View>
            <FlatList
              data={complaintsProcess}
              renderItem={({ item }) => (
                <Items
                  item={{
                    id: item.id || 0,
                    name: item.complaintName || "No Name",
                    case: item.caseType?.[0] || "Unknown Case",
                    created: item.createdAt || "Unknown Date",
                    loc: item.caseViolence?.[0] || "Unknown Location",
                    status: item.status || "Unknown Status",
                  }}
                  onPress={() => handleShowModal(item.id || 0)}
                />
              )}
              keyExtractor={(item) => item.id!.toString()}
              contentContainerClassName="gap-4 pb-5"
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <EmptyItems
            icon={"document-text-outline"}
            text="tidak ada pengaduan"
          />
        )}
      </View>

      <CustomModalConfirmation
        closeModal={closeModal}
        onPress={deleteComplaintById}
        showModal={selectedModal}
        title="Apakah anda yakin ?"
        icon={"trash-outline"}
        isLoading={isLoading}
      />
    </ThemedView>
  );
}
