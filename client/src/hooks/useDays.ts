import { useEffect, useState } from "react";
import { useSearchStore } from "../states/store";
import { differenceInCalendarDays } from "date-fns";

export const useDays = () => {
  const [days, setDays] = useState<number>(0);
  const { dates } = useSearchStore();

  useEffect(() => {
    if (dates && dates.from && dates.to) {
      setDays(differenceInCalendarDays(dates?.to, dates?.from));
    }
  }, [dates]);

  return {days};
};
