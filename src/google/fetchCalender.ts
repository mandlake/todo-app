"use client";

import { gapi } from "gapi-script";
import type { CalendarEvent } from "../types/calenderEvent";

export const fetchTodayEvents = async () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const response = await gapi.client.calendar.events.list({
    calendarId: "primary",
    timeMin: startOfDay.toISOString(),
    timeMax: endOfDay.toISOString(),
    showDeleted: false,
    singleEvents: true,
    orderBy: "startTime",
  });

  const events = response.result.items || [];

  return events.map((event: CalendarEvent) => ({
    id: event.id,
    title: event.summary || "(제목 없음)",
  }));
};
