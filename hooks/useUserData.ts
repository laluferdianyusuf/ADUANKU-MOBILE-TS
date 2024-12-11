import { currentUser, logout, updateAccount } from "@/redux/reducers";
import { AppDispatch } from "@/redux/store";
import { User } from "@/types/types";
import { router } from "expo-router";
import { useState } from "react";
import { ToastAndroid } from "react-native";
import { useDispatch } from "react-redux";

interface UserDataProps {
  id?: number;
  closeModal?: () => void;
}
export function useUserData({ id, closeModal }: UserDataProps) {
  const [user, setUser] = useState<User>({});
  const dispatch = useDispatch<AppDispatch>();
  const [fields, setFields] = useState<User>({
    name: "",
    username: "",
    email: "",
    address: "",
    birthday: "",
    gender: "",
    phoneNumber: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validateUser = async () => {
    setIsLoading(true);
    try {
      const res = await dispatch(currentUser()).unwrap();
      setUser(res.data.user);
    } catch (error) {
      ToastAndroid.show(
        "Gagal memuat pengguna buka ulang aplikasi",
        ToastAndroid.SHORT
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeField = (name: string, value: string) => {
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        name: fields.name || user.name,
        username: fields.username || user.username,
        email: fields.email || user.email,
        address: fields.address || user.address,
        birthday: fields.birthday || user.birthday,
        gender: fields.gender || user.gender,
        phoneNumber: fields.phoneNumber || user.phoneNumber,
      };

      const updatedUser = await dispatch(
        updateAccount({ id: user.id! || id! || 0, data: payload })
      ).unwrap();

      setUser(updatedUser.data.user);
      setSuccess("Berhasil perbarui profil");
      ToastAndroid.show("Berhasil perbarui profil", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Gagal perbarui profil", ToastAndroid.SHORT);
      setError("Gagal perbarui profil");
    } finally {
      setIsLoading(false);
      router.back();
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await dispatch(logout()).unwrap();
      ToastAndroid.show("Berhasil keluar aplikasi", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Gagal keluar aplikasi", ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
      if (closeModal) {
        closeModal();
      }
      router.replace("/(auth)/login");
    }
  };

  return {
    validateUser,
    user,
    saveChanges,
    isLoading,
    error,
    success,
    handleChangeField,
    fields,
    handleLogout,
  };
}
