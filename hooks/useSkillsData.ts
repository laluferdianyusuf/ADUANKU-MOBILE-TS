import { createInterest, getAllInterest } from "@/redux/reducers";
import { AppDispatch } from "@/redux/store";
import { Interest } from "@/types/types";
import { useState } from "react";
import { ToastAndroid } from "react-native";
import { useDispatch } from "react-redux";

interface InterestDataProps {
  id?: number;
  userId?: number;
}

interface FormData {
  name: string;
  lesson: string;
}

export function useSkillsData({ id }: InterestDataProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [skills, setSkills] = useState<Interest[]>([]);
  const [field, setField] = useState<FormData>({
    name: "",
    lesson: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleChangeField = (name: string, value: string) => {
    setField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateSkills = async () => {
    setIsLoading(true);
    try {
      const res = await dispatch(getAllInterest()).unwrap();

      setSkills(res.data.interest);
    } catch (error) {
      ToastAndroid.show("Gagal memuat", ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmitInterest = async () => {
    setIsLoading(true);
    try {
      const payload = {
        name: field.name,
        lesson: field.lesson,
      };
      await dispatch(createInterest({ id: id!, data: payload }));
      ToastAndroid.show("Berhasil membuat minat", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Gagal membuat minat", ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
      validateSkills();
      setField({
        name: "",
        lesson: "",
      });
    }
  };

  return {
    skills,
    validateSkills,
    handleChangeField,
    field,
    handleSubmitInterest,
    isLoading,
  };
}
