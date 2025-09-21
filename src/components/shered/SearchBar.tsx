import React from "react";
import { ImageSourcePropType, StyleSheet, ViewStyle } from "react-native";
import { otherIcons } from "../../constant/images";
import Navigate from "../../utils/Navigate";
import ImageButton from "../ui/buttons/ImageButton";
import Input from "../ui/inputs/Input";
import FlexText from "./FlexText";

const SearchBar = ({ style }: { style?: ViewStyle }) => {
  const navigate = Navigate();
  return (
    <FlexText
      style={{
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#115E59",
        gap: 0,
        overflow: "hidden",
        marginTop: 10,
        height: 50,
        ...style,
      }}
    >
      <Input
        style={{
          width: "86%",
        }}
        keyboard="default"
        showLabel={false}
        required={false}
        placeHolder="Search for services"
      />
      <ImageButton
        style={{
          backgroundColor: "#115E59",
          width: "14%",
          height: "100%",
          borderWidth: 0,
          borderColor: "#B2DFDB",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          borderRadius: 0,
        }}
        onPress={() =>
          navigate("Search", {
            search: "search text",
          })
        }
        imageSource={otherIcons.Search as ImageSourcePropType}
      />
    </FlexText>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
