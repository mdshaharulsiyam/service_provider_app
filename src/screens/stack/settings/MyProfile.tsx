import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonBG from "../../../components/ui/buttons/ButtonBG";
import { otherIcons } from "../../../constant/images";
import profileUpdateFields from "../../../formFields/profileUpdateFields";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import { FieldsType } from "../../../types/Types";
import { RenderField } from "../../../utils/RenderField";
import * as ImagePicker from "expo-image-picker";

const MyProfile = () => {
  const { fields, setFields } = profileUpdateFields();
  const [fiels, setFiels] = useState<any>([]);
  return (
    <SafeAreaProvider backButtonText="My Profile">
      <View
        style={{
          height: 100,
          width: 100,
          position: "relative",
          borderRadius: 100,
          marginHorizontal: "auto",
          marginVertical: 10,
        }}
      >
        <Image
          source={{ uri: fiels?.[0]?.uri || "https://placehold.co/400x400.png" }}
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
          }}
        />
        <TouchableOpacity
          onPress={async () => {
            try {
              const pickResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                selectionLimit: 1,
              });
              const asset = pickResult.canceled ? null : pickResult.assets[0];
              if (asset?.uri) {
                const file = {
                  uri: asset.uri,
                  name: asset.fileName ?? asset.uri.split("/").pop() ?? "profile.jpg",
                  type: asset.mimeType ?? "image/jpeg",
                };
                setFiels((prev: any) => [file, ...prev]);
              }
            } catch (err: unknown) {
              // ignore
            }
          }}
          style={{
            position: "absolute",
            right: 3,
            bottom: 3,
            padding: 6,
            backgroundColor: "#E6F4F1",
            borderRadius: 100,
          }}
        >
          <Image source={otherIcons.Edit as ImageSourcePropType} />
        </TouchableOpacity>
      </View>
      {fields?.map((field: FieldsType) => RenderField(field, setFields))}
      <ButtonBG
        style={{
          marginTop: 10,
        }}
        text="Update"
        handler={() => {}}
      />
    </SafeAreaProvider>
  );
};

export default MyProfile;

const styles = StyleSheet.create({});
