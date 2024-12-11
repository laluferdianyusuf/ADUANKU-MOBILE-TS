import {
  BackButton,
  CustomModal,
  Items,
  LoadingWave,
  SearchButton,
} from "@/components";
import { EmptyItems } from "@/components/EmptyItems";
import { ThemedView } from "@/components/ThemedView";
import { useComplaintData } from "@/hooks/useComplaintData";
import { useSkillsData } from "@/hooks/useSkillsData";
import { useUserData } from "@/hooks/useUserData";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

interface HistoryScreenProps {}

export const HistoryScreen: React.FC<HistoryScreenProps> = () => {
  const [showModal, setShowModal] = useState<number | null>(null);
  const { user, validateUser } = useUserData({});
  const { complaintsDone, validateDoneComplaints, error, success, isLoading } =
    useComplaintData({ id: user.id || 0, user: user });

  const { handleChangeField, handleSubmitInterest, field } = useSkillsData({
    id: showModal || 0,
    userId: user.id || 0,
  });
  useEffect(() => {
    validateUser();
  }, []);

  useEffect(() => {
    validateDoneComplaints();
  }, [user?.id]);

  const handleModal = (item: number) => {
    setShowModal(item);
  };

  const closeModal = () => {
    setShowModal(null);
  };
  return (
    <ThemedView className={`flex-1`}>
      <View className="pt-16 pb-10 px-6 flex-1">
        <View className="flex-row items-center justify-between pb-4">
          <BackButton onBack={() => router.back()} />
          <Text className="font-josefin text-2xl">Riwayat</Text>
          <SearchButton isWhat="isHistory" />
        </View>
        {isLoading ? (
          <LoadingWave />
        ) : complaintsDone.length > 0 ? (
          <View>
            <FlatList
              data={complaintsDone}
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
                  onPress={() => handleModal(item.id!)}
                  isHistory={true}
                />
              )}
              keyExtractor={(item) => item.id!.toString()}
              contentContainerClassName="gap-4 pb-5"
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <EmptyItems icon={"time-outline"} text="tidak ada pengaduan" />
        )}
      </View>
      <CustomModal
        onChange={handleChangeField}
        onSubmit={handleSubmitInterest}
        value={field}
        closeModal={closeModal}
        showModal={showModal}
        emptyText="Belum ada minat"
        emptyIcon={"document-text-outline"}
        title="Minat Pelatihan"
        user={user}
        isHistory={true}
      />
    </ThemedView>
  );
};
