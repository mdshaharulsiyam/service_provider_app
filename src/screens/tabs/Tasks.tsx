import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useGlobalContext } from "../../providers/GlobalContextProvider";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { salonTheme } from "../../theme/salonTheme";

const filterOptions = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

const bookings = [
  {
    id: "BK-1042",
    salon: "Glam Studio Banani",
    customer: "Ayesha Rahman",
    service: "Hair color",
    time: "Today, 10:00 AM",
    worker: "Nusrat",
    status: "Confirmed",
  },
  {
    id: "BK-1043",
    salon: "Urban Cuts",
    customer: "Nadia Islam",
    service: "Facial",
    time: "Today, 11:30 AM",
    worker: "Assign worker",
    status: "Pending",
  },
  {
    id: "BK-1044",
    salon: "Polish Bar",
    customer: "Mariam Khan",
    service: "Nail care",
    time: "Tomorrow, 2:00 PM",
    worker: "Tania",
    status: "Confirmed",
  },
];

const Tasks = () => {
  const { role } = useGlobalContext();
  const [activeFilter, setActiveFilter] = useState(filterOptions[0]);
  const isCustomer = !role || role === "customer";

  return (
    <SafeAreaProviderNoScroll zeroPadding>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <Text style={styles.kicker}>
              {isCustomer ? "Customer bookings" : "Salon booking queue"}
            </Text>
            <Text style={styles.title}>Bookings</Text>
            <Text style={styles.subtitle}>
              Track active appointments, cancellation windows, workers, and service status.
            </Text>
            <FlatList
              horizontal
              data={filterOptions}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setActiveFilter(item)}
                  style={[
                    styles.filterButton,
                    item === activeFilter && styles.filterButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      item === activeFilter && styles.filterTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.bookingCard}>
            <View style={styles.bookingTop}>
              <View>
                <Text style={styles.bookingId}>{item.id}</Text>
                <Text style={styles.bookingTitle}>
                  {isCustomer ? item.salon : item.customer}
                </Text>
              </View>
              <View style={styles.statusPill}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            <View style={styles.detailGrid}>
              <Detail label="Service" value={item.service} />
              <Detail label="Time" value={item.time} />
              <Detail label="Worker" value={item.worker} />
            </View>
          </View>
        )}
      />
    </SafeAreaProviderNoScroll>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

export default Tasks;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: salonTheme.spacing.lg,
    paddingTop: salonTheme.spacing.lg,
    paddingBottom: 120,
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
  filterButton: {
    paddingHorizontal: salonTheme.spacing.md,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: salonTheme.colors.surface,
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
  },
  filterButtonActive: {
    backgroundColor: salonTheme.colors.primary,
    borderColor: salonTheme.colors.primary,
  },
  filterText: {
    color: salonTheme.colors.textMuted,
    fontSize: 13,
    fontWeight: "800",
  },
  filterTextActive: {
    color: salonTheme.colors.surface,
  },
  bookingCard: {
    marginBottom: salonTheme.spacing.md,
    padding: salonTheme.spacing.lg,
    borderRadius: salonTheme.radius.xl,
    backgroundColor: salonTheme.colors.surface,
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
  },
  bookingTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: salonTheme.spacing.md,
  },
  bookingId: {
    color: salonTheme.colors.textMuted,
    fontSize: 12,
    fontWeight: "800",
  },
  bookingTitle: {
    marginTop: 4,
    color: salonTheme.colors.text,
    fontSize: 18,
    fontWeight: "900",
  },
  statusPill: {
    paddingHorizontal: salonTheme.spacing.sm,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: salonTheme.colors.infoSoft,
  },
  statusText: {
    color: salonTheme.colors.info,
    fontSize: 11,
    fontWeight: "900",
  },
  detailGrid: {
    marginTop: salonTheme.spacing.lg,
    gap: salonTheme.spacing.sm,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: salonTheme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: salonTheme.colors.border,
  },
  detailLabel: {
    color: salonTheme.colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  detailValue: {
    maxWidth: "58%",
    color: salonTheme.colors.text,
    textAlign: "right",
    fontSize: 13,
    fontWeight: "800",
  },
});
