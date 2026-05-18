export const salonTheme = {
  colors: {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceMuted: "#F1F5F9",
    border: "#E2E8F0",
    borderStrong: "#CBD5E1",
    text: "#0F172A",
    textMuted: "#64748B",
    primary: "#0F766E",
    primaryDark: "#134E4A",
    primarySoft: "#CCFBF1",
    accent: "#C2410C",
    accentSoft: "#FFEDD5",
    warning: "#B45309",
    warningSoft: "#FEF3C7",
    success: "#15803D",
    successSoft: "#DCFCE7",
    info: "#1D4ED8",
    infoSoft: "#DBEAFE",
  },
  radius: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
};

export type SalonRole = "customer" | "owner" | "worker" | "admin";
