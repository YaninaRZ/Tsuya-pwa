const SCOPES = "https://www.googleapis.com/auth/calendar.events";
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const getGoogleAuthUrl = (habitId) => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: `${window.location.origin}/auth/google/callback`,
    response_type: "code",
    scope: SCOPES,
    access_type: "offline",
    state: habitId,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
};

export const addHabitToCalendar = async (accessToken, habit) => {
  const now = new Date();
  const start = new Date(now);
  start.setHours(9, 0, 0, 0);
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + 30);

  const dayMap = {
    monday: "MO",
    tuesday: "TU",
    wednesday: "WE",
    thursday: "TH",
    friday: "FR",
    saturday: "SA",
    sunday: "SU",
  };

  const days =
    habit.reminder_days?.map((d) => dayMap[d]).join(",") || "MO,TU,WE,TH,FR";

  const event = {
    summary: `${habit.emoji || ""} ${habit.label}`,
    description: habit.description || `Habitude : ${habit.label}`,
    start: {
      dateTime: start.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: end.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    recurrence: [`RRULE:FREQ=WEEKLY;BYDAY=${days}`],
    reminders: {
      useDefault: false,
      overrides: habit.reminder_enabled
        ? [{ method: "popup", minutes: 10 }]
        : [],
    },
  };

  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    },
  );

  return response.json();
};
