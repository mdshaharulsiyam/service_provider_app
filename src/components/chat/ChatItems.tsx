import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Navigate from "../../utils/Navigate";
import FlexText from "../shered/FlexText";
import ImageFlex from "../shered/ImageFlex";
import TextSecondary from "../shered/TextSecondary";

const ChatItems = () => {
  const navigate = Navigate();
  return (
    <TouchableOpacity onPress={() => navigate("Messages")}>
      <FlexText
        style={{
          padding: 10,
          borderRadius: 10,
          backgroundColor: "#FFFFFF", //E6F4F1
          marginVertical: 5,
          justifyContent: "space-between",
        }}
      >
        <ImageFlex
          image={`https://placehold.co/400x400.png`}
          text="Hello Siyam"
          text1="Welcome to SalonPro"
        />
        <TextSecondary
          style={{
            fontSize: 12,
          }}
          text="18.31 PM"
        />
      </FlexText>
    </TouchableOpacity>
  );
};

export default ChatItems;

const styles = StyleSheet.create({});
