import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import React from "react";
import FIlterOptions from '../components/shered/FIlterOptions';
import StackLayout from "./StackLayout";

const Drawer = createDrawerNavigator();

const DrawerLayout = () => {
  return (
    <Drawer.Navigator
      id={undefined}
      screenOptions={{ headerShown: false, swipeEnabled: false }}
      initialRouteName="StackLayout"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="StackLayout" component={StackLayout} />
    </Drawer.Navigator>
  );
};

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>

      <FIlterOptions {...props} />
    </DrawerContentScrollView>
  );
}

export default DrawerLayout;
