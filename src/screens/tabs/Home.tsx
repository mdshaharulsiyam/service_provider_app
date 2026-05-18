import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { useAppSelector } from "../../store/hooks";
import {
  Salon,
  useBookingsQuery,
  useMySalonsQuery,
  useNotificationsQuery,
  usePointsQuery,
  useSalonsQuery,
  useSeedDemoMutation,
} from "../../store/salonApi";
import { salonTheme } from "../../theme/salonTheme";
import Navigate from "../../utils/Navigate";

const latestStatus = (booking: any) =>
  booking?.status?.[booking.status.length - 1]?.status || "pending";

const Home = () => {
  const role = useAppSelector((state) => state.auth.role);
  const user = useAppSelector((state) => state.auth.user);
  const navigate = Navigate();
  const { data: salons = [], isFetching: salonsLoading } = useSalonsQuery();
  const { data: mySalons = [] } = useMySalonsQuery(undefined, {
    skip: role !== "owner" && role !== "admin",
  });
  const { data: bookings = [] } = useBookingsQuery();
  const { data: notifications = [] } = useNotificationsQuery(undefined, {
    skip: !user,
  });
  const { data: points } = usePointsQuery(undefined, { skip: !user });
  const [seedDemo, { isLoading: seeding }] = useSeedDemoMutation();

  const isCustomer = role === "customer";
  const activeBookings = bookings.filter((booking) =>
    ["pending", "confirmed", "in_progress", "late_cancellation_requested"].includes(
      latestStatus(booking),
    ),
  );
  const unread = notifications.filter((item) => !item.read_at && !item.read_by_user).length;
  const ownedSalon = mySalons[0];

  return (
    <SafeAreaProviderNoScroll zeroPadding>
      <FlatList
        data={isCustomer ? salons : activeBookings}
        keyExtractor={(item: any) => item._id}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>
              {salonsLoading ? "Loading salon data..." : "No live records yet"}
            </Text>
            <Text style={styles.emptyText}>
              Seed demo data from the API or create your first salon workflow.
            </Text>
            <Pressable
              style={styles.primaryButton}
              onPress={() => seedDemo()}
              disabled={seeding}
            >
              <Text style={styles.primaryButtonText}>
                {seeding ? "Preparing..." : "Seed Demo Data"}
              </Text>
            </Pressable>
          </View>
        }
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.kicker}>
                  {role === "owner"
                    ? "Salon owner dashboard"
                    : role === "worker"
                    ? "Worker schedule"
                    : role === "admin"
                    ? "Admin control"
                    : "Customer booking"}
                </Text>
                <Text style={styles.title}>SalonPro</Text>
                <Text style={styles.subtitle}>
                  {user?.name
                    ? `Welcome back, ${user.name}.`
                    : "Book, manage, complete, review, and support salon appointments."}
                </Text>
              </View>
              <Pressable style={styles.badge} onPress={() => navigate("Notifications")}>
                <Text style={styles.badgeText}>{unread}</Text>
              </Pressable>
            </View>

            <View style={styles.statGrid}>
              <Stat label={isCustomer ? "Active bookings" : "Today queue"} value={`${activeBookings.length}`} />
              <Stat label={role === "owner" ? "My salons" : "Points"} value={`${role === "owner" ? mySalons.length : points?.balance || 0}`} />
              <Stat label="Unread" value={`${unread}`} />
            </View>

            {role === "owner" && ownedSalon ? (
              <View style={styles.panel}>
                <Text style={styles.panelKicker}>Current salon</Text>
                <Text style={styles.panelTitle}>{ownedSalon.name}</Text>
                <Text style={styles.panelMeta}>
                  {ownedSalon.is_approve ? "Approved" : "Pending approval"} - {ownedSalon.salon_status || "active"}
                </Text>
              </View>
            ) : null}

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {isCustomer ? "Nearby salons" : "Booking queue"}
              </Text>
              <Pressable onPress={() => navigate(isCustomer ? "PostTask" : "Task")}>
                <Text style={styles.sectionAction}>{isCustomer ? "Book" : "Manage"}</Text>
              </Pressable>
            </View>
          </>
        }
        renderItem={({ item }: { item: any }) =>
          isCustomer ? <SalonCard salon={item} /> : <BookingCard booking={item} />
        }
        contentContainerStyle={styles.content}
      />
    </SafeAreaProviderNoScroll>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.stat}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const SalonCard = ({ salon }: { salon: Salon }) => (
  <View style={styles.card}>
    <View style={styles.cardTop}>
      <View>
        <Text style={styles.cardTitle}>{salon.name}</Text>
        <Text style={styles.cardMeta}>
          {salon.category || "Salon"} - {salon.rating?.toFixed?.(1) || "0.0"} rating
          {salon.distance_km ? ` - ${salon.distance_km} km` : ""}
        </Text>
      </View>
      <View style={styles.statusPill}>
        <Text style={styles.statusText}>{salon.salon_status || "active"}</Text>
      </View>
    </View>
    <Text style={styles.cardText}>
      {salon.address?.street_address || "Address available on profile"}
    </Text>
  </View>
);

const BookingCard = ({ booking }: { booking: any }) => (
  <View style={styles.card}>
    <View style={styles.cardTop}>
      <View>
        <Text style={styles.cardTitle}>
          {booking.booking_reference || booking._id?.slice?.(-6)}
        </Text>
        <Text style={styles.cardMeta}>
          {booking.services?.[0]?.name || "Salon service"} -{" "}
          {new Date(booking.start_at || booking.startTime).toLocaleString()}
        </Text>
      </View>
      <View style={styles.statusPill}>
        <Text style={styles.statusText}>{latestStatus(booking)}</Text>
      </View>
    </View>
    <Text style={styles.cardText}>
      {booking.business?.name || "Salon"} - {booking.user?.name || "Customer"}
    </Text>
  </View>
);

export default Home;

const styles = StyleSheet.create({
  content: {
    padding: salonTheme.spacing.lg,
    paddingBottom: 130,
    backgroundColor: salonTheme.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: salonTheme.spacing.md,
    marginBottom: salonTheme.spacing.lg,
  },
  kicker: {
    color: salonTheme.colors.primary,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  title: {
    color: salonTheme.colors.text,
    fontSize: 31,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 4,
    color: salonTheme.colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: salonTheme.colors.surface,
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
  },
  badgeText: {
    color: salonTheme.colors.accent,
    fontWeight: "900",
  },
  statGrid: {
    flexDirection: "row",
    gap: salonTheme.spacing.sm,
  },
  stat: {
    flex: 1,
    padding: salonTheme.spacing.md,
    borderRadius: salonTheme.radius.lg,
    backgroundColor: salonTheme.colors.surface,
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
  },
  statValue: {
    color: salonTheme.colors.text,
    fontSize: 22,
    fontWeight: "900",
  },
  statLabel: {
    marginTop: 4,
    color: salonTheme.colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
  },
  panel: {
    marginTop: salonTheme.spacing.lg,
    padding: salonTheme.spacing.lg,
    borderRadius: salonTheme.radius.lg,
    backgroundColor: salonTheme.colors.primaryDark,
  },
  panelKicker: {
    color: salonTheme.colors.primarySoft,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  panelTitle: {
    marginTop: 4,
    color: salonTheme.colors.surface,
    fontSize: 22,
    fontWeight: "900",
  },
  panelMeta: {
    marginTop: 6,
    color: "#D7F5EF",
    fontSize: 13,
  },
  sectionHeader: {
    marginTop: salonTheme.spacing.xl,
    marginBottom: salonTheme.spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: salonTheme.colors.text,
    fontSize: 18,
    fontWeight: "900",
  },
  sectionAction: {
    color: salonTheme.colors.primary,
    fontSize: 13,
    fontWeight: "900",
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
  cardTitle: {
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
  cardText: {
    marginTop: salonTheme.spacing.md,
    color: salonTheme.colors.text,
    fontSize: 13,
    lineHeight: 19,
  },
  statusPill: {
    alignSelf: "flex-start",
    paddingHorizontal: salonTheme.spacing.sm,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: salonTheme.colors.accentSoft,
  },
  statusText: {
    color: salonTheme.colors.accent,
    fontSize: 10,
    fontWeight: "900",
    textTransform: "capitalize",
  },
  empty: {
    marginTop: salonTheme.spacing.xl,
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
  primaryButton: {
    marginTop: salonTheme.spacing.md,
    minHeight: 44,
    borderRadius: salonTheme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: salonTheme.colors.primary,
  },
  primaryButtonText: {
    color: salonTheme.colors.surface,
    fontSize: 14,
    fontWeight: "900",
  },
});
