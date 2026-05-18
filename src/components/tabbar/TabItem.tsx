import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { svgIcons } from "../../constant/images";
import { salonTheme } from "../../theme/salonTheme";
import SvgIcon from "../ui/SvgIcon";

const TabItem = ({
  route,
  label,
  isFocused,
}: {
  route: string;
  label: string;
  isFocused: boolean;
}) => {
  return (
    <View
      style={[styles.container, isFocused && styles.containerFocused]}
    >
      <SvgIcon
        component={svgIcons[label as keyof typeof svgIcons] as any}
        width={22}
        height={22}
        color={isFocused ? salonTheme.colors.primary : salonTheme.colors.textMuted}
      />
      <Text
        numberOfLines={1}
        style={[styles.label, isFocused && styles.labelFocused]}
      >
        {label}
      </Text>
    </View>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
    gap: 4,
    marginHorizontal: 4,
    borderRadius: salonTheme.radius.md,
  },
  containerFocused: {
    backgroundColor: salonTheme.colors.primarySoft,
  },
  label: {
    maxWidth: 76,
    color: salonTheme.colors.textMuted,
    fontSize: 11,
    fontWeight: "600",
  },
  labelFocused: {
    color: salonTheme.colors.primaryDark,
  },
});
