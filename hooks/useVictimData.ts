import { getVictimCount } from "@/redux/reducers";
import { AppDispatch } from "@/redux/store";
import { Victim } from "@/types/types";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function useVictimData() {
  const [count, setCount] = useState<Victim | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const countVictims = async () => {
    setIsLoading(true);
    try {
      const res = await dispatch(getVictimCount()).unwrap();
      setCount(res.data.victim);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    count,
    countVictims,
    isLoading,
  };
}
