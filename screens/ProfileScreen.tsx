import {
  BackButton,
  CustomModalConfirmation,
  ProfileList,
  SearchButton,
} from "@/components";
import { ThemedView } from "@/components/ThemedView";
import { useUserData } from "@/hooks/useUserData";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

interface ProfileScreenProps {}

const data = [
  {
    id: "edit",
    title: "Edit Profil",
    icon: "pencil-outline",
    background: "bg-custom-purple-2",
    uri: "/(screens)/edit",
  },
  {
    id: "information-app",
    title: "Informasi Aplikasi",
    icon: "phone-portrait-outline",
    background: "bg-custom-purple-2",
    uri: "/(screens)/about",
  },
  {
    id: "logout",
    title: "Keluar",
    icon: "log-out-outline",
    background: "bg-custom-error-1",
    uri: "",
  },
];

const dataFooter = [
  {
    id: "1",
    text: "Buat Pengaduan",
    icon: "document-text-outline",
    color: "bg-custom-purple-2",
    icon_color: "#5e7dbd",
    uri: "/(screens)/form",
  },
  {
    id: "2",
    text: "Riwayat Aduanku",
    icon: "time-outline",
    color: "bg-custom-warning-1",
    icon_color: "#e89241",
    uri: "/(screens)/history",
  },
  {
    id: "3",
    text: "Progress Aduanku",
    icon: "analytics-outline",
    color: "bg-custom-info-1",
    icon_color: "#11acfa",
    uri: "/(screens)/progress",
  },
  {
    id: "4",
    text: "Informasi",
    icon: "information-outline",
    color: "bg-custom-grey-1",
    icon_color: "#b1bcbd",
    uri: "/(screens)/information",
  },
];

export const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const { user, validateUser, handleLogout, isLoading } = useUserData({
    closeModal: handleCloseModal,
  });
  useEffect(() => {
    validateUser();
  }, []);

  const handlePress = (item: any) => {
    if (item.id === "logout") {
      handleShowModal();
    } else {
      router.push({
        pathname: item.uri as any,
        params: {
          userId: user?.id,
          user: JSON.stringify(user),
        },
      });
    }
  };
  return (
    <ThemedView className={`flex-1`}>
      <View className="pt-16 pb-6 px-6 flex-1">
        <View className="flex-row items-center justify-between pb-4">
          <BackButton onBack={() => router.back()} />
          <Text className="font-josefin text-xl">Profil</Text>
          {user.role === "admin" || user.role === "superadmin" ? (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/(auth)/register",
                  params: { isAdmin: "true" },
                })
              }
              className={``}
            >
              <Ionicons
                name="person-circle-outline"
                size={25}
                color={"black"}
              />
            </Pressable>
          ) : (
            <View className="opacity-0">
              <Ionicons name={"add"} size={25} color={"black"} />
            </View>
          )}
        </View>
        <View className="flex-1">
          <View className="flex-row items-center gap-4 py-8">
            <View className="p-3 bg-custom-purple-2 self-start items-center rounded-full">
              <AntDesign name="user" size={45} color={"white"} />
            </View>
            <View>
              <Text
                className="font-josefin-bold uppercase text-xl"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {isLoading ? "Loading..." : user?.name || "nama belum dibuat"}
              </Text>
              <Text className="font-josefin text-custom-grey-2">
                {isLoading
                  ? "Loading..."
                  : user?.username || "username belum dibuat"}
              </Text>
            </View>
          </View>
          <View className="flex-1">
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <ProfileList item={item} onPress={() => handlePress(item)} />
              )}
              contentContainerClassName="gap-8 pb-5"
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <View className="">
                  <FlatList
                    data={dataFooter}
                    renderItem={({ item }) => (
                      <Pressable
                        onPress={() =>
                          router.push({ pathname: item.uri as any })
                        }
                        className={`${item.color} flex-1 my-1 p-4 rounded-xl overflow-hidden`}
                      >
                        <Ionicons
                          name={item.icon as any}
                          size={20}
                          color={item.icon_color}
                          style={{
                            bottom: 5,
                            right: 5,
                            position: "absolute",
                            opacity: 0.5,
                          }}
                        />
                        <Text className="font-josefin text-center">
                          {item.text}
                        </Text>
                      </Pressable>
                    )}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ gap: 8 }}
                    contentContainerStyle={{ paddingHorizontal: 8 }}
                  />
                </View>
              }
            />
            <View className="justify-center items-center ">
              <Text className="font-josefin text-custom-grey-2">
                developed by
              </Text>
              <View className="flex-row items-center justify-between gap-3">
                <Text className="font-josefin text-custom-grey-2 capitalize">
                  Lalu Ferdian Yusuf
                </Text>
                <View className="w-[1px] h-2/4 bg-custom-grey-2" />
                <Text className="font-josefin text-custom-grey-2 capitalize">
                  Lalu Ocky Saktiya Luhung
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <CustomModalConfirmation
        closeModal={handleCloseModal}
        showModal={showModal}
        icon={"log-out"}
        isLoading={isLoading}
        onPress={handleLogout}
        title="Anda yakin ingin keluar ?"
        isLoggedOut={true}
      />
    </ThemedView>
  );
};
