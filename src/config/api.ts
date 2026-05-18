const fallbackHost = "http://10.10.20.10:5000";

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || fallbackHost;
