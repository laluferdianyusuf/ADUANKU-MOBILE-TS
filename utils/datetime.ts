import { format, parseISO, isToday, isYesterday, isTomorrow } from "date-fns";
import { id } from "date-fns/locale";

export const formatTime = (timeString: string | undefined) => {
  if (!timeString) return "Tidak ada waktu tersedia";

  try {
    const [hours, minutes, seconds] = timeString.split(":");
    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    date.setSeconds(Number(seconds));

    return format(date, "HH:mm", { locale: id });
  } catch (error) {
    console.error("Error formatting time:", error);
    return "Waktu tidak valid";
  }
};

export const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "Tidak ada tanggal tersedia";

  try {
    const date = parseISO(dateString);

    if (isToday(date)) {
      return `Hari ini, ${format(date, "d MMMM yyyy", { locale: id })}`;
    }
    if (isYesterday(date)) {
      return `Kemarin, ${format(date, "d MMMM yyyy", { locale: id })}`;
    }
    return format(date, "eeee, d MMMM yyyy", { locale: id });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Tanggal tidak valid";
  }
};
