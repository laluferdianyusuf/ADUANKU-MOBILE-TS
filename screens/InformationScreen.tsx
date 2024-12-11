import {
  BackButton,
  CustomModalConfirmation,
  CustomModalInformation,
  InformationItems,
  LoadingWave,
  SearchButton,
} from "@/components";
import { EmptyItems } from "@/components/EmptyItems";
import { InformationModal } from "@/components/InformationModal";
import { ThemedView } from "@/components/ThemedView";
import { useInformationData } from "@/hooks/useInformationData";
import { useUserData } from "@/hooks/useUserData";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

interface InformationScreenProps {}

export const InformationScreen: React.FC<InformationScreenProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedModal, setSelectedModal] = useState<number | null>(null);
  const [selectedDelete, setSelectedDelete] = useState<number | null>(null);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const { user, validateUser } = useUserData({});

  useEffect(() => {
    validateUser();
  }, []);

  useEffect(() => {
    if (selectedModal) {
      validateInformationById();
    }
  }, [selectedModal]);

  useEffect(() => {
    validateInformation();
  }, []);

  const handleSelectedModal = (item: number) => {
    setSelectedModal(item);
  };

  const closeSelectedModal = () => {
    setSelectedModal(null);
  };

  const handleSelectedDelete = (item: number) => {
    setSelectedDelete(item);
  };
  const closeSelectedDelete = () => {
    setSelectedDelete(null);
  };
  const {
    information,
    isLoading,
    validateInformation,
    fields,
    handleChangeInformation,
    handleSubmitInformation,
    isPressing,
    validateInformationById,
    informationDetails,
    deleteInformation,
  } = useInformationData({
    closeModal: closeModal,
    id: selectedModal || 0,
    closeModalDelete: closeSelectedDelete,
    deleteId: selectedDelete || 0,
  });

  return (
    <ThemedView className={`flex-1`}>
      <View className="pt-16 pb-10 px-6 flex-1">
        <View className="flex-row items-center justify-between pb-4">
          <BackButton onBack={() => router.back()} />
          <Text className="font-josefin text-2xl">Informasi</Text>

          <View className="flex-row items-center gap-2">
            <SearchButton isWhat="isInformation" />
            {user.role === "admin" || user.role === "superadmin" ? (
              <Pressable onPress={openModal}>
                <Ionicons name="add-outline" size={25} color={"black"} />
              </Pressable>
            ) : null}
          </View>
        </View>
        {isLoading ? (
          <LoadingWave />
        ) : information.length > 0 ? (
          <FlatList
            data={information}
            renderItem={({ item }) => (
              <InformationItems
                item={{
                  id: item.id ?? 0,
                  title: item.title!,
                  description: item.descriptions!,
                }}
                onPress={() => handleSelectedModal(item.id!)}
                onDelete={() => handleSelectedDelete(item.id!)}
                user={user}
              />
            )}
            contentContainerClassName="gap-4 pb-5"
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyItems icon={"information-outline"} text="tidak ada informasi" />
        )}
      </View>
      <CustomModalInformation
        isLoading={isPressing}
        closeModal={closeModal}
        showModal={showModal}
        item={fields}
        onChange={handleChangeInformation}
        onSubmit={handleSubmitInformation}
      />

      <InformationModal
        closeModal={closeSelectedModal}
        selectedModal={selectedModal}
        title={informationDetails.title}
        descriptions={informationDetails.descriptions}
      />

      <CustomModalConfirmation
        closeModal={closeSelectedDelete}
        icon={"trash-outline"}
        isLoading={isLoading}
        onPress={deleteInformation}
        showModal={selectedDelete}
        title="Apakah anda yakin ?"
      />
    </ThemedView>
  );
};
