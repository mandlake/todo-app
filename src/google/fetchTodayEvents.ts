"use client";

import { gapi } from "gapi-script";
import type { CalendarEvent } from "../types/calenderEvent";

export const fetchTodayEvents = async () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const response = await gapi.client.calendar.events.list({
    calendarId: "primary",
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    showDeleted: false,
    singleEvents: true,
    orderBy: "startTime",
  });

  const events = response.result.items || [];
  console.log("오늘의 일정:", events);

  return events.map((event: CalendarEvent) => ({
    id: event.id,
    title: event.summary || "(제목 없음)",
  }));
};
