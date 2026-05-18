import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useGlobalContext } from "../../providers/GlobalContextProvider";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { logout } from "../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { usePointsQuery } from "../../store/salonApi";
import { salonTheme } from "../../theme/salonTheme";
import Navigate from "../../utils/Navigate";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const role = useAppSelector((state) => state.auth.role);
  const dispatch = useAppDispatch();
  const { setRole } = useGlobalContext();
  const navigate = Navigate();
  const { data: points } = usePointsQuery(undefined, { skip: !user });

  const options = [
    { label: "My Profile", route: "MyProfile" },
    { label: "Change Password", route: "ChangePassword" },
    { label: "Notifications", route: "Notifications" },
    { label: "Terms", route: "Terms" },
    { label: "Privacy Policy", route: "PrivacyPolicy" },
    { label: "Help", route: "Help" },
  ];

  return (
    <SafeAreaProviderNoScroll zeroPadding>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase() || "S"}</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.name}>{user?.name || "SalonPro guest"}</Text>
            <Text style={styles.meta}>{user?.email || "Login to sync your account"}</Text>
            <Text style={styles.role}>{role}</Text>
          </View>
        </View>

        <View style={styles.statRow}>
          <Stat label="Points" value={`${points?.balance || 0}`} />
          <Stat label="Role" value={role} />
        </View>

        <View style={styles.options}>
          {options.map((option) => (
            <Pressable
              key={option.route}
              style={styles.option}
              onPress={() => navigate(option.route)}
            >
              <Text style={styles.optionText}>{option.label}</Text>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={styles.logout}
          onPress={() => {
            dispatch(logout());
            setRole("customer");
            navigate("Login");
          }}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaProviderNoScroll>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.stat}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export default Profile;

const styles = StyleSheet.create({
  content: {
    padding: salonTheme.spacing.lg,
    paddingBottom: 130,
    backgroundColor: salonTheme.colors.background,
  },
  header: {
    flexDirection: "row",
    gap: salonTheme.spacing.md,
    alignItems: "center",
    padding: salonTheme.spacing.lg,
    borderRadius: salonTheme.radius.lg,
    backgroundColor: salonTheme.colors.surface,
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: salonTheme.colors.primary,
  },
  avatarText: {
    color: salonTheme.colors.surface,
    fontSize: 24,
    fontWeight: "900",
  },
  headerText: {
    flex: 1,
  },
  name: {
    color: salonTheme.colors.text,
    fontSize: 20,
    fontWeight: "900",
  },
  meta: {
    marginTop: 4,
    color: salonTheme.colors.textMuted,
    fontSize: 12,
  },
  role: {
    marginTop: 6,
    color: salonTheme.colors.primary,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "capitalize",
  },
  statRow: {
    marginTop: salonTheme.spacing.lg,
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
    fontSize: 19,
    fontWeight: "900",
    textTransform: "capitalize",
  },
  statLabel: {
    marginTop: 4,
    color: salonTheme.colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
  },
  options: {
    marginTop: salonTheme.spacing.lg,
    borderRadius: salonTheme.radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: salonTheme.colors.border,
    backgroundColor: salonTheme.colors.surface,
  },
  option: {
    minHeight: 54,
    paddingHorizontal: salonTheme.spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: salonTheme.colors.border,
  },
  optionText: {
    color: salonTheme.colors.text,
    fontSize: 14,
    fontWeight: "800",
  },
  chevron: {
    color: salonTheme.colors.textMuted,
    fontSize: 22,
  },
  logout: {
    marginTop: salonTheme.spacing.lg,
    minHeight: 48,
    borderRadius: salonTheme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEE2E2",
  },
  logoutText: {
    color: "#B91C1C",
    fontSize: 14,
    fontWeight: "900",
  },
});
