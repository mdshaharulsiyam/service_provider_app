import * as DocumentPicker from "expo-document-picker";

export const SelectImage = async () => {
  try {
    const pickResult = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });
    const asset = pickResult.canceled ? null : pickResult.assets[0];
    if (!asset) {
      return null;
    }

    const file = {
      uri: asset.uri,
      name: asset.name,
      type: asset.mimeType,
    };
    return file;
  } catch (err: unknown) {
    return null;
  }
};
