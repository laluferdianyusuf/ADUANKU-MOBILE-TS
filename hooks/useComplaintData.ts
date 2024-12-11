import {
  deleteComplaint,
  getAllComplaints,
  getAllComplaintsByAdmin,
  getComplaintId,
  getComplaintIsDone,
  getComplaintIsProcessing,
  getComplaintIsProgress,
  getComplaintViolence,
  updateComplaintToDone,
  updateComplaintToProcess,
} from "@/redux/reducers";
import { AppDispatch } from "@/redux/store";
import { Complaint, User } from "@/types/types";
import { useState } from "react";
import { ToastAndroid } from "react-native";
import { useDispatch } from "react-redux";

interface UseComplaintDataProps {
  id?: number;
  user?: User;
  isWhat?: string;
  complaintId?: number;
  closeModal?: () => void;
}

export function useComplaintData({
  id,
  user,
  complaintId,
  closeModal,
}: UseComplaintDataProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [allComplaints, setAllComplaints] = useState<Complaint[]>([]);
  const [complaintsProcess, setComplaintsProcess] = useState<Complaint[]>([]);
  const [complaintsProgress, setComplaintsProgress] = useState<Complaint[]>([]);
  const [complaintsDone, setComplaintsDone] = useState<Complaint[]>([]);
  const [complaintsDetails, setComplaintsDetails] = useState<Complaint>({});
  const [complaintsViolence, setComplaintsViolence] = useState<Complaint[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const validateAllComplaints = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      if (user!.role === "admin" || user?.role === "superadmin") {
        const res = await dispatch(getAllComplaintsByAdmin()).unwrap();
        setAllComplaints(res.data.complaint || []);
      } else {
        const res = await dispatch(getAllComplaints({ id: id! })).unwrap();
        setAllComplaints(res.data.complaint || []);
      }
      setSuccess("Complaints validated successfully");
    } catch (error) {
      setError("Error validate");
    } finally {
      setIsLoading(false);
    }
  };

  const validateProcessingComplaints = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await dispatch(
        getComplaintIsProcessing({ id: id ?? 0 })
      ).unwrap();

      setComplaintsProcess(res.data.complaint || []);
      setSuccess("Complaints validated successfully");
    } catch (error) {
      setError("Error validate");
    } finally {
      setIsLoading(false);
    }
  };

  const validateProgressComplaints = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await dispatch(
        getComplaintIsProgress({ id: id ?? 0 })
      ).unwrap();
      setComplaintsProgress(res.data.complaint || []);
      setSuccess("Complaints validated successfully");
    } catch (error) {
      setError("Error validate");
    } finally {
      setIsLoading(false);
    }
  };
  const validateDoneComplaints = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await dispatch(getComplaintIsDone({ id: id ?? 0 })).unwrap();
      setComplaintsDone(res.data.complaint || []);
      setSuccess("Complaints validated successfully");
    } catch (error) {
      setError("Error validate");
    } finally {
      setIsLoading(false);
    }
  };

  const validateComplaintDetails = async () => {
    setIsLoading(true);
    try {
      const res = await dispatch(getComplaintId({ id: id! })).unwrap();

      setComplaintsDetails(res);
    } catch (error) {
      setError("Error Validate");
    } finally {
      setIsLoading(false);
    }
  };

  const validateComplaintViolence = async () => {
    setIsLoading(true);
    try {
      const res = await dispatch(getComplaintViolence({})).unwrap();

      setComplaintsViolence(res.data.complaint);
    } catch (error) {
      setError("Error Validate");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComplaintById = async () => {
    setIsLoading(true);
    try {
      await dispatch(deleteComplaint({ id: complaintId || 0 })).unwrap();

      ToastAndroid.show("Berhasil menghapus pengaduan", ToastAndroid.SHORT);
      await validateProcessingComplaints();
    } catch (error) {
      ToastAndroid.show("Gagal menghapus pengaduan", ToastAndroid.SHORT);
    } finally {
      if (closeModal) {
        closeModal();
      }
      setIsLoading(false);
    }
  };

  const processComplaint = async () => {
    setIsLoading(true);
    try {
      await dispatch(updateComplaintToProcess({ id: Number(complaintId) }));
      ToastAndroid.show("Kasus diterima", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Gagal terima kasus", ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
      validateAllComplaints();
    }
  };

  const finishComplaint = async () => {
    setIsLoading(true);
    try {
      await dispatch(updateComplaintToDone({ id: Number(complaintId) }));
      ToastAndroid.show("Kasus Selesai", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Gagal menyelesaikan kasus", ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
      validateProgressComplaints();
    }
  };

  return {
    validateAllComplaints,
    validateProcessingComplaints,
    validateProgressComplaints,
    validateDoneComplaints,
    validateComplaintDetails,
    allComplaints,
    complaintsProcess,
    complaintsProgress,
    complaintsDone,
    complaintsDetails,
    error,
    success,
    isLoading,
    validateComplaintViolence,
    complaintsViolence,
    deleteComplaintById,
    processComplaint,
    finishComplaint,
  };
}
