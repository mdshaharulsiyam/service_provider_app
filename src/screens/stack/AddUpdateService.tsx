import React from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionHeading from '../../components/shered/SectionHeading';
import TextPrimary from '../../components/shered/TextPrimary';
import ButtonBG from '../../components/ui/buttons/ButtonBG';
import ImageUploader from '../../components/ui/file/ImageUploader';
import AddUpdateServiceFields from '../../formFields/AddUpdateServiceFields';
import { handleSignIn } from '../../handler/signIn';
import SafeAreaProvider from '../../providers/SafeAreaProvider';
import { FieldsType } from '../../types/Types';
import Navigate from '../../utils/Navigate';
import { RenderField } from '../../utils/RenderField';
import ScreenSize from '../../utils/ScreenSize';

const AddUpdateService = () => {
  const { height } = ScreenSize();
  const { fields, setFields } = AddUpdateServiceFields();
  const { top, bottom } = useSafeAreaInsets();
  const navigate = Navigate();
  return (
    <SafeAreaProvider
      backButtonText='Update Service'
    >
      <SectionHeading
        text='Add Service'
        showViewButton={false}
      />
      <TextPrimary
        text='Upload Your Service Image'
      />
      <ImageUploader />

      {fields?.map((field: FieldsType) => RenderField(field, setFields))}

      <ButtonBG
        text="Save Service"
        handler={() => {
          handleSignIn(fields, setFields);
          navigate("TabLayout");
        }}
      />
    </SafeAreaProvider>
  );
};


export default AddUpdateService
const styles = StyleSheet.create({
  forget: {
    marginLeft: "auto",
    marginTop: -24,
  },
});
