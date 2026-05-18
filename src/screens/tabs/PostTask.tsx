import React, { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import {
  Salon,
  SalonService,
  Slot,
  useCreateBookingMutation,
  useSalonQuery,
  useSalonsQuery,
  useSlotsQuery,
} from "../../store/salonApi";
import { salonTheme } from "../../theme/salonTheme";

const isoDate = (offset = 0) => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
};

const PostTask = () => {
  const { data: salons = [] } = useSalonsQuery();
  const [selectedSalonId, setSelectedSalonId] = useState<string | null>(null);
  const activeSalonId = selectedSalonId || salons[0]?._id || null;
  const { data: salonDetail } = useSalonQuery(activeSalonId || "", {
    skip: !activeSalonId,
  });
  const services = salonDetail?.services || [];
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const activeServiceId = selectedServiceId || services[0]?._id || null;
  const [date, setDate] = useState(isoDate(1));
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const { data: slots = [], isFetching: loadingSlots } = useSlotsQuery(
    { salon: activeSalonId || "", service: activeServiceId || "", date },
    { skip: !activeSalonId || !activeServiceId },
  );
  const [createBooking, { isLoading, isSuccess }] = useCreateBookingMutation();

  const selectedSalon = useMemo(
    () => salons.find((salon) => salon._id === activeSalonId),
    [salons, activeSalonId],
  );
  const selectedService = useMemo(
    () => services.find((service) => service._id === activeServiceId),
    [services, activeServiceId],
  );

  const submit = async () => {
    if (!selectedSalon || !selectedService || !selectedSlot) return;
    await createBooking({
      salon: selectedSalon._id,
      service: selectedService._id,
      start_at: selectedSlot.start_at,
      note: "Booked from SalonPro mobile app",
    }).unwrap();
  };

  return (
    <SafeAreaProviderNoScroll zeroPadding>
      <FlatList
        data={slots}
        keyExtractor={(item) => item.start_at}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <Text style={styles.kicker}>Customer booking flow</Text>
            <Text style={styles.title}>Book a Salon</Text>
            <Text style={styles.subtitle}>
              Select an approved salon, service, date, and available slot. Capacity is checked by the backend.
            </Text>

            <Step title="1. Salon">
              <FlatList
                horizontal
                data={salons}
                keyExtractor={(item) => item._id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.row}
                renderItem={({ item }) => (
                  <Option
                    title={item.name}
                    subtitle={item.category || "Salon"}
                    active={item._id === activeSalonId}
                    onPress={() => {
                      setSelectedSalonId(item._id);
                      setSelectedServiceId(null);
                      setSelectedSlot(null);
                    }}
                  />
                )}
              />
            </Step>

            <Step title="2. Service">
              <FlatList
                horizontal
                data={services}
                keyExtractor={(item) => item._id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.row}
                renderItem={({ item }) => (
                  <Option
                    title={item.name}
                    subtitle={`৳${item.price} - ${item.duration_minutes || 30} min`}
                    active={item._id === activeServiceId}
                    onPress={() => {
                      setSelectedServiceId(item._id);
                      setSelectedSlot(null);
                    }}
                  />
                )}
              />
            </Step>

            <Step title="3. Date">
              <View style={styles.row}>
                {[1, 2, 3].map((offset) => {
                  const day = isoDate(offset);
                  return (
                    <Option
                      key={day}
                      title={offset === 1 ? "Tomorrow" : day}
                      subtitle={day}
                      active={date === day}
                      onPress={() => {
                        setDate(day);
                        setSelectedSlot(null);
                      }}
                    />
                  );
                })}
              </View>
            </Step>

            <Step title="4. Slot">
              {loadingSlots ? <Text style={styles.muted}>Loading slots...</Text> : null}
              {!loadingSlots && slots.length === 0 ? (
                <Text style={styles.muted}>No slots available for this date.</Text>
              ) : null}
            </Step>
          </>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setSelectedSlot(item)}
            style={[styles.slot, selectedSlot?.start_at === item.start_at && styles.slotActive]}
          >
            <Text style={[styles.slotTime, selectedSlot?.start_at === item.start_at && styles.slotTextActive]}>
              {item.time}
            </Text>
            <Text style={[styles.slotMeta, selectedSlot?.start_at === item.start_at && styles.slotTextActive]}>
              {item.remaining_capacity} left
            </Text>
          </Pressable>
        )}
        ListFooterComponent={
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Booking summary</Text>
            <Text style={styles.summaryLine}>{selectedSalon?.name || "Choose a salon"}</Text>
            <Text style={styles.summaryLine}>{selectedService?.name || "Choose a service"}</Text>
            <Text style={styles.summaryLine}>{selectedSlot?.time || "Choose a slot"}</Text>
            <Pressable
              style={[styles.primary, (!selectedSlot || isLoading) && styles.disabled]}
              disabled={!selectedSlot || isLoading}
              onPress={submit}
            >
              <Text style={styles.primaryText}>
                {isLoading ? "Booking..." : isSuccess ? "Booked" : "Confirm Booking"}
              </Text>
            </Pressable>
          </View>
        }
      />
    </SafeAreaProviderNoScroll>
  );
};

const Step = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.step}>
    <Text style={styles.stepTitle}>{title}</Text>
    {children}
  </View>
);

const Option = ({
  title,
  subtitle,
  active,
  onPress,
}: {
  title: string;
  subtitle?: string;
  active: boolean;
  onPress: () => void;
}) => (
  <Pressable onPress={onPress} style={[styles.option, active && styles.optionActive]}>
    <Text style={[styles.optionTitle, active && styles.optionTextActive]}>{title}</Text>
    {subtitle ? (
      <Text style={[styles.optionSubtitle, active && styles.optionTextActive]}>{subtitle}</Text>
    ) : null}
  </Pressable>
);

export default PostTask;

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
  step: {
    marginTop: salonTheme.spacing.xl,
  },
  stepTitle: {
    marginBottom: salonTheme.spacing.md,
    color: salonTheme.colors.text,
    fontSize: 17,
    fontWeight: "900",
  },
  row: {
    flexDirection: "row",
    gap: salonTheme.spacing.sm,
  },
  option: {
    minWidth: 148,
    padding: salonTheme.spacing.md,
    borderRadius: salonTheme.radius.lg,
    backgroundColor: salonTheme.colors.surface,
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
  },
  optionActive: {
    backgroundColor: salonTheme.colors.primary,
    borderColor: salonTheme.colors.primary,
  },
  optionTitle: {
    color: salonTheme.colors.text,
    fontSize: 14,
    fontWeight: "900",
  },
  optionSubtitle: {
    marginTop: 4,
    color: salonTheme.colors.textMuted,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "700",
  },
  optionTextActive: {
    color: salonTheme.colors.surface,
  },
  muted: {
    color: salonTheme.colors.textMuted,
    fontSize: 13,
  },
  slot: {
    marginBottom: salonTheme.spacing.sm,
    padding: salonTheme.spacing.md,
    borderRadius: salonTheme.radius.lg,
    backgroundColor: salonTheme.colors.surface,
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  slotActive: {
    backgroundColor: salonTheme.colors.primaryDark,
    borderColor: salonTheme.colors.primaryDark,
  },
  slotTime: {
    color: salonTheme.colors.text,
    fontSize: 15,
    fontWeight: "900",
  },
  slotMeta: {
    color: salonTheme.colors.textMuted,
    fontSize: 13,
    fontWeight: "800",
  },
  slotTextActive: {
    color: salonTheme.colors.surface,
  },
  summary: {
    marginTop: salonTheme.spacing.lg,
    padding: salonTheme.spacing.lg,
    borderRadius: salonTheme.radius.lg,
    backgroundColor: salonTheme.colors.surface,
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
  },
  summaryTitle: {
    color: salonTheme.colors.text,
    fontSize: 17,
    fontWeight: "900",
  },
  summaryLine: {
    marginTop: 6,
    color: salonTheme.colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  primary: {
    marginTop: salonTheme.spacing.lg,
    minHeight: 48,
    borderRadius: salonTheme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: salonTheme.colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  primaryText: {
    color: salonTheme.colors.surface,
    fontSize: 14,
    fontWeight: "900",
  },
});
