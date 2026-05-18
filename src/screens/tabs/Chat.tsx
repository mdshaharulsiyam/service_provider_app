import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import {
  Booking,
  useBookingsQuery,
  useCreateDisputeMutation,
  useDisputesQuery,
} from "../../store/salonApi";
import { salonTheme } from "../../theme/salonTheme";
import Navigate from "../../utils/Navigate";

const latestStatus = (booking: Booking) =>
  booking.status?.[booking.status.length - 1]?.status || "pending";

const Chat = () => {
  const navigate = Navigate();
  const { data: bookings = [] } = useBookingsQuery();
  const { data: disputes = [] } = useDisputesQuery();
  const [createDispute] = useCreateDisputeMutation();
  const chatEnabled = bookings.filter((booking) =>
    ["confirmed", "in_progress", "completed"].includes(latestStatus(booking)),
  );

  return (
    <SafeAreaProviderNoScroll zeroPadding>
      <FlatList
        data={chatEnabled}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <Text style={styles.kicker}>Booking communication</Text>
            <Text style={styles.title}>Chat and Disputes</Text>
            <Text style={styles.subtitle}>
              Chat is scoped to confirmed bookings. Disputes can be opened from eligible booking threads.
            </Text>
            <View style={styles.disputePanel}>
              <Text style={styles.panelTitle}>Open disputes</Text>
              <Text style={styles.panelValue}>{disputes.filter((item) => item.status === "open").length}</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No active chats yet</Text>
            <Text style={styles.emptyText}>A chat opens after a booking is confirmed.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.business?.name || "Salon thread"}</Text>
            <Text style={styles.cardMeta}>
              {item.services?.[0]?.name || "Service"} - {latestStatus(item)}
            </Text>
            <View style={styles.actionRow}>
              <Pressable style={styles.primary} onPress={() => navigate("Messages")}>
                <Text style={styles.primaryText}>Open Chat</Text>
              </Pressable>
              <Pressable
                style={styles.secondary}
                onPress={() =>
                  createDispute({
                    bookingId: item._id,
                    reason: "Need admin support for this booking.",
                  })
                }
              >
                <Text style={styles.secondaryText}>Open Dispute</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </SafeAreaProviderNoScroll>
  );
};

export default Chat;

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
  disputePanel: {
    marginTop: salonTheme.spacing.lg,
    padding: salonTheme.spacing.lg,
    borderRadius: salonTheme.radius.lg,
    backgroundColor: salonTheme.colors.primaryDark,
  },
  panelTitle: {
    color: salonTheme.colors.primarySoft,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  panelValue: {
    marginTop: 6,
    color: salonTheme.colors.surface,
    fontSize: 28,
    fontWeight: "900",
  },
  card: {
    marginTop: salonTheme.spacing.md,
    padding: salonTheme.spacing.lg,
    borderRadius: salonTheme.radius.lg,
    backgroundColor: salonTheme.colors.surface,
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
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
  actionRow: {
    flexDirection: "row",
    gap: salonTheme.spacing.sm,
    marginTop: salonTheme.spacing.lg,
  },
  primary: {
    flex: 1,
    minHeight: 42,
    borderRadius: salonTheme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: salonTheme.colors.primary,
  },
  primaryText: {
    color: salonTheme.colors.surface,
    fontWeight: "900",
  },
  secondary: {
    flex: 1,
    minHeight: 42,
    borderRadius: salonTheme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: salonTheme.colors.surfaceMuted,
  },
  secondaryText: {
    color: salonTheme.colors.text,
    fontWeight: "900",
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
  },
});
