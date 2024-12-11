import { useState } from "react";
import { Complaint, Information, User } from "@/types/types";

interface SearchProps {
  isWhat: string;
  allComplaints: Complaint[];
  complaintsDone: Complaint[];
  complaintsProcess: Complaint[];
  complaintsProgress: Complaint[];
  information: Information[];
  isLoading?: boolean;
}

export const useSearch = ({
  isWhat,
  allComplaints,
  complaintsDone,
  complaintsProcess,
  complaintsProgress,
  information,
}: SearchProps) => {
  const [query, setQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = (query: string) => {
    setQuery(query);
    setIsLoading(true);
    if (isWhat === "isInformation") {
      const filteredInformation = information.filter(
        (item) =>
          item.title!.toLowerCase().includes(query.toLowerCase()) ||
          item.descriptions!.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filteredInformation);
      setIsLoading(false);
    } else if (
      isWhat === "isProcess" ||
      isWhat === "isProgress" ||
      isWhat === "isHistory"
    ) {
      let filteredComplaints: any[] = [];

      switch (isWhat) {
        case "isProcess":
          filteredComplaints = complaintsProcess.filter((item) =>
            item.complaintName!.toLowerCase().includes(query.toLowerCase())
          );
          break;
        case "isProgress":
          filteredComplaints = complaintsProgress.filter((item) =>
            item.complaintName!.toLowerCase().includes(query.toLowerCase())
          );
          break;
        case "isHistory":
          filteredComplaints = complaintsDone.filter((item) =>
            item.complaintName!.toLowerCase().includes(query.toLowerCase())
          );
          break;
        default:
          filteredComplaints = allComplaints.filter((item) =>
            item.complaintName!.toLowerCase().includes(query.toLowerCase())
          );
      }

      setFilteredData(filteredComplaints);
      setIsLoading(false);
    } else if (isWhat === "isAll") {
      const allComplaintsFiltered = allComplaints.filter((item) =>
        item.complaintName!.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(allComplaintsFiltered);
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  return {
    filteredData,
    handleSearch,
    query,
    handleClear,
    isLoading,
  };
};
