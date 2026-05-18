import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config/api";
import { RootState } from "./store";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type Salon = {
  _id: string;
  name: string;
  description?: string;
  category?: string;
  logo?: string | null;
  banner?: string | null;
  photos?: string[];
  address?: { street_address?: string; upazilas?: string; districts?: string };
  location?: { coordinates: [number, number] };
  rating?: number;
  total_reviews?: number;
  distance_km?: number;
  is_approve?: boolean;
  salon_status?: "active" | "temporarily_closed" | "permanently_closed";
  operating_hours?: Record<string, { open: boolean; open_time: string; close_time: string }>;
  concurrent_booking_cap?: number;
  slot_duration_minutes?: number;
};

export type SalonService = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  duration_minutes?: number;
  estimated_time?: number;
  active?: boolean;
  concurrent_booking_limit?: number;
  assigned_workers?: string[];
  promo_price?: number | null;
  promo_start?: string | null;
  promo_end?: string | null;
};

export type WorkerProfile = {
  _id: string;
  user: { _id: string; name: string; email?: string; phone?: string; img?: string };
  salon: string;
  active: boolean;
  bio?: string;
  assigned_services?: SalonService[];
  leaves?: { date: string; reason?: string }[];
};

export type Booking = {
  _id: string;
  booking_reference?: string;
  business: Salon;
  user: { _id: string; name: string; phone?: string; email?: string };
  worker?: { _id: string; name: string; phone?: string; email?: string };
  services: SalonService[];
  start_at?: string;
  end_at?: string;
  startTime?: string;
  endTime?: string;
  status: { status: string; time: string; reason?: string }[];
  note?: string;
};

export type Slot = {
  start_at: string;
  end_at: string;
  time: string;
  remaining_capacity: number;
};

const unwrap = <T>(response: ApiResponse<T>) => response.data;

export const salonApi = createApi({
  reducerPath: "salonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [
    "Me",
    "Salon",
    "Service",
    "Worker",
    "Booking",
    "Notification",
    "Point",
    "Review",
    "Dispute",
    "User",
  ],
  endpoints: (builder) => ({
    login: builder.mutation<
      { user: any; accessToken: string; refreshToken: string },
      { email: string; password: string; device_name?: string }
    >({
      query: (body) => ({ url: "/api/v1/auth/login", method: "POST", body }),
      transformResponse: unwrap,
      invalidatesTags: ["Me"],
    }),
    customerSignup: builder.mutation<any, any>({
      query: (body) => ({ url: "/api/v1/auth/customer-signup", method: "POST", body }),
      transformResponse: unwrap,
    }),
    ownerSignup: builder.mutation<any, any>({
      query: (body) => ({ url: "/api/v1/auth/owner-signup", method: "POST", body }),
      transformResponse: unwrap,
    }),
    me: builder.query<{ user: any }, void>({
      query: () => "/api/v1/me",
      transformResponse: unwrap,
      providesTags: ["Me"],
    }),
    salons: builder.query<Salon[], { search?: string; lat?: number; lng?: number; radius_km?: number } | void>({
      query: (params) => ({ url: "/api/v1/salons", params: params || undefined }),
      transformResponse: unwrap,
      providesTags: ["Salon"],
    }),
    salon: builder.query<Salon & { services: SalonService[]; workers: WorkerProfile[]; reviews: any[] }, string>({
      query: (id) => `/api/v1/salons/${id}`,
      transformResponse: unwrap,
      providesTags: (_result, _error, id) => [{ type: "Salon", id }],
    }),
    mySalons: builder.query<Salon[], void>({
      query: () => "/api/v1/owner/salons",
      transformResponse: unwrap,
      providesTags: ["Salon"],
    }),
    updateSalon: builder.mutation<Salon, { id: string; body: Partial<Salon> }>({
      query: ({ id, body }) => ({ url: `/api/v1/salons/${id}`, method: "PATCH", body }),
      transformResponse: unwrap,
      invalidatesTags: ["Salon"],
    }),
    services: builder.query<SalonService[], { salonId: string; includeInactive?: boolean }>({
      query: ({ salonId, includeInactive }) => ({
        url: `/api/v1/salons/${salonId}/services`,
        params: includeInactive ? { includeInactive: "true" } : undefined,
      }),
      transformResponse: unwrap,
      providesTags: ["Service"],
    }),
    createService: builder.mutation<SalonService, { salonId: string; body: Partial<SalonService> }>({
      query: ({ salonId, body }) => ({
        url: `/api/v1/salons/${salonId}/services`,
        method: "POST",
        body,
      }),
      transformResponse: unwrap,
      invalidatesTags: ["Service", "Salon"],
    }),
    updateService: builder.mutation<SalonService, { salonId: string; serviceId: string; body: Partial<SalonService> }>({
      query: ({ salonId, serviceId, body }) => ({
        url: `/api/v1/salons/${salonId}/services/${serviceId}`,
        method: "PATCH",
        body,
      }),
      transformResponse: unwrap,
      invalidatesTags: ["Service", "Salon"],
    }),
    workers: builder.query<WorkerProfile[], string>({
      query: (salonId) => `/api/v1/salons/${salonId}/workers`,
      transformResponse: unwrap,
      providesTags: ["Worker"],
    }),
    createWorker: builder.mutation<WorkerProfile, { salonId: string; body: any }>({
      query: ({ salonId, body }) => ({
        url: `/api/v1/salons/${salonId}/workers`,
        method: "POST",
        body,
      }),
      transformResponse: unwrap,
      invalidatesTags: ["Worker"],
    }),
    slots: builder.query<Slot[], { salon: string; service: string; date: string; worker?: string }>({
      query: (params) => ({ url: "/api/v1/slots", params }),
      transformResponse: unwrap,
    }),
    bookings: builder.query<Booking[], { status?: string; date?: string; salon?: string } | void>({
      query: (params) => ({ url: "/api/v1/bookings", params: params || undefined }),
      transformResponse: unwrap,
      providesTags: ["Booking"],
    }),
    createBooking: builder.mutation<Booking, any>({
      query: (body) => ({ url: "/api/v1/bookings", method: "POST", body }),
      transformResponse: unwrap,
      invalidatesTags: ["Booking", "Notification", "Point"],
    }),
    updateBookingStatus: builder.mutation<Booking, { id: string; status: string; reason?: string }>({
      query: ({ id, ...body }) => ({
        url: `/api/v1/bookings/${id}/status`,
        method: "PATCH",
        body,
      }),
      transformResponse: unwrap,
      invalidatesTags: ["Booking", "Notification", "Point"],
    }),
    cancelBooking: builder.mutation<Booking, { id: string; reason: string }>({
      query: ({ id, reason }) => ({
        url: `/api/v1/bookings/${id}/cancel`,
        method: "POST",
        body: { reason },
      }),
      transformResponse: unwrap,
      invalidatesTags: ["Booking", "Notification"],
    }),
    createReview: builder.mutation<any, { bookingId: string; rating: number; description?: string }>({
      query: ({ bookingId, ...body }) => ({
        url: `/api/v1/bookings/${bookingId}/review`,
        method: "POST",
        body,
      }),
      transformResponse: unwrap,
      invalidatesTags: ["Review", "Point", "Salon"],
    }),
    notifications: builder.query<any[], void>({
      query: () => "/api/v1/notifications",
      transformResponse: unwrap,
      providesTags: ["Notification"],
    }),
    markNotificationRead: builder.mutation<any, string>({
      query: (id) => ({ url: `/api/v1/notifications/${id}/read`, method: "PATCH" }),
      transformResponse: unwrap,
      invalidatesTags: ["Notification"],
    }),
    points: builder.query<{ balance: number; ledger: any[] }, void>({
      query: () => "/api/v1/points",
      transformResponse: unwrap,
      providesTags: ["Point"],
    }),
    disputes: builder.query<any[], void>({
      query: () => "/api/v1/disputes",
      transformResponse: unwrap,
      providesTags: ["Dispute"],
    }),
    createDispute: builder.mutation<any, { bookingId: string; reason: string; evidence?: string[] }>({
      query: ({ bookingId, ...body }) => ({
        url: `/api/v1/bookings/${bookingId}/disputes`,
        method: "POST",
        body,
      }),
      transformResponse: unwrap,
      invalidatesTags: ["Dispute"],
    }),
    adminUsers: builder.query<any[], { role?: string; search?: string } | void>({
      query: (params) => ({ url: "/api/v1/admin/users", params: params || undefined }),
      transformResponse: unwrap,
      providesTags: ["User"],
    }),
    seedDemo: builder.mutation<any, void>({
      query: () => ({ url: "/api/v1/admin/seed-demo", method: "POST" }),
      transformResponse: unwrap,
      invalidatesTags: ["Salon", "Service", "Worker", "User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useCustomerSignupMutation,
  useOwnerSignupMutation,
  useMeQuery,
  useSalonsQuery,
  useSalonQuery,
  useMySalonsQuery,
  useUpdateSalonMutation,
  useServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useWorkersQuery,
  useCreateWorkerMutation,
  useSlotsQuery,
  useBookingsQuery,
  useCreateBookingMutation,
  useUpdateBookingStatusMutation,
  useCancelBookingMutation,
  useCreateReviewMutation,
  useNotificationsQuery,
  useMarkNotificationReadMutation,
  usePointsQuery,
  useDisputesQuery,
  useCreateDisputeMutation,
  useAdminUsersQuery,
  useSeedDemoMutation,
} = salonApi;
