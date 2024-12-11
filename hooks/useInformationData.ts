import {
  createInformation,
  deleteInformationById,
  getInformation,
  getInformationById,
} from "@/redux/reducers";
import { AppDispatch } from "@/redux/store";
import { Information } from "@/types/types";
import { useState } from "react";
import { ToastAndroid } from "react-native";
import { useDispatch } from "react-redux";

interface FieldProps {
  title: string;
  descriptions: string;
}

interface InformationProps {
  closeModal?: () => void;
  closeModalDelete?: () => void;
  id?: number;
  deleteId?: number;
}

export function useInformationData({
  closeModal,
  id,
  closeModalDelete,
  deleteId,
}: InformationProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [information, setInformation] = useState<Information[]>([]);
  const [informationDetails, setInformationDetails] = useState<Information>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPressing, setIsPressing] = useState<boolean>(false);
  const [fields, setFields] = useState<FieldProps>({
    title: "",
    descriptions: "",
  });

  const validateInformation = async () => {
    setIsLoading(true);
    try {
      const res = await dispatch(getInformation()).unwrap();
      setInformation(res.data.information);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const validateInformationById = async () => {
    setIsLoading(true);
    try {
      const res = await dispatch(getInformationById({ id: id || 0 })).unwrap();
      setInformationDetails(res);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeInformation = (name: string, value: string) => {
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitInformation = async () => {
    setIsPressing(true);
    try {
      const payload = {
        title: fields.title,
        descriptions: fields.descriptions,
      };
      await dispatch(createInformation({ data: payload })).unwrap();
      ToastAndroid.show("Berhasil membuat informasi", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Gagal membuat informasi", ToastAndroid.SHORT);
    } finally {
      validateInformation();
      if (closeModal) {
        closeModal();
      }
      setFields({
        title: "",
        descriptions: "",
      });
      setIsPressing(false);
    }
  };

  const deleteInformation = async () => {
    setIsLoading(true);
    try {
      await dispatch(deleteInformationById({ id: deleteId || 0 })).unwrap();
      ToastAndroid.show("Berhasil menghapus informasi", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Gagal menghapus informasi", ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
      if (closeModalDelete) {
        closeModalDelete();
      }
      validateInformation();
    }
  };

  return {
    validateInformation,
    information,
    isLoading,
    fields,
    handleChangeInformation,
    handleSubmitInformation,
    isPressing,
    validateInformationById,
    informationDetails,
    deleteInformation,
  };
}
