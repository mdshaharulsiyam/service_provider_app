import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import Tabbar from "../components/tabbar/Tabbar";
import Chat from "../screens/tabs/Chat";
import Home from "../screens/tabs/Home";
import PostService from "../screens/tabs/PostService";
import PostTask from "../screens/tabs/PostTask";
import Profile from "../screens/tabs/Profile";
import Tasks from "../screens/tabs/Tasks";
import { useAppSelector } from "../store/hooks";

const Tab = createBottomTabNavigator();

const TabLayout = () => {
  const role = useAppSelector((state) => state.auth.role);
  const isOwner = role === "owner" || role === "admin";
  const isWorker = role === "worker";
  const tabs = isWorker
    ? [
        { route: "Home", label: "Schedule", component: Home },
        { route: "Task", label: "Bookings", component: Tasks },
        { route: "PostTask", label: "Services", component: PostService },
        { route: "Chat", label: "Chat", component: Chat },
        { route: "Profile", label: "Profile", component: Profile },
      ]
    : [
        {
          route: "Home",
          label: isOwner ? "Dashboard" : "Home",
          component: Home,
        },
        {
          route: "Task",
          label: "Bookings",
          component: Tasks,
        },
        {
          route: "PostTask",
          label: isOwner ? "Services" : "Book",
          component: isOwner ? PostService : PostTask,
        },
        {
          route: "Chat",
          label: "Chat",
          component: Chat,
        },
        {
          route: "Profile",
          label: "Profile",
          component: Profile,
        },
      ];
  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <Tabbar {...props} />}
    >
      {tabs?.map((item: any) => (
        <Tab.Screen
          key={item?.route}
          name={item?.route}
          options={{
            tabBarLabel: item?.label,
            headerShown: false,
          }}
          component={item?.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabLayout;
