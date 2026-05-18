import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { useAppSelector } from "../../store/hooks";
import {
  SalonService,
  useCreateServiceMutation,
  useCreateWorkerMutation,
  useMySalonsQuery,
  useServicesQuery,
  useWorkersQuery,
} from "../../store/salonApi";
import { salonTheme } from "../../theme/salonTheme";

const PostService = () => {
  const role = useAppSelector((state) => state.auth.role);
  const { data: salons = [] } = useMySalonsQuery(undefined, {
    skip: role !== "owner" && role !== "admin",
  });
  const salon = salons[0];
  const { data: services = [] } = useServicesQuery(
    { salonId: salon?._id || "", includeInactive: true },
    { skip: !salon?._id },
  );
  const { data: workers = [] } = useWorkersQuery(salon?._id || "", {
    skip: !salon?._id,
  });
  const [createService, { isLoading: creatingService }] = useCreateServiceMutation();
  const [createWorker, { isLoading: creatingWorker }] = useCreateWorkerMutation();
  const [serviceName, setServiceName] = useState("Classic Haircut");
  const [price, setPrice] = useState("700");
  const [duration, setDuration] = useState("45");
  const [workerName, setWorkerName] = useState("New Stylist");
  const [workerEmail, setWorkerEmail] = useState("worker@example.com");

  const addService = async () => {
    if (!salon?._id || !serviceName.trim()) return;
    await createService({
      salonId: salon._id,
      body: {
        name: serviceName.trim(),
        description: "Salon service created from mobile app.",
        price: Number(price || 0),
        duration_minutes: Number(duration || 30),
        concurrent_booking_limit: 1,
        active: true,
      },
    }).unwrap();
  };

  const addWorker = async () => {
    if (!salon?._id || !workerEmail.trim()) return;
    await createWorker({
      salonId: salon._id,
      body: {
        name: workerName.trim(),
        email: workerEmail.trim(),
        password: "worker123",
        assigned_services: services.slice(0, 2).map((service) => service._id),
      },
    }).unwrap();
  };

  if (role === "customer") {
    return (
      <SafeAreaProviderNoScroll zeroPadding>
        <View style={styles.content}>
          <Text style={styles.kicker}>Customer</Text>
          <Text style={styles.title}>Services are managed by salons</Text>
          <Text style={styles.subtitle}>Use the Book tab to choose a salon service and reserve a slot.</Text>
        </View>
      </SafeAreaProviderNoScroll>
    );
  }

  if (!salon) {
    return (
      <SafeAreaProviderNoScroll zeroPadding>
        <View style={styles.content}>
          <Text style={styles.kicker}>Owner setup</Text>
          <Text style={styles.title}>No salon found</Text>
          <Text style={styles.subtitle}>Register as a salon owner or seed demo data from Home.</Text>
        </View>
      </SafeAreaProviderNoScroll>
    );
  }

  return (
    <SafeAreaProviderNoScroll zeroPadding>
      <FlatList
        data={services}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <Text style={styles.kicker}>Service and worker management</Text>
            <Text style={styles.title}>{salon.name}</Text>
            <Text style={styles.subtitle}>
              Add services, set durations/capacity, and create workers. The backend enforces ownership and assignments.
            </Text>

            <View style={styles.form}>
              <Text style={styles.formTitle}>Add service</Text>
              <Field label="Service name" value={serviceName} onChangeText={setServiceName} />
              <Field label="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
              <Field label="Duration minutes" value={duration} onChangeText={setDuration} keyboardType="numeric" />
              <Pressable style={styles.primary} onPress={addService} disabled={creatingService}>
                <Text style={styles.primaryText}>{creatingService ? "Saving..." : "Create Service"}</Text>
              </Pressable>
            </View>

            <View style={styles.form}>
              <Text style={styles.formTitle}>Add worker</Text>
              <Field label="Worker name" value={workerName} onChangeText={setWorkerName} />
              <Field label="Worker email" value={workerEmail} onChangeText={setWorkerEmail} keyboardType="email-address" />
              <Pressable style={styles.secondary} onPress={addWorker} disabled={creatingWorker}>
                <Text style={styles.secondaryText}>{creatingWorker ? "Saving..." : "Create Worker"}</Text>
              </Pressable>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Workers</Text>
              <Text style={styles.sectionMeta}>{workers.length}</Text>
            </View>
            {workers.map((worker) => (
              <View key={worker._id} style={styles.workerCard}>
                <Text style={styles.cardTitle}>{worker.user?.name}</Text>
                <Text style={styles.cardMeta}>{worker.user?.email || worker.user?.phone || "No contact"}</Text>
              </View>
            ))}

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Services</Text>
              <Text style={styles.sectionMeta}>{services.length}</Text>
            </View>
          </>
        }
        ListEmptyComponent={<Text style={styles.subtitle}>No services created yet.</Text>}
        renderItem={({ item }) => <ServiceCard service={item} />}
      />
    </SafeAreaProviderNoScroll>
  );
};

const Field = ({
  label,
  value,
  onChangeText,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: "default" | "numeric" | "email-address";
}) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      style={styles.input}
      placeholderTextColor={salonTheme.colors.textMuted}
    />
  </View>
);

const ServiceCard = ({ service }: { service: SalonService }) => (
  <View style={styles.serviceCard}>
    <View>
      <Text style={styles.cardTitle}>{service.name}</Text>
      <Text style={styles.cardMeta}>
        ৳{service.price} - {service.duration_minutes || 30} min -{" "}
        {service.active ? "Active" : "Inactive"}
      </Text>
    </View>
    <View style={styles.statusPill}>
      <Text style={styles.statusText}>Cap {service.concurrent_booking_limit || 1}</Text>
    </View>
  </View>
);

export default PostService;

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
    fontSize: 28,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 6,
    color: salonTheme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  form: {
    marginTop: salonTheme.spacing.xl,
    padding: salonTheme.spacing.lg,
    borderRadius: salonTheme.radius.lg,
    backgroundColor: salonTheme.colors.surface,
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
  },
  formTitle: {
    color: salonTheme.colors.text,
    fontSize: 17,
    fontWeight: "900",
  },
  field: {
    marginTop: salonTheme.spacing.md,
  },
  label: {
    color: salonTheme.colors.textMuted,
    fontSize: 12,
    fontWeight: "800",
  },
  input: {
    marginTop: 6,
    minHeight: 44,
    borderRadius: salonTheme.radius.md,
    paddingHorizontal: salonTheme.spacing.md,
    backgroundColor: salonTheme.colors.surfaceMuted,
    color: salonTheme.colors.text,
    fontSize: 14,
  },
  primary: {
    marginTop: salonTheme.spacing.lg,
    minHeight: 46,
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
    marginTop: salonTheme.spacing.lg,
    minHeight: 46,
    borderRadius: salonTheme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: salonTheme.colors.primaryDark,
  },
  secondaryText: {
    color: salonTheme.colors.surface,
    fontWeight: "900",
  },
  sectionHeader: {
    marginTop: salonTheme.spacing.xl,
    marginBottom: salonTheme.spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: salonTheme.colors.text,
    fontSize: 18,
    fontWeight: "900",
  },
  sectionMeta: {
    color: salonTheme.colors.primary,
    fontWeight: "900",
  },
  workerCard: {
    marginBottom: salonTheme.spacing.sm,
    padding: salonTheme.spacing.md,
    borderRadius: salonTheme.radius.lg,
    backgroundColor: salonTheme.colors.surface,
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
  },
  serviceCard: {
    marginBottom: salonTheme.spacing.md,
    padding: salonTheme.spacing.lg,
    borderRadius: salonTheme.radius.lg,
    backgroundColor: salonTheme.colors.surface,
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: salonTheme.spacing.md,
  },
  cardTitle: {
    color: salonTheme.colors.text,
    fontSize: 16,
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
  },
});
