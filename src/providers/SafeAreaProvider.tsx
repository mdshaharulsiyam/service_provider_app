import { CommonActions, NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import React, { ReactNode, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from '../components/shered/BackButton';
import { useGlobalContext } from './GlobalContextProvider';
const withoutLog = [
  'login',
  'signup',
  "forget",
  "verify",
  "resetpassword",
  "choosesignup",
  "customersignup",
  "servicesignup",
  "trustedservices",
  "securepayments",
  "realtimebooking"
];
const SafeAreaProvider = ({ children, backButtonText }: { children: ReactNode, backButtonText?: string }) => {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const { role } = useGlobalContext()
  useEffect(() => {
    if (!role) {
      const currentRoute = route.name.toLowerCase();
      if (!withoutLog.includes(currentRoute)) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        );
      }
    }
  }, [role, route.name]);
  return (
    <View style={{
      marginTop: top,
      marginBottom: bottom,
    }}>
      {backButtonText && <BackButton text={backButtonText} />}
      <View style={{
        paddingHorizontal: 20,
      }}>
        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </KeyboardAwareScrollView>
      </View>
    </View>
  )
}

export default SafeAreaProvider

const styles = StyleSheet.create({})