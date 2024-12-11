import {
  BackButton,
  CustomModalConfirmation,
  DetailList,
  LoadingWave,
  SearchButton,
} from "@/components";
import { ThemedView } from "@/components/ThemedView";
import { useComplaintData } from "@/hooks/useComplaintData";
import { useUserData } from "@/hooks/useUserData";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

interface DetailScreenProps {
  id?: number;
}
interface DataProps {
  id: string;
  name: string;
  data: string | string[];
  title: string;
  icon: any;
  multiline?: boolean;
  category: string;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({ id }) => {
  const { user, validateUser } = useUserData({});
  const [selectedModal, setSelectedModal] = useState<boolean>(false);

  const showModal = () => {
    setSelectedModal(true);
  };

  const closeModal = () => {
    setSelectedModal(false);
  };
  const {
    complaintsDetails,
    validateComplaintDetails,
    isLoading,
    finishComplaint,
    processComplaint,
  } = useComplaintData({
    id: id || 0,
    user: user,
    closeModal: closeModal,
    complaintId: Number(id) || 0,
  });

  useEffect(() => {
    validateUser();
  }, []);

  useEffect(() => {
    validateComplaintDetails();
  }, [user.id]);
  const categories = ["pengadu", "pendamping", "korban", "pelaku", "kronologi"];
  const data: DataProps[] = [
    {
      id: "1",
      name: "complainant's name",
      data: complaintsDetails.complaintName!,
      title: "Nama Pengadu",
      icon: "text-outline",
      category: "pengadu",
    },
    {
      id: "2",
      name: "complainant's address",
      data: complaintsDetails.complaintAddress!,
      title: "Alamat Pengadu",
      icon: "location-outline",
      category: "pengadu",
    },
    {
      id: "3",
      name: "complainant's phone number",
      data: complaintsDetails.complaintNumber!,
      title: "Nomor Telepon",
      icon: "keypad-outline",
      category: "pengadu",
    },
    {
      id: "4",
      name: "complainant's education",
      data: complaintsDetails.complaintEducate!,
      title: "Pendidikan",
      icon: "school-outline",
      category: "pengadu",
    },
    {
      id: "5",
      name: "complainant's relation",
      data: complaintsDetails.complaintRelation!,
      title: "Hubungan",
      icon: "heart-outline",
      category: "pengadu",
    },
    {
      id: "6",
      name: "companion's name",
      data: complaintsDetails.companionName!,
      title: "Nama Pendamping",
      icon: "gift-outline",
      category: "pendamping",
    },
    {
      id: "7",
      name: "companion's address",
      data: complaintsDetails.companionAddress!,
      title: "Alamat Pendamping",
      icon: "location-outline",
      category: "pendamping",
    },
    {
      id: "8",
      name: "companion's phone number",
      data: complaintsDetails.companionNumber!,
      title: "Nomor Telepon",
      icon: "keypad-outline",
      category: "pendamping",
    },
    {
      id: "9",
      name: "companion's education",
      data: complaintsDetails.companionEducate!,
      title: "Pendidikan",
      icon: "school-outline",
      category: "pendamping",
    },
    {
      id: "10",
      name: "companion's relation",
      data: complaintsDetails.companionRelation!,
      title: "Hubungan",
      icon: "heart-outline",
      category: "pendamping",
    },
    ...(complaintsDetails.victims || []).map((victim, index) => ({
      id: `victim-name-${index}`,
      name: `victim's name`,
      data: victim.name || "-",
      title: `Nama Korban ${index + 1}`,
      icon: "text-outline",
      category: "korban",
    })),
    ...(complaintsDetails.victims || []).map((victim, index) => ({
      id: `victim-gender-${index}`,
      name: `victim's gender`,
      data: String(victim.gender) || "-",
      title: `JK Korban ${index + 1}`,
      icon: "male-female-outline",
      category: "korban",
    })),
    ...(complaintsDetails.victims || []).map((victim, index) => ({
      id: `victim-id-${index}`,
      name: `victim's borndate`,
      data: victim.birthday || "-",
      title: `TTL Korban ${index + 1}`,
      icon: "gift-outline",
      category: "korban",
    })),
    ...(complaintsDetails.victims || []).map((victim, index) => ({
      id: `victim-national_id-${index}`,
      name: `victim's national_id`,
      data: victim.nik || "-",
      title: `NIK Korban ${index + 1}`,
      icon: "id-card-outline",
      category: "korban",
    })),
    ...(complaintsDetails.victims || []).map((victim, index) => ({
      id: `victim-address-${index}`,
      name: `victim's address`,
      data: victim.address || "-",
      title: `Alamat Korban ${index + 1}`,
      icon: "location-outline",
      category: "korban",
    })),
    ...(complaintsDetails.victims || []).map((victim, index) => ({
      id: `victim-phone-${index}`,
      name: `victim's phone`,
      data: victim.phoneNumber || "-",
      title: `Nomor Telpon`,
      icon: "keypad-outline",
      category: "korban",
    })),
    ...(complaintsDetails.victims || []).map((victim, index) => ({
      id: `victim-edu-${index}`,
      name: `victim's education`,
      data: String(victim.education) || "-",
      title: `Pendidikan Korban`,
      icon: "school-outline",
      category: "korban",
    })),
    ...(complaintsDetails.victims || []).map((victim, index) => ({
      id: `victim-p_name-${index}`,
      name: `victim's parent_name`,
      data: victim.parentName || "-",
      title: `Wali Korban`,
      icon: "walk-outline",
      category: "korban",
    })),
    ...(complaintsDetails.victims || []).map((victim, index) => ({
      id: `victim-p_job-${index}`,
      name: `victim's parent_job`,
      data: victim.parentJob || "-",
      title: `Pekerjaan Wali`,
      icon: "briefcase-outline",
      category: "korban",
    })),
    ...(complaintsDetails.victims || []).map((victim, index) => ({
      id: `victim-p_address-${index}`,
      name: `victim's parent_address`,
      data: victim.parentAddress || "-",
      title: `Alamat Wali`,
      icon: "earth-outline",
      category: "korban",
    })),
    ...(complaintsDetails.victims || []).map((victim, index) => ({
      id: `victim-p_phone-${index}`,
      name: `victim's parent_phone`,
      data: victim.parentNumber || "-",
      title: `Nomor Telpon Wali`,
      icon: "phone-portrait-outline",
      category: "korban",
    })),
    ...(complaintsDetails.abusers || []).map((abuser, index) => ({
      id: `abuser-name-${index}`,
      name: `abuser's name`,
      data: abuser.name || "-",
      title: `Nama Pelaku ${index + 1}`,
      icon: "person-outline",
      category: "pelaku",
    })),
    ...(complaintsDetails.abusers || []).map((abuser, index) => ({
      id: `abuser-address-${index}`,
      name: `abuser's address`,
      data: abuser.address || "-",
      title: `Alamat Pelaku ${index + 1}`,
      icon: "location-outline",
      category: "pelaku",
    })),
    ...(complaintsDetails.abusers || []).map((abuser, index) => ({
      id: `abuser-edu-${index}`,
      name: `abuser's education`,
      data: String(abuser.education) || "-",
      title: `Pendidikan Pelaku ${index + 1}`,
      icon: "school-outline",
      category: "pelaku",
    })),
    ...(complaintsDetails.abusers || []).map((abuser, index) => ({
      id: `abuser-occ-${index}`,
      name: `abuser's occupation`,
      data: abuser.job || "-",
      title: `Pekerjaa Pelaku ${index + 1}`,
      icon: "briefcase-outline",
      category: "pelaku",
    })),
    ...(complaintsDetails.abusers || []).map((abuser, index) => ({
      id: `abuser-status-${index}`,
      name: `abuser's status`,
      data: abuser.status || "-",
      title: `Status Pelaku ${index + 1}`,
      icon: "rose-outline",
      category: "pelaku",
    })),
    ...(complaintsDetails.abusers || []).map((abuser, index) => ({
      id: `abuser-relation-${index}`,
      name: `abuser's realtion`,
      data: abuser.relation || "-",
      title: `Hubungan Pelaku ${index + 1}`,
      icon: "heart-outline",
      category: "pelaku",
    })),
    {
      id: "28",
      name: "types",
      data: complaintsDetails.caseType! || [],
      title: "Jenis Kekerasan",
      icon: "search-outline",
      category: "kronologi",
    },
    {
      id: "29",
      name: "location",
      data: complaintsDetails.caseViolence! || [],
      title: "Lokasi Kasus",
      icon: "location-outline",
      category: "kronologi",
    },
    {
      id: "30",
      name: "physics",
      data: complaintsDetails.physical!,
      title: "Deskripsi Fisik",
      icon: "hand-left-outline",
      category: "kronologi",
    },
    {
      id: "31",
      name: "sexual",
      data: complaintsDetails.sexual!,
      title: "Deskripsi Sexual",
      icon: "male-female-outline",
      category: "kronologi",
    },
    {
      id: "32",
      name: "psychology",
      data: complaintsDetails.psychology!,
      title: "Deskripsi Psikologi",
      icon: "sad-outline",
      category: "kronologi",
    },
    {
      id: "33",
      name: "economy",
      data: complaintsDetails.economy!,
      title: "Deskripsi Ekonomi",
      icon: "cash-outline",
      category: "kronologi",
    },
    {
      id: "34",
      name: "chronology",
      data: complaintsDetails.chronology!,
      title: "Kronologi",
      icon: "extension-puzzle-outline",
      multiline: true,
      category: "kronologi",
    },
  ];

  const selectedTypes = data.find((item) => item.name === "types")?.data || [];

  const filteredData = data.filter((item) => {
    if (item.name === "physics" && selectedTypes.includes("Fisik")) return true;
    if (item.name === "sexual" && selectedTypes.includes("Sexual")) return true;
    if (item.name === "psychology" && selectedTypes.includes("Psikologi"))
      return true;
    if (item.name === "economy" && selectedTypes.includes("Ekonomi"))
      return true;
    return (
      item.name !== "physics" &&
      item.name !== "sexual" &&
      item.name !== "psychology" &&
      item.name !== "economy"
    );
  });

  const groupedData = categories.reduce((acc, category) => {
    const categoryItems = filteredData.filter(
      (item) => item.category === category
    );
    if (categoryItems.length > 0) {
      acc.push({
        title: category,
        data: [{ title: category, header: true }, ...categoryItems],
      });
    }
    return acc;
  }, [] as { title: string; data: any[] }[]);

  return (
    <ThemedView className={`flex-1`}>
      <View className="pt-16 pb-10 px-6 flex-1">
        <View className="flex-row items-center justify-between pb-4">
          <BackButton onBack={() => router.back()} />
          <Text className="font-josefin text-2xl">Detail Aduan</Text>
          <SearchButton style="opacity-0" isDisabled={true} />
        </View>
        {isLoading ? (
          <LoadingWave />
        ) : (
          <View>
            <FlatList
              data={groupedData.flatMap((section) => section.data)}
              keyExtractor={(item, index) =>
                item.header ? `header-${index}` : item.id.toString()
              }
              renderItem={({ item }) => {
                if (item.header) {
                  return (
                    <View className="">
                      <Text className="font-josefin text-xl capitalize">
                        {item.title}
                      </Text>
                    </View>
                  );
                }

                return (
                  <DetailList
                    item={item}
                    onPress={() => console.log("press")}
                    title={item.title}
                    icon={item.icon}
                  />
                );
              }}
              ListFooterComponent={
                (complaintsDetails.status === "complaint is waiting" &&
                  user.role === "admin") ||
                user.role === "superadmin" ||
                (complaintsDetails.status === "complaint is processing" &&
                  user.role === "admin") ||
                user.role === "superadmin" ? (
                  <View
                    className={`${
                      complaintsDetails.status === "complaint is done"
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <Pressable className="self-end flex-1" onPress={showModal}>
                      <Text className="font-josefin-bold text-custom-purple-1 capitalize">
                        {complaintsDetails.status === "complaint is waiting"
                          ? "Terima Kasus"
                          : "Kasus Selesai"}
                      </Text>
                    </Pressable>
                  </View>
                ) : null
              }
              contentContainerClassName="gap-4 pb-5"
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
      <CustomModalConfirmation
        closeModal={closeModal}
        icon={
          complaintsDetails.status === "complaint is waiting"
            ? "checkmark-outline"
            : "checkmark-done-outline"
        }
        isLoading={isLoading}
        onPress={
          complaintsDetails.status === "complaint is waiting"
            ? processComplaint
            : finishComplaint
        }
        showModal={selectedModal}
        title={
          complaintsDetails.status === "complaint is waiting"
            ? "Terima Kasus ?"
            : "Kasus Telah Selesai ?"
        }
        confirm={
          complaintsDetails.status === "complaint is waiting"
            ? "Terima Kasus"
            : "Kasus Selesai"
        }
      />
    </ThemedView>
  );
};
