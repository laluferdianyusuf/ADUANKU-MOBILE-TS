import {
  BackButton,
  Items,
  LoadingWave,
  CustomModal,
  SearchButton,
} from "@/components";
import { EmptyItems } from "@/components/EmptyItems";
import { ThemedView } from "@/components/ThemedView";
import { useComplaintData } from "@/hooks/useComplaintData";
import { useNoteData } from "@/hooks/useNoteData";
import { useUserData } from "@/hooks/useUserData";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

interface ProgressScreenProps {}

export const ProgressScreen: React.FC<ProgressScreenProps> = () => {
  const [showModal, setShowModal] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<string>("ProgressList");
  const { user, validateUser } = useUserData({});
  const {
    complaintsProgress,
    validateProgressComplaints,
    error,
    success,
    isLoading,
  } = useComplaintData({ id: user.id || 0, user: user });

  const handleActiveModal = (active: string) => {
    setActiveModal(active);
  };

  const {
    notes,
    validatedNoteData,
    isLoading: notesLoading,
    handleChangeField,
    handleSubmitNote,
    field,
  } = useNoteData({
    id: showModal || 0,
    handleModal: handleActiveModal,
  });

  useEffect(() => {
    validateUser();
  }, []);

  useEffect(() => {
    validateProgressComplaints();
  }, [user?.id]);

  useEffect(() => {
    if (showModal) {
      validatedNoteData();
    }
  }, [showModal]);

  const handleModal = (item: number) => {
    setShowModal(item);
  };

  const closeModal = () => {
    setShowModal(null);
    setActiveModal("ProgressList");
  };

  return (
    <ThemedView className={`flex-1`}>
      <View className="pt-16 pb-10 px-6 flex-1">
        <View className="flex-row items-center justify-between pb-4">
          <BackButton onBack={() => router.back()} />
          <Text className="font-josefin text-xl">Perkembangan</Text>
          <SearchButton isWhat="isProgress" />
        </View>
        {isLoading ? (
          <LoadingWave />
        ) : complaintsProgress.length > 0 ? (
          <View>
            <FlatList
              data={complaintsProgress}
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
                  isProgress={true}
                  user={user}
                />
              )}
              keyExtractor={(item) => item.id!.toString()}
              contentContainerClassName="gap-4 pb-5"
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <EmptyItems icon={"analytics-outline"} text="tidak ada pengaduan" />
        )}
      </View>

      <CustomModal
        value={field}
        onChange={handleChangeField}
        onSubmit={handleSubmitNote}
        closeModal={closeModal}
        items={notes}
        itemsLoading={notesLoading}
        showModal={showModal}
        emptyText="Belum ada perkembangan"
        emptyIcon={"document-text-outline"}
        title="Perkembangan"
        user={user}
        isProgress={true}
        activeModal={activeModal}
        handleActiveModal={handleActiveModal}
      />
    </ThemedView>
  );
};
