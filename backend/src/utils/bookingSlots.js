import { DateTime } from "luxon";

export const BOOKING_TIME_ZONE = "Europe/Berlin";
export const BOOKING_DAYS = 7;
export const SLOT_MINUTES = 30;

export function getBookingDay(date) {
  return DateTime.fromISO(date, {
    zone: BOOKING_TIME_ZONE,
  }).startOf("day");
}

export function isBookableDate(date) {
  const day = getBookingDay(date);

  const today = DateTime.now()
    .setZone(BOOKING_TIME_ZONE)
    .startOf("day");

  return (
    day.isValid &&
    day.toMillis() >= today.toMillis() &&
    day.toMillis() < today.plus({ days: BOOKING_DAYS }).toMillis()
  );
}

export function createDaySlots(date) {
  const day = getBookingDay(date);
  const closingTime = day.set({ hour: 21 });
  const now = DateTime.now().toMillis();

  const slots = [];

  for (
    let time = day.set({ hour: 10 });
    time.toMillis() < closingTime.toMillis();
    time = time.plus({ minutes: SLOT_MINUTES })
  ) {
    if (time.toMillis() <= now) {
      continue;
    }

    slots.push({
      startsAt: time.toUTC().toISO(),
      time: time.toFormat("HH:mm", { locale: "en" }),
    });
  }

  return slots;
}