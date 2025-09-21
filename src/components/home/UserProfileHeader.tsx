import React from "react";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { otherIcons } from "../../constant/images";
import FlexText from "../shered/FlexText";
import ImageFlex from "../shered/ImageFlex";
import ImageButton from "../ui/buttons/ImageButton";

const UserProfileHeader = () => {
  return (
    <FlexText
      style={{
        marginTop: 10,
        justifyContent: "space-between",
      }}
    >
      <ImageFlex
        image={`https://placehold.co/400x400.png`}
        text="Hello Siyam"
        text1="Welcome to Servify"
      />
      <ImageButton
        style={{
          backgroundColor: "#E0F2F1",
          width: 40,
          height: 40,
          borderWidth: 1,
          borderColor: "#B2DFDB",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 100,
        }}
        onPress={() => {}}
        imageSource={otherIcons.Notifications as ImageSourcePropType}
      />
    </FlexText>
  );
};

export default UserProfileHeader;

const styles = StyleSheet.create({});
