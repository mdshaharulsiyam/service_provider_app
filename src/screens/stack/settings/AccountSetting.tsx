import { Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import SafeAreaProviderNoScroll from "../../../providers/SafeAreaProviderNoScroll";
import FlexText from "../../../components/shered/FlexText";
import { profileIcons } from "../../../constant/images";
import TextSecondary from "../../../components/shered/TextSecondary";
import Navigate from "../../../utils/Navigate";

export const AccountSetting = () => {
      // {
    //   name: "Change Password",
    //   image: profileIcons.Lock,
    //   navigate: "ChangePassword",
    // },
    const navigate = Navigate();
  return (
    <SafeAreaProviderNoScroll
      backButtonText="Account Setting"
    >
            <TouchableOpacity
        key={3}
        onPress={() => navigate("ChangePassword")}
        style={{
          marginTop: 10,
          padding: 10,
          borderRadius: 10,
          // backgroundColor: "#E6F4F1"
          borderWidth: 1,
          paddingVertical: 14,
        }}
      >
        <FlexText
          style={{
            justifyContent: "space-between",
          }}
        >
          <FlexText>
            <Image
              source={profileIcons.Lock as ImageSourcePropType}
            />
            <TextSecondary
              text={"Change Password"}
            />
          </FlexText>
        </FlexText>
      </TouchableOpacity>, 
      <TouchableOpacity
        key={3}
        onPress={() => { }}
        style={{
          marginTop: 10,
          padding: 10,
          borderRadius: 10,
          // backgroundColor: "#E6F4F1"
          borderWidth: 1,
          paddingVertical: 14,
        }}
      >
        <FlexText
          style={{
            justifyContent: "space-between",
          }}
        >
          <FlexText>
            <Image
              source={profileIcons.deleteAccount as ImageSourcePropType}
              style={{
                tintColor: "#FF0000",
              }}
            />
            <TextSecondary
              style={{
                color: "#FF0000",
              }}
              text={"Delete Account"}
            />
          </FlexText>
        </FlexText>
      </TouchableOpacity>,
    </SafeAreaProviderNoScroll>
  );
};