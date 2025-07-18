import { CustomInput } from "@/components";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { registerAdmin, registerUser } from "@/redux/reducers";

interface RegisterScreenProps {
  isAdmin?: string;
}

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ isAdmin }) => {
  const dispatch: AppDispatch = useDispatch();
  const [apiError, setApiError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const registerSchema = z.object({
    email: z
      .string({
        required_error: "Email tidak boleh kosong",
      })
      .email("Format Email harus valid"),
    username: z
      .string({
        required_error: "Username tidak boleh kosong",
      })
      .min(4, "Username harus memiliki minimal 4 karakter"),
    password: z
      .string({
        required_error: "Password tidak boleh kosong",
      })
      .min(8, "Password harus memiliki minimal 8 karakter"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      if (isAdmin === "true") {
        const res = await dispatch(registerAdmin(data)).unwrap();
        console.log(res);
      } else {
        const res = await dispatch(registerUser(data)).unwrap();
        console.log(res);
      }
      router.push("/(auth)/login");
    } catch (error: any) {
      console.log(error);

      if (error?.message) {
        setApiError(error?.message);

        if (error?.message.includes("Username")) {
          setError("username", { message: "Incorrect username" });
        } else if (error?.message.includes("Email")) {
          setError("password", { message: "Incorrect password" });
        } else if (error?.message.includes("Password")) {
          setError("password", { message: "Incorrect password" });
        }
      } else {
        setApiError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRouter = () => {
    if (isAdmin === "true") {
      router.back();
    } else {
      router.push({ pathname: "/(auth)/login" });
    }
  };
  return (
    <ThemedView className={`flex-1`}>
      <View className="pt-16 pb-6 px-6 flex-1 justify-center">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerClassName="gap-12 justify-center"
        >
          <View className="gap-3">
            <Text className="font-josefin-bold capitalize text-xl text-custom-purple-1">
              Daftarkan {isAdmin === "true" ? "admin" : "akunmu"}
            </Text>
            <Text className="font-josefin text-justify text-custom-grey-2">
              Bergabunglah dengan kami! Daftarkan akun Anda untuk menikmati
              layanan lengkap Aduanku.
            </Text>
          </View>
          <View className="gap-7">
            <View className="gap-3">
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    placeholder="Username"
                    value={value}
                    keyboard="default"
                    onChange={onChange}
                    icon={"person-circle-outline"}
                    border="border-custom-grey-3"
                    background="bg-custom-grey-3"
                    paddingHorizontal="py-3"
                    paddingVertical="px-5"
                    activeBorder="border-custom-purple-1"
                    errorMessage={errors.username?.message || apiError}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    placeholder="Email"
                    value={value}
                    keyboard="email-address"
                    onChange={onChange}
                    icon={"mail-outline"}
                    border="border-custom-grey-3"
                    background="bg-custom-grey-3"
                    paddingHorizontal="py-3"
                    paddingVertical="px-5"
                    activeBorder="border-custom-purple-1"
                    errorMessage={errors.email?.message || apiError}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    placeholder="Password"
                    value={value}
                    keyboard="default"
                    onChange={onChange}
                    icon={"lock-closed-outline"}
                    border="border-custom-grey-3"
                    background="bg-custom-grey-3"
                    paddingHorizontal="py-3"
                    paddingVertical="px-5"
                    activeBorder="border-custom-purple-1"
                    isPassword={true}
                    errorMessage={errors.password?.message || apiError}
                  />
                )}
              />
            </View>

            <Pressable
              onPress={handleSubmit(handleRegister)}
              className={`bg-custom-purple-1 p-5 rounded-xl ${
                isLoading ? "opacity-60" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text className="font-josefin text-white text-center">
                  Daftar
                </Text>
              )}
            </Pressable>
          </View>
          <View className="gap-4">
            <View className="flex-row items-center justify-center gap-3">
              <View className="h-[2px] flex-1 bg-custom-grey-4" />
              <Text className="font-josefin-bold capitalize text-custom-grey-4">
                {isAdmin === "true" ? "kembali ke akun" : "masuk ke akun"}
              </Text>
              <View className="h-[2px] flex-1 bg-custom-grey-4" />
            </View>
            <View className="flex-row items-center gap-1 justify-center">
              <Text className="font-josefin capitalize text-custom-grey-2">
                {isAdmin === "true"
                  ? "kembali ke akun anda ?"
                  : "sudah mempunyai akun ?"}
              </Text>
              <Pressable onPress={handleRouter}>
                <Text className="font-josefin-bold text-custom-purple-1 capitalize">
                  {isAdmin === "true" ? "kembali" : "masuk"}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </ThemedView>
  );
};
