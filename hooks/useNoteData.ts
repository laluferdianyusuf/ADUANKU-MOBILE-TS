import { Note } from "@/types/types";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createNotes, getNoteById } from "@/redux/reducers";
import { ToastAndroid } from "react-native";

interface NoteDataProps {
  id: number;
  handleModal: (text: string) => void;
}

interface FormData {
  name: string;
  description: string;
}
export function useNoteData({ id, handleModal }: NoteDataProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [field, setField] = useState<FormData>({
    name: "",
    description: "",
  });

  const handleChangeField = (name: string, value: string) => {
    setField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatedNoteData = async () => {
    setIsLoading(true);
    try {
      const res = await dispatch(getNoteById({ id: id })).unwrap();

      setNotes(res.data.note);
    } catch (error) {
      ToastAndroid.show("Gagal memuat", ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitNote = async () => {
    try {
      const payload = {
        officerName: field.name,
        description: field.description,
      };
      await dispatch(createNotes({ id: id, data: payload }));
      ToastAndroid.show("Berhasil membuat perkembangan", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Gagal membuat perkembangan", ToastAndroid.SHORT);
    } finally {
      validatedNoteData();
      handleModal("ProgressList");
      setField({
        name: "",
        description: "",
      });
    }
  };

  return {
    notes,
    validatedNoteData,
    isLoading,
    handleChangeField,
    field,
    handleSubmitNote,
  };
}
