import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import SafeAreaProviderNoScroll from "../../../providers/SafeAreaProviderNoScroll";
import {
  useMarkNotificationReadMutation,
  useNotificationsQuery,
} from "../../../store/salonApi";
import { salonTheme } from "../../../theme/salonTheme";

const Notifications = () => {
  const { data = [], refetch, isFetching } = useNotificationsQuery();
  const [markRead] = useMarkNotificationReadMutation();

  return (
    <SafeAreaProviderNoScroll backButtonText="Notifications" zeroPadding>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        refreshing={isFetching}
        onRefresh={refetch}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptyText}>Booking, reminder, review, dispute, and points events will appear here.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, item.read_at && styles.cardRead]}
            onPress={() => markRead(item._id)}
          >
            <View style={styles.cardTop}>
              <Text style={styles.title}>{item.title || "Notification"}</Text>
              <Text style={styles.type}>{item.type || "general"}</Text>
            </View>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{new Date(item.createdAt).toLocaleString()}</Text>
          </Pressable>
        )}
      />
    </SafeAreaProviderNoScroll>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  content: {
    padding: salonTheme.spacing.lg,
    paddingBottom: 120,
    backgroundColor: salonTheme.colors.background,
  },
  card: {
    marginBottom: salonTheme.spacing.md,
    padding: salonTheme.spacing.lg,
    borderRadius: salonTheme.radius.lg,
    backgroundColor: salonTheme.colors.surface,
    borderWidth: 1,
    borderColor: salonTheme.colors.primary,
  },
  cardRead: {
    borderColor: salonTheme.colors.border,
    opacity: 0.75,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: salonTheme.spacing.md,
  },
  title: {
    flex: 1,
    color: salonTheme.colors.text,
    fontSize: 16,
    fontWeight: "900",
  },
  type: {
    color: salonTheme.colors.primary,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "capitalize",
  },
  message: {
    marginTop: 8,
    color: salonTheme.colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  time: {
    marginTop: 10,
    color: salonTheme.colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
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
