import {
  View,
  Text,
  Pressable,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { Fragment } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Note, User } from "@/types/types";
import { LoadingWave } from "./LoadingWave";
import { EmptyItems } from "./EmptyItems";
import { formatDate } from "@/utils/datetime";
import { ProgressForm } from "./ProgressForm";
import { InterestForm } from "./InterestForm";

interface FormData {
  name?: string;
  lesson?: string;
  description?: string;
}

interface CustomModalProps {
  showModal: number | null;
  closeModal: () => void;
  itemsLoading?: boolean;
  items?: Note[];
  emptyText: string;
  emptyIcon: any;
  title: string;
  user: User;
  isProgress?: boolean;
  isHistory?: boolean;
  handleActiveModal?: (active: string) => void;
  activeModal?: string;
  value: FormData;
  onChange: (name: string, value: string) => void;
  onSubmit: () => void;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  showModal,
  closeModal,
  items,
  itemsLoading,
  emptyText,
  emptyIcon,
  title = "Kesalahan Halaman",
  user,
  isProgress,
  isHistory,
  activeModal,
  handleActiveModal,
  value,
  onChange,
  onSubmit,
}) => {
  return (
    <Modal
      visible={!!showModal}
      transparent={true}
      animationType="slide"
      onRequestClose={closeModal}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View
          className="flex-1 justify-end"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        >
          <View
            className="pt-8 pb-4 px-6 gap-5 bg-white rounded-t-2xl h-1/2"
            onStartShouldSetResponder={(e) => e.stopPropagation()}
          >
            <View className="w-12 h-[5px] bg-custom-grey-2 rounded-full self-center" />
            <View className="flex-row justify-between items-center">
              <Text className="font-josefin-bold text-black text-2xl">
                {title}
              </Text>

              <Pressable onPress={closeModal}>
                <Ionicons name="close" size={25} color={"black"} />
              </Pressable>
            </View>
            {isProgress && !isHistory ? (
              <View className="flex-1 gap-3">
                {itemsLoading ? (
                  <LoadingWave />
                ) : activeModal === "ProgressList" ? (
                  <>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={items || []}
                      renderItem={({ item, index }) => (
                        <View key={index}>
                          <View className="gap-3">
                            <View className="flex-row justify-between items-center">
                              <Text className="font-josefin-bold text-xl capitalize flex-1">
                                {item.officerName}
                              </Text>
                              <Text className="font-josefin text-xs">
                                {formatDate(item.createdAt)}
                              </Text>
                            </View>
                            <Text className="font-josefin text-justify">
                              {item.description}
                            </Text>
                          </View>
                          <View className="h-[1px] bg-custom-purple-2 my-2 rounded-xl" />
                        </View>
                      )}
                      keyExtractor={(item) => String(item.id)}
                    />
                  </>
                ) : activeModal === "ProgressForm" ? (
                  <ProgressForm
                    value={value}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    onPress={handleActiveModal!}
                  />
                ) : (
                  <EmptyItems icon={emptyIcon} text={emptyText} />
                )}

                {user.role === "admin" ||
                  (user.role === "superadmin" && (
                    <View
                      className={`${
                        activeModal === "ProgressForm"
                          ? "self-start"
                          : "self-end"
                      }`}
                    >
                      <Pressable
                        className={`${
                          activeModal === "ProgressForm"
                            ? "flex-row-reverse"
                            : "flex-row"
                        } items-center gap-3`}
                        onPress={() =>
                          handleActiveModal!(
                            activeModal === "ProgressForm"
                              ? "ProgressList"
                              : "ProgressForm"
                          )
                        }
                      >
                        <Text className="font-josefin capitalize text-center ">
                          {activeModal === "ProgressForm"
                            ? "Kembali"
                            : "Buat perkembangan"}
                        </Text>
                        <Ionicons
                          name={
                            activeModal === "ProgressForm"
                              ? "arrow-back-outline"
                              : "add"
                          }
                          color={"black"}
                          size={20}
                        />
                      </Pressable>
                    </View>
                  ))}
              </View>
            ) : isHistory && !isProgress ? (
              <InterestForm
                value={value}
                onChange={onChange}
                onSubmit={onSubmit}
                onPress={handleActiveModal!}
              />
            ) : (
              <View className="justify-center items-center">
                <Text className="font-josefin text-white">
                  Kesalahan Halaman
                </Text>
                <Text className="font-josefin text-white">Kembali!</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
