import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createComplaint } from "@/redux/reducers";
import { ToastAndroid } from "react-native";
import { router } from "expo-router";

interface Victim {
  name: string;
  borndate: string;
  c_gender: string;
  national_id: string;
  address: string;
  phone: string;
  c_education: string;
  parent_name: string;
  occupation: string;
  parent_address: string;
  parent_phone: string;
}

interface Abuser {
  name: string;
  borndate: string;
  d_gender: string;
  address: string;
  d_education: string;
  occupation: string;
  status: string;
  relation: string;
}

interface FirstFormData {
  name: string;
  phone: string;
  address: string;
  a_education: string;
  relation: string;
}

interface SecondFormData {
  name: string;
  phone: string;
  address: string;
  b_education: string;
  relation: string;
}

interface FifthFormData {
  physics: string;
  sexual: string;
  psychology: string;
  economy: string;
  chronology: string;
}

interface FormDataProps {
  id?: number;
  validateDataCount?: () => void;
}
export function useFormData({ id, validateDataCount }: FormDataProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [firstFormData, setFirstForm] = useState<FirstFormData>({
    name: "",
    phone: "",
    address: "",
    a_education: "",
    relation: "",
  });
  const [secondFormData, setSecondForm] = useState<SecondFormData>({
    name: "",
    phone: "",
    address: "",
    b_education: "",
    relation: "",
  });
  const [thirdFormData, setThirdForm] = useState<Victim[]>([
    {
      name: "",
      borndate: "",
      c_gender: "",
      national_id: "",
      address: "",
      phone: "",
      c_education: "",
      parent_name: "",
      occupation: "",
      parent_address: "",
      parent_phone: "",
    },
  ]);
  const [forthFormData, setForthForm] = useState<Abuser[]>([
    {
      name: "",
      borndate: "",
      d_gender: "",
      address: "",
      d_education: "",
      occupation: "",
      status: "",
      relation: "",
    },
  ]);
  const [fifthFormData, setFifthForm] = useState<FifthFormData>({
    physics: "",
    sexual: "",
    psychology: "",
    economy: "",
    chronology: "",
  });
  const [caseTypes, setCaseTypes] = useState<string>("");
  const [caseLocation, setCaseLocation] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleChangeFirstForm = (name: string, value: string) => {
    setFirstForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectFirstForm = (value: string) => {
    setFirstForm((prevData) => ({
      ...prevData,
      a_education: value,
    }));
  };

  const handleChangeSecondForm = (name: string, value: string) => {
    setSecondForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectSecondForm = (value: string) => {
    setSecondForm((prevData) => ({
      ...prevData,
      b_education: value,
    }));
  };

  const handleChangeThirdForm = (
    index: number,
    name: string,
    value: string
  ) => {
    setThirdForm((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  };

  const handleSelectThirdForm = (
    index: number,
    field: "c_education" | "c_gender",
    value: string
  ) => {
    setThirdForm((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const addVictim = () => {
    setThirdForm([
      ...thirdFormData,
      {
        name: "",
        borndate: "",
        c_gender: "",
        national_id: "",
        address: "",
        phone: "",
        c_education: "",
        parent_name: "",
        occupation: "",
        parent_address: "",
        parent_phone: "",
      },
    ]);
  };

  const removeVictim = (index: number) => {
    setThirdForm((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleChangeForthForm = (
    index: number,
    name: string,
    value: string
  ) => {
    setForthForm((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  };

  const handleSelectForthForm = (
    index: number,
    field: "d_education" | "d_gender" | "status",
    value: string
  ) => {
    setForthForm((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleChangeFifthForm = (name: string, value: string) => {
    setFifthForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addAbuser = () => {
    setForthForm([
      ...forthFormData,
      {
        name: "",
        borndate: "",
        d_gender: "",
        address: "",
        d_education: "",
        occupation: "",
        status: "",
        relation: "",
      },
    ]);
  };

  const removeAbuser = (index: number) => {
    setForthForm((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formattedVictims = thirdFormData.map((victim) => ({
        name: victim.name,
        birthday: victim.borndate,
        gender: victim.c_gender,
        nik: victim.national_id,
        address: victim.address,
        phoneNumber: victim.phone,
        education: victim.c_education,
        parentName: victim.parent_name,
        parentJob: victim.occupation,
        parentAddress: victim.parent_address,
        parentNumber: victim.parent_phone,
      }));

      const formattedAbusers = forthFormData.map((abuser) => ({
        name: abuser.name,
        birthday: abuser.borndate,
        gender: abuser.d_gender,
        address: abuser.address,
        education: abuser.d_education,
        job: abuser.occupation,
        status: abuser.status,
        relation: abuser.relation,
      }));

      await dispatch(
        createComplaint({
          id: id!,
          data: {
            complaintName: firstFormData.name,
            complaintAddress: firstFormData.address,
            complaintEducate: firstFormData.a_education,
            complaintNumber: firstFormData.phone,
            complaintRelation: firstFormData.relation,
            companionName: secondFormData.name,
            companionAddress: secondFormData.address,
            companionEducate: secondFormData.b_education,
            companionNumber: secondFormData.phone,
            companionRelation: secondFormData.relation,
            victims: formattedVictims,
            abusers: formattedAbusers,
            caseType: caseTypes,
            caseViolence: caseLocation,
            physical: fifthFormData.physics,
            sexual: fifthFormData.sexual,
            psychology: fifthFormData.psychology,
            economy: fifthFormData.economy,
            chronology: fifthFormData.chronology,
          },
        })
      ).unwrap();
      router.back();
      ToastAndroid.show("Berhasil membuat pengaduan", ToastAndroid.SHORT);
      setSuccess("Form submitted");
    } catch (error) {
      ToastAndroid.show("Gagal membuat pengaduan", ToastAndroid.SHORT);
      setError("Submission error");
    } finally {
      if (validateDataCount) {
        validateDataCount();
      }
      setIsLoading(false);
    }
  };

  return {
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
    isLoading,
    error,
    success,
    caseTypes,
    caseLocation,
  };
}
