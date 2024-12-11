import {
  BackButton,
  CustomModal,
  CustomModalConfirmation,
  InformationItems,
  Items,
  SearchBar,
} from "@/components";
import { EmptyItems } from "@/components/EmptyItems";
import { InformationModal } from "@/components/InformationModal";
import { ThemedView } from "@/components/ThemedView";
import { useComplaintData } from "@/hooks/useComplaintData";
import { useInformationData } from "@/hooks/useInformationData";
import { useNoteData } from "@/hooks/useNoteData";
import { useSearch } from "@/hooks/useSearch";
import { useSkillsData } from "@/hooks/useSkillsData";
import { useUserData } from "@/hooks/useUserData";
import { Complaint, User } from "@/types/types";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, TextInput, View } from "react-native";

interface SearchScreenProps {
  isWhat: string;
  id?: number;
  user?: User;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ isWhat }) => {
  const inputRef = useRef<TextInput>(null);
  const { user, validateUser } = useUserData({});
  const [selectedModal, setSelectedModal] = useState<number | null>(null);
  const [selectedDelete, setSelectedDelete] = useState<number | null>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<number | null>(
    null
  );
  const [showModalNote, setShowModalNote] = useState<number | null>(null);
  const [showModalInterest, setShowModalInterest] = useState<number | null>(
    null
  );
  const [activeModal, setActiveModal] = useState<string>("ProgressList");
  const [history, setHistory] = useState<boolean>(false);
  const [process, setProcess] = useState<boolean>(false);
  const { handleChangeField, handleSubmitInterest, field } = useSkillsData({
    id: showModalInterest || 0,
    userId: user.id || 0,
  });
  const handleActiveModal = (active: string) => {
    setActiveModal(active);
  };
  const {
    notes,
    validatedNoteData,
    isLoading: notesLoading,
    handleChangeField: handleChangeFieldNote,
    handleSubmitNote,
    field: fieldNote,
  } = useNoteData({
    id: showModalNote || 0,
    handleModal: handleActiveModal,
  });

  useEffect(() => {
    if (showModalNote) {
      validatedNoteData();
    }
  }, [showModalNote]);

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

  const handleShowModal = (item: Complaint) => {
    if (item.status === "complaint is done") {
      setHistory(true);
      setProcess(false);
      setShowModalInterest(item.id || 0);
    } else if (item.status === "complaint is processing") {
      setHistory(false);
      setProcess(true);
      setShowModalNote(item.id || 0);
    } else {
      setSelectedComplaint(item.id || 0);
    }
  };

  const closeModal = () => {
    setSelectedComplaint(null);
    setShowModalInterest(null);
    setShowModalNote(null);
  };

  const {
    allComplaints,
    complaintsDone,
    complaintsProcess,
    complaintsProgress,
    validateAllComplaints,
    validateProcessingComplaints,
    validateProgressComplaints,
    validateDoneComplaints,
    isLoading: isComplaintsLoading,
    deleteComplaintById,
  } = useComplaintData({
    id: user.id!,
    user: user,
    complaintId: Number(selectedComplaint),
    closeModal: closeModal,
  });

  const {
    information,
    isLoading,
    validateInformation,
    validateInformationById,
    informationDetails,
    deleteInformation,
  } = useInformationData({
    id: selectedModal || 0,
    closeModalDelete: closeSelectedDelete,
    deleteId: selectedDelete || 0,
  });

  const {
    filteredData,
    handleSearch,
    query,
    isLoading: isSearchLoading,
    handleClear,
  } = useSearch({
    isWhat: isWhat,
    allComplaints: allComplaints,
    complaintsDone: complaintsDone,
    complaintsProcess: complaintsProcess,
    complaintsProgress: complaintsProgress,
    information: information,
  });

  useEffect(() => {
    if (isWhat === "isInformation") {
      validateInformation();
    } else if (isWhat === "isProcess") {
      validateProcessingComplaints();
    } else if (isWhat === "isProgress") {
      validateProgressComplaints();
    } else if (isWhat === "isHistory") {
      validateDoneComplaints();
    } else {
      validateAllComplaints();
    }
  }, [user.id, user]);

  useEffect(() => {
    validateUser();
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (selectedModal) {
      validateInformationById();
    }
  }, [selectedModal]);

  useEffect(() => {
    validateInformation();
  }, []);

  return (
    <ThemedView className={`flex-1`}>
      <View className="pt-16 pb-10 px-6 flex-1">
        <View className="flex-row items-center gap-3 pb-4">
          <BackButton onBack={() => router.back()} />
          <SearchBar
            handleSearch={handleSearch}
            searchQuery={query}
            handleClear={handleClear}
            inputRef={inputRef}
          />
        </View>
        {query.length < 3 ? (
          <EmptyItems icon={"search-outline"} text="ketik 3 huruf" />
        ) : filteredData.length > 0 ? (
          <View>
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={filteredData}
              renderItem={({ item }) => (
                <React.Fragment>
                  {isWhat === "isInformation" ? (
                    <InformationItems
                      item={{
                        id: item.id ?? 0,
                        title: item.title!,
                        description: item.descriptions!,
                      }}
                      user={user}
                      onPress={() => handleSelectedModal(item.id!)}
                      onDelete={() => handleSelectedDelete(item.id!)}
                    />
                  ) : (
                    <Items
                      item={{
                        id: item.id || 0,
                        name: item.complaintName || "No Name",
                        case: item.caseType?.[0] || "Unknown Case",
                        created: item.createdAt || "Unknown Date",
                        loc: item.caseViolence?.[0] || "Unknown Location",
                        status: item.status || "Unknown Status",
                      }}
                      onPress={() => handleShowModal(item)}
                      isHistory={item.status === "complaint is done"}
                      isProgress={item.status === "complaint is processing"}
                      user={user}
                    />
                  )}
                </React.Fragment>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <EmptyItems
            icon={"search-outline"}
            text="tidak ada pengaduan ataupun informasi"
          />
        )}
      </View>
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

      <CustomModalConfirmation
        closeModal={closeModal}
        onPress={deleteComplaintById}
        showModal={selectedComplaint}
        title="Apakah anda yakin ?"
        icon={"trash-outline"}
        isLoading={isComplaintsLoading}
      />

      <CustomModal
        onChange={process ? handleChangeFieldNote : handleChangeField}
        onSubmit={process ? handleSubmitNote : handleSubmitInterest}
        value={process ? fieldNote : field}
        closeModal={closeModal}
        showModal={process ? showModalNote : showModalInterest}
        emptyText={process ? "Belum ada perkembangan" : "Belum ada minat"}
        emptyIcon={"document-text-outline"}
        title={process ? "Perkembangan" : "Minat Pelatihan"}
        user={user}
        isHistory={history}
        isProgress={process}
        activeModal={activeModal}
        handleActiveModal={handleActiveModal}
        itemsLoading={notesLoading}
        items={notes}
      />
    </ThemedView>
  );
};
