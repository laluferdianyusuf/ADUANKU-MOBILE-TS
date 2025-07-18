import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import Swiper from "react-native-swiper";

const slides = [
  {
    image: require("@/assets/images/first.png"),
    title: "Selamat Datang di Aduanku",
    description:
      "Aduanku hadir sebagai wadah yang aman dan terpercaya untuk menyampaikan laporan kekerasan. Bersama kita wujudkan lingkungan yang lebih baik.",
  },
  {
    image: require("@/assets/images/second.png"),
    title: "Layanan Cepat dan Responsif",
    description:
      "Laporkan insiden dengan mudah dan cepat. Aduanku akan memastikan laporan Anda diteruskan ke pihak terkait secara tepat dan responsif.",
  },
  {
    image: require("@/assets/images/third.png"),
    title: "Privasi Anda adalah Prioritas Kami",
    description:
      "Setiap laporan dijaga kerahasiaannya dengan baik. Mulai sekarang, Anda tidak sendirian. Daftar atau login untuk memulai.",
  },
];

export const StartScreen: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      AsyncStorage.setItem("hasSeenStartScreen", "true");
      onComplete();
    }
  };

  const handleSkip = () => {
    AsyncStorage.setItem("hasSeenStartScreen", "true");
    onComplete();
  };

  return (
    <ThemedView className="flex-1">
      <View className="pt-16 pb-6 flex-1 bg-custom-purple-1 gap-3">
        <View className="flex-row px-6 items-center justify-between">
          <View className="flex-row gap-[2px] transition-all duration-150">
            {slides.map((_, index) => (
              <View
                key={index}
                className={` h-1 rounded-full ${
                  activeIndex === index ? "bg-white w-5" : "bg-gray-400 w-2"
                }`}
              />
            ))}
          </View>
          <Pressable onPress={handleSkip}>
            <Text className="font-josefin text-xl text-white">skip</Text>
          </Pressable>
        </View>
        <Swiper
          loop={false}
          showsPagination={false}
          onIndexChanged={(index) => setActiveIndex(index)}
          index={activeIndex}
          scrollEnabled={false}
        >
          {slides.map((slide, index) => (
            <View
              key={index}
              className="items-center justify-center flex-1 px-6"
            >
              <Text className="text-2xl font-josefin-bold mb-2 text-white text-center">
                {slide.title}
              </Text>
              <View className="overflow-hidden">
                <Image
                  source={slide.image}
                  className="h-96 mb-4 z-50"
                  resizeMode="contain"
                />
              </View>

              <Text className="text-center text-white mb-8 px-4 font-josefin">
                {slide.description}
              </Text>
            </View>
          ))}
        </Swiper>

        <Pressable
          className="self-end justify-self-end rounded-md flex-row items-center gap-3 px-6"
          onPress={handleNext}
        >
          <Text className="text-white text-center font-josefin">
            {activeIndex === slides.length - 1
              ? "Daftar Sekarang"
              : "Selanjutnya"}
          </Text>
          <Ionicons name="arrow-forward-outline" size={18} color={"white"} />
        </Pressable>
        <View className="justify-center items-center">
          <Text className="font-josefin text-custom-grey-2">powered by</Text>
          <Text className="font-josefin text-custom-grey-2">
            @transformasiperempuandotcom
          </Text>
        </View>
      </View>
    </ThemedView>
  );
};
