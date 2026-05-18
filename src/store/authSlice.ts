import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SalonRole } from "../theme/salonTheme";

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  img?: string | null;
  role: SalonRole | "ADMIN" | "SUPER_ADMIN";
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  role: SalonRole;
}

const normalizeRole = (role?: string): SalonRole => {
  if (role === "SALON_OWNER" || role === "VENDOR" || role === "owner") return "owner";
  if (role === "WORKER" || role === "PROFESSIONAL" || role === "worker") return "worker";
  if (role === "ADMIN" || role === "SUPER_ADMIN" || role === "admin") return "admin";
  return "customer";
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  role: "customer",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: AuthUser;
        accessToken: string;
        refreshToken?: string;
      }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken || state.refreshToken;
      state.role = normalizeRole(action.payload.user.role);
    },
    setRole: (state, action: PayloadAction<SalonRole>) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.role = "customer";
    },
  },
});

export const { setCredentials, setRole, logout } = authSlice.actions;
export { normalizeRole };
export default authSlice.reducer;
