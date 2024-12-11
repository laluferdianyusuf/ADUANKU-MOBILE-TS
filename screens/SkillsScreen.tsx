import { BackButton, LoadingWave, SearchButton, SkillList } from "@/components";
import { EmptyItems } from "@/components/EmptyItems";
import { ThemedView } from "@/components/ThemedView";
import { useSkillsData } from "@/hooks/useSkillsData";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";

interface SkillsScreenProps {}

export const SkillsScreen: React.FC<SkillsScreenProps> = () => {
  const { skills, validateSkills, isLoading } = useSkillsData({});

  useEffect(() => {
    validateSkills();
  }, []);

  return (
    <ThemedView className={`flex-1`}>
      <View className="pt-16 pb-10 px-6 flex-1">
        <View className="flex-row items-center justify-between pb-4">
          <BackButton onBack={() => router.back()} />
          <Text className="font-josefin text-2xl">Minat Pelatihan</Text>
          <SearchButton style="opacity-0" isDisabled={true} />
        </View>
        <View className="gap-5 flex-1">
          <Text className="font-josefin text-justify">
            Di bawah ini adalah daftar minat pelatihan yang telah diajukan.
            Minat pelatihan akan dipelajari dan dikelola dan untuk pelatihan
            lebih lanjut.{" "}
          </Text>
          {isLoading ? (
            <LoadingWave />
          ) : skills.length > 0 ? (
            <View className="flex-1">
              <View className="bg-custom-purple-1 p-3 rounded-t-xl">
                <View className="flex-row items-center">
                  <View className="flex-1">
                    <Text className="font-josefin text-center text-white">
                      Nama
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-josefin text-center text-white">
                      Minat
                    </Text>
                  </View>
                </View>
              </View>
              <FlatList
                data={skills}
                renderItem={({ item, index }) => (
                  <React.Fragment>
                    <SkillList
                      item={{
                        id: item.id!,
                        name: item.complaint?.complaintName!,
                        date: item.createdAt!,
                        description: item.lesson,
                      }}
                      index={index}
                      total={skills.length!}
                    />
                  </React.Fragment>
                )}
                contentContainerClassName="pb-5"
                showsVerticalScrollIndicator={false}
              />
            </View>
          ) : (
            <EmptyItems icon={"bonfire-outline"} text="Belum ada minat" />
          )}
        </View>
      </View>
    </ThemedView>
  );
};
