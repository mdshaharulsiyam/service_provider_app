import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { salonTheme } from "../../theme/salonTheme";
import TabItem from "./TabItem";

const Tabbar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { buildHref } = useLinkBuilder();
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(bottom, 8) }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.itemButton}
          >
            <TabItem
              route={route.name}
              label={label as string}
              isFocused={isFocused}
            />
          </PlatformPressable>
        );
      })}
    </View>
  );
};

export default Tabbar;

const styles = StyleSheet.create({
  wrap: {
    minHeight: 74,
    flexDirection: "row",
    backgroundColor: salonTheme.colors.surface,
    borderTopColor: salonTheme.colors.border,
    borderTopWidth: 1,
    paddingTop: 8,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 10,
  },
  itemButton: {
    flex: 1,
  },
});
