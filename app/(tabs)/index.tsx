import {
  Text,
  View,
  FlatList,
  Pressable,
  ToastAndroid,
  BackHandler,
  Linking,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import CategoryItem from "@/components/CategoryItem";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LoadingWave, SearchButton } from "@/components";
import { Category } from "@/types/types";
import React, { useEffect, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useUserData } from "@/hooks/useUserData";
import { useVictimData } from "@/hooks/useVictimData";
const category: Category[] = [
  {
    id: "complaint",
    name: "Form Pengaduan",
    icon: "document-text-outline",
    desc: "Buat pengaduan anda",
    color: "bg-custom-purple-1",
    uri: "/(screens)/form",
  },
  {
    id: "progress",
    name: "Perkembangan",
    icon: "analytics-outline",
    desc: "Lihat perkembangan kasus",
    color: "bg-custom-info-2",
    uri: "/(screens)/progress",
  },
  {
    id: "history",
    name: "Riwayat",
    icon: "time-outline",
    desc: "Lihat riwayat kasus",
    color: "bg-custom-warning-2",
    uri: "/(screens)/history",
  },
  {
    id: "graph",
    name: "Grafik Kasus",
    icon: "pie-chart-outline",
    desc: "Lihat grafik kasus",
    color: "bg-custom-indigo-2",
    uri: "/(screens)/graph",
  },
  {
    id: "consultations",
    name: "Konsultasi",
    icon: "logo-whatsapp",
    desc: "Konsultasi melalui whats app",
    color: "bg-custom-success-2",
    uri: "",
  },
  {
    id: "information",
    name: "Infomasi",
    icon: "information-outline",
    desc: "Lihat informasi terkait",
    color: "bg-custom-grey-2",
    uri: "/(screens)/information",
  },
];

export default function HomeScreen() {
  const backPressCount = useRef(0);
  const backPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isFocused = useIsFocused();
  const { user, validateUser, isLoading: isUserLoading } = useUserData({});
  const { count, countVictims, isLoading: isVictimLoading } = useVictimData();

  const handlePressItem = (item: Category) => {
    if (item.id === "consultations") {
      const whatsappNumber = "6282339431011";
      const whatsappUrl = `https://wa.me/${whatsappNumber}`;

      Linking.openURL(whatsappUrl).catch((err) =>
        ToastAndroid.show("Gagal membuka WhatsApp", ToastAndroid.SHORT)
      );
    } else {
      router.push({
        pathname: item.uri as any,
        params: {
          userId: user?.id,
        },
      });
    }
  };

  useEffect(() => {
    const handleBackPress = () => {
      if (backPressCount.current === 0) {
        backPressCount.current += 1;
        ToastAndroid.show("Tekan sekali lagi untuk keluar", ToastAndroid.SHORT);

        backPressTimer.current = setTimeout(() => {
          backPressCount.current = 0;
        }, 3000);

        return true;
      } else {
        clearTimeout(backPressTimer.current as NodeJS.Timeout);
        BackHandler.exitApp();
        return true;
      }
    };

    if (isFocused) {
      backPressCount.current = 0;
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    } else {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      clearTimeout(backPressTimer.current as NodeJS.Timeout);
    }

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      clearTimeout(backPressTimer.current as NodeJS.Timeout);
    };
  }, [isFocused]);

  useEffect(() => {
    validateUser();
    countVictims();
  }, []);

  const filteredCategory = category.filter(
    (item) =>
      item.id !== "graph" ||
      user?.role === "admin" ||
      user?.role === "superadmin"
  );

  return (
    <ThemedView className={`flex-1`}>
      {isVictimLoading && isUserLoading ? (
        <LoadingWave />
      ) : (
        <React.Fragment>
          <View className="pt-16 pb-6 px-6 bg-custom-purple-1">
            <View className="flex-row justify-between mb-5">
              <View className="">
                {/* <Text className="font-josefin-bold text-white text-2xl">A</Text> */}
                <Text className="font-josefin-bold text-white text-2xl">
                  Aduanku
                </Text>
                <Text className="font-josefin-bold text-white text-xs">
                  by TPDCOM
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <SearchButton
                  style="rounded-full p-2 items-center justify-center bg-custom-grey-1"
                  isWhat="isAll"
                />
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/(screens)/skills",
                    })
                  }
                  className="rounded-full p-2 items-center justify-center bg-custom-grey-1"
                >
                  <Ionicons name="bonfire-outline" size={25} color={"black"} />
                </Pressable>
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/(screens)/profile",
                    })
                  }
                  className="rounded-full p-2 items-center justify-center bg-custom-grey-1"
                >
                  <AntDesign name="user" size={25} color={"black"} />
                </Pressable>
              </View>
            </View>
            <View className={``}>
              <View className="my-4 ">
                <Text className="text-2xl text-white font-josefin">
                  Selamat Datang
                </Text>
                <Text className="text-2xl font-josefin-bold capitalize text-white">
                  {user?.username}
                </Text>
              </View>
              {user.role === "admin" || user.role === "superadmin" ? (
                <View className="mt-4 flex-row items-center justify-center gap-3">
                  <View className="px-3 py-1 justify-center flex-row gap-2 items-center rounded-xl">
                    <Ionicons
                      name="bookmark-outline"
                      size={20}
                      color={"white"}
                    />
                    <View className="">
                      <Text className="text-xs capitalize text-white font-josefin">
                        jumlah kasus
                      </Text>
                      <Text className="text-xs text-white font-josefin">
                        {count?.victim || 0}
                      </Text>
                    </View>
                  </View>
                  <View className="px-3 py-1 justify-center flex-row gap-2 items-center rounded-xl">
                    <Ionicons name="male-outline" size={20} color={"white"} />
                    <View className="">
                      <Text className="text-xs capitalize text-white font-josefin">
                        laki - laki
                      </Text>
                      <Text className="text-xs text-white font-josefin">
                        {(count?.gender &&
                          typeof count.gender === "object" &&
                          count.gender.male) ||
                          0}
                      </Text>
                    </View>
                  </View>
                  <View className="px-3 py-1 justify-center flex-row gap-2 items-center rounded-xl">
                    <Ionicons name="female-outline" size={20} color={"white"} />
                    <View className="">
                      <Text className="text-xs capitalize text-white font-josefin">
                        perempuan
                      </Text>
                      <Text className="text-xs text-white font-josefin">
                        {(count?.gender &&
                          typeof count.gender === "object" &&
                          count.gender.female) ||
                          0}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
          <View className="flex-1 bg-white px-6">
            <FlatList
              data={filteredCategory}
              renderItem={({ item }) => (
                <CategoryItem
                  item={item}
                  handlePress={() => handlePressItem(item)}
                />
              )}
              // keyExtractor={(item) => item.id}
              contentContainerClassName="gap-4 py-5"
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ gap: 5 }}
              contentContainerStyle={{
                rowGap: 5,
              }}
            />
          </View>
        </React.Fragment>
      )}
    </ThemedView>
  );
}
