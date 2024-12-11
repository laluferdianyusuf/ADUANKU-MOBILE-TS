import React, { useEffect } from "react";
import {
  BackButton,
  CustomInput,
  CustomInputList,
  CustomMultipleList,
  SearchButton,
} from "@/components";
import { ThemedView } from "@/components/ThemedView";
import { useFormData } from "@/hooks/useFormData";
import {
  companionFields,
  complainantFields,
  educationItems,
  fifthFields,
  forthFields,
  genderItems,
  statusItems,
  thirdFields,
  violencesLocItems,
  violencesTypesItems,
} from "@/utils/items";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { useUserData } from "@/hooks/useUserData";
import { useVictimData } from "@/hooks/useVictimData";

interface FormScreenProps {}

export const FormScreen: React.FC<FormScreenProps> = () => {
  const { user, validateUser } = useUserData({});
  const { countVictims } = useVictimData();
  const {
    firstFormData,
    secondFormData,
    thirdFormData,
    forthFormData,
    fifthFormData,
    currentIndex,
    handleChangeFirstForm,
    handleSelectFirstForm,
    handleChangeSecondForm,
    handleSelectSecondForm,
    handleChangeThirdForm,
    handleSelectThirdForm,
    handleChangeForthForm,
    handleSelectForthForm,
    handleChangeFifthForm,
    setCaseTypes,
    setCaseLocation,
    addVictim,
    removeVictim,
    addAbuser,
    removeAbuser,
    handleNext,
    handlePrevious,
    handleSubmit,
    caseTypes,
    caseLocation,
    isLoading,
  } = useFormData({ id: user.id, validateDataCount: countVictims });

  useEffect(() => {
    validateUser();
  }, []);

  const handleBack = () => {
    if (currentIndex <= 4 && currentIndex > 0) {
      handlePrevious();
    } else {
      router.back();
    }
  };

  return (
    <ThemedView className="flex-1">
      <View className="pt-16 pb-6 px-6 flex-1">
        <View className="flex-row items-center justify-between pb-3">
          <BackButton onBack={handleBack} />
          <Text className="font-josefin text-2xl">
            {currentIndex === 0
              ? "Identitas Pengadu"
              : currentIndex === 1
              ? "Identitas Pendamping"
              : currentIndex === 2
              ? "Identitas Korban"
              : currentIndex === 3
              ? "Identitas Pelaku"
              : "Kronologi"}
          </Text>
          {currentIndex === 2 ? (
            <View className="flex-row items-center gap-3">
              <Pressable onPress={addVictim}>
                <Ionicons name="add-outline" size={25} color={"black"} />
              </Pressable>
              {thirdFormData.length > 1 && (
                <Pressable
                  onPress={() => removeVictim(thirdFormData.length - 1)}
                >
                  <Ionicons name="remove-outline" size={25} color={"black"} />
                </Pressable>
              )}
            </View>
          ) : currentIndex === 3 ? (
            <View className="flex-row items-center gap-3">
              <Pressable onPress={addAbuser}>
                <Ionicons name="add-outline" size={25} color={"black"} />
              </Pressable>
              {forthFormData.length > 1 && (
                <Pressable
                  onPress={() => removeAbuser(forthFormData.length - 1)}
                >
                  <Ionicons name="remove-outline" size={25} color={"black"} />
                </Pressable>
              )}
            </View>
          ) : (
            <SearchButton style="opacity-0" isDisabled={true} />
          )}
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1">
            <Text className="font-josefin text-justify">
              Isi dengan " - " jika ingin dikosongkan{" "}
            </Text>
            {currentIndex === 0 ? (
              <View>
                {complainantFields.map((field) => (
                  <React.Fragment key={field.name}>
                    {field.name === "a_education" ? (
                      <CustomInputList
                        data={educationItems}
                        icon={field.icon!}
                        label="pendidikan"
                        placeholder={field.placeholder}
                        setSelected={handleSelectFirstForm}
                        selectedValue={firstFormData.a_education}
                        noDataText="no items"
                        value="value"
                        isSearched={false}
                      />
                    ) : (
                      <CustomInput
                        placeholder={field.placeholder}
                        value={
                          firstFormData[
                            field.name as keyof typeof firstFormData
                          ]
                        }
                        title={field.title}
                        keyboard={field.keyboard}
                        onChange={(text) =>
                          handleChangeFirstForm(field.name, text)
                        }
                        multiline={field.multiline}
                        icon={field.icon}
                      />
                    )}
                  </React.Fragment>
                ))}
              </View>
            ) : currentIndex === 1 ? (
              <View>
                {companionFields.map((field) => (
                  <React.Fragment key={field.name}>
                    {field.name === "b_education" ? (
                      <CustomInputList
                        data={educationItems}
                        icon={field.icon!}
                        label="pendidikan"
                        placeholder={field.placeholder}
                        setSelected={handleSelectSecondForm}
                        selectedValue={secondFormData.b_education}
                        noDataText="no items"
                        value="value"
                        isSearched={false}
                      />
                    ) : (
                      <CustomInput
                        placeholder={field.placeholder}
                        value={
                          secondFormData[
                            field.name as keyof typeof secondFormData
                          ]
                        }
                        title={field.title}
                        keyboard={field.keyboard}
                        onChange={(text) =>
                          handleChangeSecondForm(field.name, text)
                        }
                        multiline={field.multiline}
                        icon={field.icon}
                      />
                    )}
                  </React.Fragment>
                ))}
              </View>
            ) : currentIndex === 2 ? (
              thirdFormData.map((victim, index) => (
                <View key={index}>
                  {thirdFormData.length > 1 && (
                    <View className="flex-row items-center justify-center gap-3">
                      <View className="flex-1 h-[1px] bg-custom-purple-2" />
                      <Text className="font-josefin capitalize">
                        korban {index + 1}
                      </Text>
                      <View className="flex-1 h-[1px] bg-custom-purple-2" />
                    </View>
                  )}
                  {thirdFields.map((field) => (
                    <React.Fragment key={field.name}>
                      {field.name === "c_education" ? (
                        <CustomInputList
                          data={educationItems}
                          icon={field.icon!}
                          label="pendidikan"
                          placeholder={field.placeholder}
                          setSelected={(value) =>
                            handleSelectThirdForm(index, "c_education", value)
                          }
                          selectedValue={victim.c_education}
                          noDataText="no items"
                          value="value"
                          isSearched={false}
                        />
                      ) : field.name === "c_gender" ? (
                        <CustomInputList
                          data={genderItems}
                          icon={field.icon!}
                          label="jenis kelamin"
                          placeholder={field.placeholder}
                          setSelected={(value) =>
                            handleSelectThirdForm(index, "c_gender", value)
                          }
                          selectedValue={victim.c_gender}
                          noDataText="no items"
                          value="value"
                          isSearched={false}
                        />
                      ) : (
                        <CustomInput
                          placeholder={field.placeholder}
                          value={victim[field.name as keyof typeof victim]}
                          title={field.title}
                          keyboard={field.keyboard}
                          onChange={(text) =>
                            handleChangeThirdForm(index, field.name, text)
                          }
                          multiline={field.multiline}
                          icon={field.icon}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </View>
              ))
            ) : currentIndex === 3 ? (
              forthFormData.map((abuser, index) => (
                <View key={index}>
                  {forthFormData.length > 1 && (
                    <View className="flex-row items-center justify-center gap-3">
                      <View className="flex-1 h-[1px] bg-custom-purple-2" />
                      <Text className="font-josefin capitalize">
                        pelaku {index + 1}
                      </Text>
                      <View className="flex-1 h-[1px] bg-custom-purple-2" />
                    </View>
                  )}
                  {forthFields.map((field) => (
                    <React.Fragment key={field.name}>
                      {field.name === "d_education" ? (
                        <CustomInputList
                          data={educationItems}
                          icon={field.icon!}
                          label="pendidikan"
                          placeholder={field.placeholder}
                          setSelected={(value) =>
                            handleSelectForthForm(index, "d_education", value)
                          }
                          selectedValue={abuser.d_education}
                          noDataText="no items"
                          value="value"
                          isSearched={false}
                        />
                      ) : field.name === "d_gender" ? (
                        <CustomInputList
                          data={genderItems}
                          icon="school-outline"
                          label="jenis kelamin"
                          placeholder={field.placeholder}
                          setSelected={(value) =>
                            handleSelectForthForm(index, "d_gender", value)
                          }
                          selectedValue={abuser.d_gender}
                          noDataText="no items"
                          value="value"
                          isSearched={false}
                        />
                      ) : field.name === "status" ? (
                        <CustomInputList
                          data={statusItems}
                          icon={field.icon!}
                          label="Status"
                          placeholder={field.placeholder}
                          setSelected={(value) =>
                            handleSelectForthForm(index, "status", value)
                          }
                          selectedValue={abuser.status}
                          noDataText="no items"
                          value="value"
                          isSearched={false}
                        />
                      ) : (
                        <CustomInput
                          placeholder={field.placeholder}
                          value={abuser[field.name as keyof typeof abuser]}
                          title={field.title}
                          keyboard={field.keyboard}
                          onChange={(text) =>
                            handleChangeForthForm(index, field.name, text)
                          }
                          multiline={field.multiline}
                          icon={field.icon}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </View>
              ))
            ) : (
              <View>
                {fifthFields.map((field) => (
                  <React.Fragment key={field.name}>
                    {field.name === "types" ? (
                      <CustomMultipleList
                        data={violencesTypesItems}
                        icon={field.icon!}
                        label="Tipe Kekerasan"
                        placeholder={field.placeholder}
                        setSelected={(value) => setCaseTypes(value)}
                        selectedValue={caseTypes}
                        value="value"
                        isSearched={false}
                      />
                    ) : field.name === "location" ? (
                      <CustomMultipleList
                        data={violencesLocItems}
                        icon={field.icon!}
                        label="Lokasi Kasus"
                        placeholder={field.placeholder}
                        setSelected={(value) => setCaseLocation(value)}
                        selectedValue={caseLocation}
                        value="value"
                        isSearched={false}
                      />
                    ) : (
                      <CustomInput
                        placeholder={field.placeholder}
                        value={
                          typeof fifthFormData[
                            field.name as keyof typeof fifthFormData
                          ] === "string"
                            ? (fifthFormData[
                                field.name as keyof typeof fifthFormData
                              ] as string)
                            : ""
                        }
                        title={field.title}
                        disabled={
                          (!caseTypes.includes("Psikologis") &&
                            field.name === "psychology") ||
                          (!caseTypes.includes("Fisik") &&
                            field.name === "physics") ||
                          (!caseTypes.includes("Sexual") &&
                            field.name === "sexual") ||
                          (!caseTypes.includes("Ekonomi") &&
                            field.name === "economy")
                        }
                        keyboard={field.keyboard}
                        onChange={(text) =>
                          handleChangeFifthForm(field.name, text)
                        }
                        multiline={field.multiline}
                        icon={field.icon}
                      />
                    )}
                  </React.Fragment>
                ))}
              </View>
            )}
          </View>
          <View className="flex-row items-center gap-3">
            {currentIndex > 0 && (
              <Pressable
                onPress={handlePrevious}
                className="flex-1 bg-custom-purple-2 p-3 rounded-xl"
              >
                <Text className="font-josefin-bold text-center text-white">
                  Previous
                </Text>
              </Pressable>
            )}
            {currentIndex < 4 ? (
              <Pressable
                onPress={handleNext}
                className="flex-1 bg-custom-purple-2 p-3 rounded-xl"
              >
                <Text className="font-josefin-bold text-center text-white">
                  Next
                </Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={handleSubmit}
                className="flex-1 bg-custom-purple-2 p-3 rounded-xl"
              >
                <Text className="font-josefin-bold text-center text-white">
                  {isLoading ? "Loading..." : "Submit"}
                </Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
      </View>
    </ThemedView>
  );
};
