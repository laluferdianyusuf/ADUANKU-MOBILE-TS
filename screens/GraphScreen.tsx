import { BackButton, LoadingWave, SearchButton } from "@/components";
import { ThemedView } from "@/components/ThemedView";
import { useComplaintData } from "@/hooks/useComplaintData";
import { useVictimData } from "@/hooks/useVictimData";
import { Complaint } from "@/types/types";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import { PieChart } from "react-native-chart-kit";

interface GraphScreenProps {}

export const GraphScreen: React.FC<GraphScreenProps> = () => {
  const {
    validateComplaintViolence,
    complaintsViolence,
    isLoading: complaintLoading,
  } = useComplaintData({});
  const { count, countVictims, isLoading: victimsLoading } = useVictimData();
  useEffect(() => {
    validateComplaintViolence();
    countVictims();
  }, []);
  const dataViolence = complaintsViolence.map(
    (item: Complaint, index: number) => {
      const colors = ["#4b5ea6", "#7282b5", "#abb4d1", "#dadded"];
      return {
        name: "",
        population: item.count,
        color: colors[index % colors.length],
        legendFontColor: colors[index % colors.length],
        legendFontSize: 12,
      };
    }
  );

  const dataGender = [
    {
      name: "",
      population:
        (count?.gender &&
          typeof count.gender === "object" &&
          count.gender.male) ||
        0,
      color: "#7282b5",
      legendFontColor: "#7282b5",
      legendFontSize: 12,
    },
    {
      name: "",
      population:
        (count?.gender &&
          typeof count.gender === "object" &&
          count.gender.female) ||
        0,
      color: "#abb4d1",
      legendFontColor: "#abb4d1",
      legendFontSize: 12,
    },
  ];

  const dataEducation = [
    {
      name: "",
      population:
        (count?.education &&
          typeof count.education === "object" &&
          count.education.TK) ||
        0,
      color: "#262b45",
      legendFontColor: "#262b45",
      legendFontSize: 12,
    },
    {
      name: "",
      population:
        (count?.education &&
          typeof count.education === "object" &&
          count.education.SD) ||
        0,
      color: "#434f8a",
      legendFontColor: "#434f8a",
      legendFontSize: 12,
    },
    {
      name: "",
      population:
        (count?.education &&
          typeof count.education === "object" &&
          count.education.SMP) ||
        0,
      color: "#5771b9",
      legendFontColor: "#5771b9",
      legendFontSize: 12,
    },
    {
      name: "",
      population:
        (count?.education &&
          typeof count.education === "object" &&
          count.education.SMA) ||
        0,
      color: "#87a5d3",
      legendFontColor: "#87a5d3",
      legendFontSize: 12,
    },
    {
      name: "",
      population:
        (count?.education &&
          typeof count.education === "object" &&
          count.education.PT) ||
        0,
      color: "#cfdbee",
      legendFontColor: "#cfdbee",
      legendFontSize: 12,
    },
    {
      name: "",
      population:
        (count?.education &&
          typeof count.education === "object" &&
          count.education.others) ||
        0,
      color: "#f3f7fb",
      legendFontColor: "#f3f7fb",
      legendFontSize: 12,
    },
  ];

  const { width } = useWindowDimensions();

  const chartConfig = {
    backgroundColor: "#233f99",
    backgroundGradientFrom: "#233f99",
    // backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#233f99",
    // backgroundGradientToOpacity: ,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromViolenceset: false,
  };

  return (
    <ThemedView className={`flex-1`}>
      <View className="pt-16 pb-16 px-6 flex-1">
        <View className="flex-row items-center justify-between pb-4">
          <BackButton onBack={() => router.back()} />
          <Text className="font-josefin text-2xl">Grafik Kasus</Text>
          <SearchButton style="opacity-0" isDisabled={true} />
        </View>
        {complaintLoading || victimsLoading ? (
          <LoadingWave />
        ) : (
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            contentContainerClassName="gap-5 justify-center"
            showsVerticalScrollIndicator={false}
          >
            <View className="self-center gap-2">
              <Text className="font-josefin text-center text-xl">
                Berdasarkan Jenis Kekerasan
              </Text>
              <PieChart
                data={dataViolence}
                width={width - 50}
                height={200}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"#f0f6fe"}
                paddingLeft={"15"}
                center={[10, 0]}
                // absolute
                style={{ borderRadius: 12 }}
              />
              <View className="flex-row items-center justify-center gap-3">
                {complaintsViolence.map((item: Complaint, index: number) => {
                  const colors = ["#4b5ea6", "#7282b5", "#abb4d1", "#dadded"];

                  return (
                    <View
                      className="flex-row gap-2 items-center justify-center"
                      key={index}
                    >
                      <View
                        className={`w-4 h-4 rounded-full`}
                        style={{
                          backgroundColor: colors[index % colors.length],
                        }}
                      />
                      <Text className="font-josefin capitalize">
                        {item.type === "physical"
                          ? "Fisik"
                          : item.type === "psychology"
                          ? "Psikologi"
                          : item.type === "sexual"
                          ? "seksual"
                          : "ekonomi"}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <View className="self-center gap-2">
              <Text className="font-josefin text-center text-xl">
                Berdasarkan Jenis Kelamin
              </Text>
              <PieChart
                data={dataGender}
                width={width - 50}
                height={200}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"#f0f6fe"}
                paddingLeft={"15"}
                center={[10, 0]}
                // absolute
                style={{ borderRadius: 12 }}
              />
              <View className="flex-row items-center justify-center gap-3">
                <View className="flex-row gap-2 items-center justify-center">
                  <View className={`w-4 h-4 rounded-full bg-[#7282b5]`} />
                  <Text className="font-josefin capitalize">Laki - laki</Text>
                </View>
                <View className="flex-row gap-2 items-center justify-center">
                  <View className={`w-4 h-4 rounded-full bg-[#abb4d1]`} />
                  <Text className="font-josefin capitalize">Prempuan</Text>
                </View>
              </View>
            </View>

            <View className="self-center gap-2">
              <Text className="font-josefin text-center text-xl">
                Berdasarkan Tingkat Pendidikan
              </Text>
              <PieChart
                data={dataEducation}
                width={width - 50}
                height={200}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"#f0f6fe"}
                paddingLeft={"15"}
                center={[10, 0]}
                // absolute
                style={{ borderRadius: 12 }}
              />
              <View className="flex-row items-center justify-center gap-3">
                <View className="flex-row gap-2 items-center justify-center">
                  <View className={`w-4 h-4 rounded-full bg-[#262b45]`} />
                  <Text className="font-josefin capitalize">TK</Text>
                </View>
                <View className="flex-row gap-2 items-center justify-center">
                  <View className={`w-4 h-4 rounded-full bg-[#434f8a]`} />
                  <Text className="font-josefin capitalize">SD</Text>
                </View>
                <View className="flex-row gap-2 items-center justify-center">
                  <View className={`w-4 h-4 rounded-full bg-[#5771b9]`} />
                  <Text className="font-josefin capitalize">SMP</Text>
                </View>
                <View className="flex-row gap-2 items-center justify-center">
                  <View className={`w-4 h-4 rounded-full bg-[#87a5d3]`} />
                  <Text className="font-josefin capitalize">SMA</Text>
                </View>
                <View className="flex-row gap-2 items-center justify-center">
                  <View className={`w-4 h-4 rounded-full bg-[#cfdbee]`} />
                  <Text className="font-josefin capitalize">PT</Text>
                </View>
                <View className="flex-row gap-2 items-center justify-center">
                  <View className={`w-4 h-4 rounded-full bg-[#f3f7fb]`} />
                  <Text className="font-josefin capitalize">Lainnya</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </ThemedView>
  );
};
