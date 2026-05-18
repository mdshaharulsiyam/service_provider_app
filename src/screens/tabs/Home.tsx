import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useGlobalContext } from "../../providers/GlobalContextProvider";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { salonTheme, SalonRole } from "../../theme/salonTheme";

const serviceCategories = ["Haircut", "Color", "Facial", "Nails"];

const customerSlots = [
  { time: "10:30 AM", capacity: "3 left" },
  { time: "12:00 PM", capacity: "2 left" },
  { time: "3:30 PM", capacity: "5 left" },
];

const ownerQueue = [
  { time: "10:00", name: "Ayesha Rahman", service: "Hair color", status: "Confirmed" },
  { time: "11:30", name: "Nadia Islam", service: "Facial", status: "Worker needed" },
  { time: "2:00", name: "Mariam Khan", service: "Nail care", status: "Reminder sent" },
];

const workerQueue = [
  { time: "9:30", name: "Rafi Ahmed", service: "Classic haircut", status: "Next" },
  { time: "12:15", name: "Imran Hossain", service: "Beard trim", status: "Confirmed" },
  { time: "4:00", name: "Samiul Karim", service: "Hair spa", status: "Confirmed" },
];

const roleContent: Record<SalonRole, {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryAction: string;
  secondaryAction: string;
}> = {
  customer: {
    eyebrow: "Customer booking",
    title: "Book polished salon care without phone calls.",
    subtitle: "Choose a salon, service, date, slot, and worker with real-time capacity.",
    primaryAction: "Find a Salon",
    secondaryAction: "My Bookings",
  },
  owner: {
    eyebrow: "Salon owner dashboard",
    title: "Keep bookings, workers, and services under control.",
    subtitle: "Track today's queue, assign staff, manage services, and protect booking capacity.",
    primaryAction: "Review Today",
    secondaryAction: "Manage Services",
  },
  worker: {
    eyebrow: "Worker schedule",
    title: "See exactly what is assigned and what needs action.",
    subtitle: "Follow confirmed bookings, contact customers, and mark services complete.",
    primaryAction: "Open Schedule",
    secondaryAction: "Message Salon",
  },
  admin: {
    eyebrow: "Admin control",
    title: "Approve salons and resolve the work that needs oversight.",
    subtitle: "Monitor bookings, disputes, cancellations, reviews, and platform settings.",
    primaryAction: "Pending Salons",
    secondaryAction: "Disputes",
  },
};

const Home = () => {
  const { role } = useGlobalContext();
  const activeRole = role ?? "customer";
  const content = roleContent[activeRole];
  const isCustomer = activeRole === "customer";
  const isWorker = activeRole === "worker";
  const queue = isWorker ? workerQueue : ownerQueue;

  return (
    <SafeAreaProviderNoScroll zeroPadding>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.kicker}>{content.eyebrow}</Text>
            <Text style={styles.greeting}>SalonPro</Text>
          </View>
          <Pressable style={styles.alertButton}>
            <Text style={styles.alertText}>3</Text>
          </Pressable>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroEyebrow}>{content.eyebrow}</Text>
            <Text style={styles.heroTitle}>{content.title}</Text>
            <Text style={styles.heroSubtitle}>{content.subtitle}</Text>
          </View>
          <View style={styles.heroActions}>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>{content.primaryAction}</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>{content.secondaryAction}</Text>
            </Pressable>
          </View>
        </View>

        {isCustomer ? <CustomerHome /> : <OperationsHome queue={queue} role={activeRole} />}
      </ScrollView>
    </SafeAreaProviderNoScroll>
  );
};

const CustomerHome = () => (
  <>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Book by category</Text>
      <Text style={styles.sectionAction}>View all</Text>
    </View>
    <View style={styles.categoryGrid}>
      {serviceCategories.map((category) => (
        <Pressable key={category} style={styles.categoryCard}>
          <View style={styles.categoryMark} />
          <Text style={styles.categoryText}>{category}</Text>
        </Pressable>
      ))}
    </View>

    <View style={styles.featurePanel}>
      <View>
        <Text style={styles.panelEyebrow}>Nearby salon</Text>
        <Text style={styles.panelTitle}>Glam Studio Banani</Text>
        <Text style={styles.panelMeta}>4.8 rating - 2.3 km away - Opens until 8:00 PM</Text>
      </View>
      <View style={styles.slotRow}>
        {customerSlots.map((slot) => (
          <Pressable key={slot.time} style={styles.slotPill}>
            <Text style={styles.slotTime}>{slot.time}</Text>
            <Text style={styles.slotMeta}>{slot.capacity}</Text>
          </Pressable>
        ))}
      </View>
    </View>

    <View style={styles.infoStrip}>
      <InfoBlock label="Active booking" value="1" tone="info" />
      <InfoBlock label="Loyalty points" value="120" tone="success" />
      <InfoBlock label="Reminder" value="15m" tone="warning" />
    </View>
  </>
);

const OperationsHome = ({
  queue,
  role,
}: {
  queue: typeof ownerQueue;
  role: SalonRole;
}) => (
  <>
    <View style={styles.infoStrip}>
      <InfoBlock label="Today" value="18" tone="info" />
      <InfoBlock label={role === "admin" ? "Pending salons" : "Open slots"} value="7" tone="success" />
      <InfoBlock label="Needs review" value="3" tone="warning" />
    </View>

    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>
        {role === "admin" ? "Admin queue" : "Today's bookings"}
      </Text>
      <Text style={styles.sectionAction}>Filter</Text>
    </View>

    <View style={styles.queueList}>
      {queue.map((item) => (
        <View key={`${item.time}-${item.name}`} style={styles.queueItem}>
          <View style={styles.timeBlock}>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          <View style={styles.queueContent}>
            <Text style={styles.queueName}>{item.name}</Text>
            <Text style={styles.queueService}>{item.service}</Text>
          </View>
          <View style={styles.statusPill}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      ))}
    </View>
  </>
);

const InfoBlock = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "info" | "success" | "warning";
}) => {
  const toneStyle = {
    info: styles.infoTone,
    success: styles.successTone,
    warning: styles.warningTone,
  }[tone];

  return (
    <View style={[styles.infoBlock, toneStyle]}>
      <Text style={styles.infoValue}>{value}</Text>
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: salonTheme.spacing.lg,
    paddingTop: salonTheme.spacing.lg,
    paddingBottom: 120,
    backgroundColor: salonTheme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: salonTheme.spacing.lg,
  },
  kicker: {
    color: salonTheme.colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  greeting: {
    marginTop: 2,
    color: salonTheme.colors.text,
    fontSize: 26,
    fontWeight: "800",
  },
  alertButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21,
    backgroundColor: salonTheme.colors.surface,
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
  },
  alertText: {
    color: salonTheme.colors.accent,
    fontSize: 14,
    fontWeight: "800",
  },
  hero: {
    padding: salonTheme.spacing.lg,
    borderRadius: salonTheme.radius.xl,
    backgroundColor: salonTheme.colors.primaryDark,
    gap: salonTheme.spacing.lg,
  },
  heroCopy: {
    gap: salonTheme.spacing.sm,
  },
  heroEyebrow: {
    color: salonTheme.colors.primarySoft,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  heroTitle: {
    color: salonTheme.colors.surface,
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "800",
  },
  heroSubtitle: {
    color: "#D7F5EF",
    fontSize: 14,
    lineHeight: 21,
  },
  heroActions: {
    flexDirection: "row",
    gap: salonTheme.spacing.sm,
  },
  primaryButton: {
    flex: 1,
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: salonTheme.radius.md,
    backgroundColor: salonTheme.colors.surface,
  },
  primaryButtonText: {
    color: salonTheme.colors.primaryDark,
    fontSize: 14,
    fontWeight: "800",
  },
  secondaryButton: {
    flex: 1,
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: salonTheme.radius.md,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.28)",
  },
  secondaryButtonText: {
    color: salonTheme.colors.surface,
    fontSize: 14,
    fontWeight: "800",
  },
  sectionHeader: {
    marginTop: salonTheme.spacing.xl,
    marginBottom: salonTheme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: salonTheme.colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  sectionAction: {
    color: salonTheme.colors.primary,
    fontSize: 13,
    fontWeight: "800",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: salonTheme.spacing.sm,
  },
  categoryCard: {
    width: "48%",
    minHeight: 88,
    justifyContent: "space-between",
    padding: salonTheme.spacing.md,
    borderRadius: salonTheme.radius.lg,
    backgroundColor: salonTheme.colors.surface,
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
  },
  categoryMark: {
    width: 28,
    height: 6,
    borderRadius: 3,
    backgroundColor: salonTheme.colors.accent,
  },
  categoryText: {
    color: salonTheme.colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  featurePanel: {
    marginTop: salonTheme.spacing.xl,
    padding: salonTheme.spacing.lg,
    borderRadius: salonTheme.radius.xl,
    backgroundColor: salonTheme.colors.surface,
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
    gap: salonTheme.spacing.lg,
  },
  panelEyebrow: {
    color: salonTheme.colors.primary,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  panelTitle: {
    marginTop: 4,
    color: salonTheme.colors.text,
    fontSize: 20,
    fontWeight: "800",
  },
  panelMeta: {
    marginTop: 6,
    color: salonTheme.colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  slotRow: {
    flexDirection: "row",
    gap: salonTheme.spacing.sm,
  },
  slotPill: {
    flex: 1,
    paddingVertical: salonTheme.spacing.sm,
    borderRadius: salonTheme.radius.md,
    backgroundColor: salonTheme.colors.surfaceMuted,
  },
  slotTime: {
    color: salonTheme.colors.text,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "800",
  },
  slotMeta: {
    marginTop: 2,
    color: salonTheme.colors.textMuted,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "700",
  },
  infoStrip: {
    marginTop: salonTheme.spacing.xl,
    flexDirection: "row",
    gap: salonTheme.spacing.sm,
  },
  infoBlock: {
    flex: 1,
    minHeight: 86,
    justifyContent: "center",
    padding: salonTheme.spacing.md,
    borderRadius: salonTheme.radius.lg,
    borderWidth: 1,
  },
  infoTone: {
    backgroundColor: salonTheme.colors.infoSoft,
    borderColor: "#BFDBFE",
  },
  successTone: {
    backgroundColor: salonTheme.colors.successSoft,
    borderColor: "#BBF7D0",
  },
  warningTone: {
    backgroundColor: salonTheme.colors.warningSoft,
    borderColor: "#FDE68A",
  },
  infoValue: {
    color: salonTheme.colors.text,
    fontSize: 22,
    fontWeight: "900",
  },
  infoLabel: {
    marginTop: 4,
    color: salonTheme.colors.textMuted,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
  },
  queueList: {
    borderRadius: salonTheme.radius.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
    backgroundColor: salonTheme.colors.surface,
  },
  queueItem: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    gap: salonTheme.spacing.md,
    paddingHorizontal: salonTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: salonTheme.colors.border,
  },
  timeBlock: {
    width: 52,
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: salonTheme.radius.md,
    backgroundColor: salonTheme.colors.surfaceMuted,
  },
  timeText: {
    color: salonTheme.colors.primaryDark,
    fontSize: 13,
    fontWeight: "900",
  },
  queueContent: {
    flex: 1,
  },
  queueName: {
    color: salonTheme.colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  queueService: {
    marginTop: 3,
    color: salonTheme.colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
  },
  statusPill: {
    maxWidth: 96,
    paddingHorizontal: salonTheme.spacing.sm,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: salonTheme.colors.accentSoft,
  },
  statusText: {
    color: salonTheme.colors.accent,
    fontSize: 10,
    fontWeight: "800",
    textAlign: "center",
  },
});
