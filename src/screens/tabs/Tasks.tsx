import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { useAppSelector } from "../../store/hooks";
import {
  Booking,
  useBookingsQuery,
  useCancelBookingMutation,
  useCreateReviewMutation,
  useUpdateBookingStatusMutation,
} from "../../store/salonApi";
import { salonTheme } from "../../theme/salonTheme";

const filters = ["All", "pending", "confirmed", "in_progress", "completed", "cancelled"];

const latestStatus = (booking: Booking) =>
  booking.status?.[booking.status.length - 1]?.status || "pending";

const Tasks = () => {
  const role = useAppSelector((state) => state.auth.role);
  const [filter, setFilter] = useState(filters[0]);
  const { data: bookings = [], isFetching, refetch } = useBookingsQuery(
    filter === "All" ? undefined : { status: filter },
  );
  const [updateStatus, { isLoading: updating }] = useUpdateBookingStatusMutation();
  const [cancelBooking] = useCancelBookingMutation();
  const [createReview] = useCreateReviewMutation();
  const isCustomer = role === "customer";

  const canProgress = role === "owner" || role === "worker" || role === "admin";

  return (
    <SafeAreaProviderNoScroll zeroPadding>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item._id}
        refreshing={isFetching}
        onRefresh={refetch}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <Text style={styles.kicker}>
              {isCustomer ? "Customer booking history" : "Salon booking management"}
            </Text>
            <Text style={styles.title}>Bookings</Text>
            <Text style={styles.subtitle}>
              Status, cancellation windows, worker actions, reviews, and disputes are all driven by the API.
            </Text>
            <FlatList
              horizontal
              data={filters}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setFilter(item)}
                  style={[styles.filter, filter === item && styles.filterActive]}
                >
                  <Text style={[styles.filterText, filter === item && styles.filterTextActive]}>
                    {item}
                  </Text>
                </Pressable>
              )}
            />
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No bookings found</Text>
            <Text style={styles.emptyText}>Create a booking from the Book tab or seed demo data from Home.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.cardTitleBlock}>
                <Text style={styles.reference}>{item.booking_reference || item._id.slice(-8)}</Text>
                <Text style={styles.cardTitle}>
                  {isCustomer ? item.business?.name : item.user?.name || "Customer"}
                </Text>
                <Text style={styles.cardMeta}>
                  {item.services?.[0]?.name || "Salon service"} - {new Date(item.start_at || item.startTime || "").toLocaleString()}
                </Text>
              </View>
              <View style={styles.statusPill}>
                <Text style={styles.statusText}>{latestStatus(item)}</Text>
              </View>
            </View>

            <View style={styles.actionRow}>
              {canProgress && latestStatus(item) === "pending" ? (
                <Action
                  label="Confirm"
                  disabled={updating}
                  onPress={() => updateStatus({ id: item._id, status: "confirmed" })}
                />
              ) : null}
              {canProgress && latestStatus(item) === "confirmed" ? (
                <Action
                  label="Start"
                  disabled={updating}
                  onPress={() => updateStatus({ id: item._id, status: "in_progress" })}
                />
              ) : null}
              {canProgress && latestStatus(item) === "in_progress" ? (
                <Action
                  label="Complete"
                  disabled={updating}
                  onPress={() => updateStatus({ id: item._id, status: "completed" })}
                />
              ) : null}
              {canProgress ? (
                <Action
                  label="No Show"
                  muted
                  onPress={() => updateStatus({ id: item._id, status: "no_show", reason: "Customer did not arrive" })}
                />
              ) : null}
              {isCustomer && ["pending", "confirmed"].includes(latestStatus(item)) ? (
                <Action
                  label="Cancel"
                  muted
                  onPress={() => cancelBooking({ id: item._id, reason: "Customer requested cancellation" })}
                />
              ) : null}
              {isCustomer && latestStatus(item) === "completed" ? (
                <Action
                  label="Review"
                  onPress={() => createReview({ bookingId: item._id, rating: 5, description: "Great salon experience." })}
                />
              ) : null}
            </View>
          </View>
        )}
      />
    </SafeAreaProviderNoScroll>
  );
};

const Action = ({
  label,
  onPress,
  muted,
  disabled,
}: {
  label: string;
  onPress: () => void;
  muted?: boolean;
  disabled?: boolean;
}) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    style={[styles.action, muted && styles.actionMuted]}
  >
    <Text style={[styles.actionText, muted && styles.actionTextMuted]}>{label}</Text>
  </Pressable>
);

export default Tasks;

const styles = StyleSheet.create({
  content: {
    padding: salonTheme.spacing.lg,
    paddingBottom: 130,
    backgroundColor: salonTheme.colors.background,
  },
  kicker: {
    color: salonTheme.colors.primary,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  title: {
    marginTop: 4,
    color: salonTheme.colors.text,
    fontSize: 30,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 6,
    color: salonTheme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  filters: {
    gap: salonTheme.spacing.sm,
    paddingVertical: salonTheme.spacing.lg,
  },
  filter: {
    paddingHorizontal: salonTheme.spacing.md,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: salonTheme.colors.surface,
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
  },
  filterActive: {
    backgroundColor: salonTheme.colors.primary,
    borderColor: salonTheme.colors.primary,
  },
  filterText: {
    color: salonTheme.colors.textMuted,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "capitalize",
  },
  filterTextActive: {
    color: salonTheme.colors.surface,
  },
  card: {
    marginBottom: salonTheme.spacing.md,
    padding: salonTheme.spacing.lg,
    borderRadius: salonTheme.radius.lg,
    backgroundColor: salonTheme.colors.surface,
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: salonTheme.spacing.md,
  },
  cardTitleBlock: {
    flex: 1,
  },
  reference: {
    color: salonTheme.colors.textMuted,
    fontSize: 11,
    fontWeight: "800",
  },
  cardTitle: {
    marginTop: 4,
    color: salonTheme.colors.text,
    fontSize: 17,
    fontWeight: "900",
  },
  cardMeta: {
    marginTop: 4,
    color: salonTheme.colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  statusPill: {
    alignSelf: "flex-start",
    paddingHorizontal: salonTheme.spacing.sm,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: salonTheme.colors.infoSoft,
  },
  statusText: {
    color: salonTheme.colors.info,
    fontSize: 10,
    fontWeight: "900",
    textTransform: "capitalize",
  },
  actionRow: {
    marginTop: salonTheme.spacing.lg,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: salonTheme.spacing.sm,
  },
  action: {
    minHeight: 38,
    paddingHorizontal: salonTheme.spacing.md,
    borderRadius: salonTheme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: salonTheme.colors.primary,
  },
  actionMuted: {
    backgroundColor: salonTheme.colors.surfaceMuted,
  },
  actionText: {
    color: salonTheme.colors.surface,
    fontSize: 12,
    fontWeight: "900",
  },
  actionTextMuted: {
    color: salonTheme.colors.text,
  },
  empty: {
    padding: salonTheme.spacing.lg,
    borderRadius: salonTheme.radius.lg,
    backgroundColor: salonTheme.colors.surface,
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
  },
  emptyTitle: {
    color: salonTheme.colors.text,
    fontSize: 18,
    fontWeight: "900",
  },
  emptyText: {
    marginTop: 6,
    color: salonTheme.colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
});
