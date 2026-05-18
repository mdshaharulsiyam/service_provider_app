import React, { ReactNode } from "react";
import {
  Image,
  ImageSourcePropType,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { otherIcons, svgIcons } from "../../../constant/images";
import SvgIcon from "../SvgIcon";

const toImageFile = (asset: ImagePicker.ImagePickerAsset) => ({
  uri: asset.uri,
  name: asset.fileName ?? asset.uri.split("/").pop() ?? "image.jpg",
  type: asset.mimeType ?? "image/jpeg",
});

const ImageUploader = ({
  style,
  component,
  setFiels,
}: {
  style?: ViewStyle;
  component?: ReactNode;
  setFiels?: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const [showModal, setShowModal] = React.useState(false);

  const handlePick = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        selectionLimit: 1,
      });
      const asset = res.canceled ? null : res.assets[0];
      const file = asset ? toImageFile(asset) : null;
      if (file?.uri && setFiels) {
        setFiels((prev: any) => [file, ...prev]);
      }
    } catch (err: unknown) {
      // ignore
    } finally {
      setShowModal(false);
    }
  };

  const handlePickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });
      const first = res.canceled ? null : res.assets[0];
      const file = first
        ? {
            uri: first.uri,
            name: first.name,
            type: first.mimeType,
          }
        : null;
      if (file?.uri && setFiels) {
        setFiels((prev: any) => [file, ...prev]);
      }
    } catch (err: unknown) {
      // ignore
    } finally {
      setShowModal(false);
    }
  };

  const handleCapture = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        return;
      }

      const res = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
      });
      const asset = res.canceled ? null : res.assets[0];
      const file = asset ? toImageFile(asset) : null;
      if (file?.uri && setFiels) {
        setFiels((prev: any) => [file, ...prev]);
      }
    } catch (e) {
      // ignore
    } finally {
      setShowModal(false);
    }
  };

  return (
    <TouchableOpacity
      style={{
        width: component ? "auto" : 140,
      }}
      onPress={() => setShowModal(true)}
    >
      {component ? (
        component
      ) : (
        <View
          style={[
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 140,
              width: 140,
              borderRadius: 10,
              backgroundColor: "#E6F4F1",
            },
            style,
          ]}
        >
          <Image source={otherIcons.Image as ImageSourcePropType} />
          <Text>Upload Document</Text>
        </View>
      )}
      <Modal visible={showModal} transparent animationType="fade" onRequestClose={() => setShowModal(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.45)",
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 20,
              width: "100%",
              maxWidth: 360,
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
              elevation: 6,
            }}
          >
            <View style={{ width: "100%" }}>
              <TouchableOpacity
                onPress={handlePick}
                activeOpacity={0.8}
                style={{ alignItems: "center", paddingVertical: 18, paddingHorizontal: 12, borderStyle: "solid", borderWidth: 1, borderBottomWidth: 1, borderColor: "#D1D5DB", marginBottom: 8, borderRadius: 8, backgroundColor: "#FFFFFF", overflow: "hidden" }}
              >
                <SvgIcon component={svgIcons.Upload as any} width={24}
                  height={24} />
                <Text style={{ marginTop: 8, fontSize: 16, color: "#111827", fontWeight: "500" }}>Photo album</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePickFile}
                activeOpacity={0.8}
                style={{ alignItems: "center", paddingVertical: 18, paddingHorizontal: 12, borderStyle: "solid", borderWidth: 1, borderBottomWidth: 1, borderColor: "#D1D5DB", marginBottom: 8, borderRadius: 8, backgroundColor: "#FFFFFF", overflow: "hidden" }}
              >
                <SvgIcon component={svgIcons.File as any} width={24}
                  height={24} />
                <Text style={{ marginTop: 8, fontSize: 16, color: "#111827", fontWeight: "500" }}>Choose File</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCapture}
                activeOpacity={0.8}
                style={{ alignItems: "center", paddingVertical: 18, paddingHorizontal: 12, borderStyle: "solid", borderWidth: 1, borderBottomWidth: 1, borderColor: "#D1D5DB", marginBottom: 8, borderRadius: 8, backgroundColor: "#FFFFFF", overflow: "hidden" }}
              >
                <SvgIcon component={svgIcons.Camera as any} width={24}
                  height={24} />
                <Text style={{ marginTop: 8, fontSize: 16, color: "#111827", fontWeight: "500" }}>Open Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowModal(false)} style={{ paddingVertical: 12, alignItems: "center" }}>
                <Text style={{ color: "#6B7280", fontSize: 14 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default ImageUploader;

const styles = StyleSheet.create({});
