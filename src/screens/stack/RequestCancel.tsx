import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FlexText from '../../components/shered/FlexText';
import HeaderDesign from '../../components/shered/HeaderDesign';
import TextPrimary from '../../components/shered/TextPrimary';
import TextSecondary from '../../components/shered/TextSecondary';
import ButtonBG from '../../components/ui/buttons/ButtonBG';
import ButtonGreenOpacity30 from '../../components/ui/buttons/ButtonGreenOpacity30';
import ImageUploader from '../../components/ui/file/ImageUploader';
import RequestCancelFields from '../../formFields/RequestCancelFields';
import { handleRequestCancel } from '../../handler/requestCancel';
import SafeAreaProvider from '../../providers/SafeAreaProvider';
import { FieldsType } from '../../types/Types';
import { Navigation } from '../../utils/Navigate';
import { RenderField } from '../../utils/RenderField';

const RequestCancel = () => {
  const { height } = Dimensions.get("window");
  const { fields, setFields } = RequestCancelFields();
  const { top, bottom } = useSafeAreaInsets();
  const navigation = Navigation();
  return (
    <SafeAreaProvider
      backButtonText=' '
    >
      <View
        style={{
          flex: 1,
          gap: 6,
          justifyContent: "center",
          minHeight: height - top - bottom,
        }}
      >
        <HeaderDesign
          text='Request Task Cancellation'
        />
        <TextSecondary text="Submit a cancellation request with supporting details." />

        {fields?.map((field: FieldsType) => RenderField(field, setFields))}
        <View>
          <TextPrimary
            text='Evidence (Optional)'
          />
          <ImageUploader />
        </View>
        <FlexText
          style={{
            justifyContent: "flex-start",
            paddingBottom: 20
          }}
        >
          <ButtonGreenOpacity30
            style={{
              marginTop: 10,
              width: "auto",
              borderWidth: 1,
              borderColor: "#115E59"
            }}
            text="Cancel"
            handler={() => navigation.goBack()}
          />
          <ButtonBG
            style={{
              marginTop: 10,
              width: "auto"
            }}
            text="Submit"
            handler={() => {
              handleRequestCancel(fields, setFields);
            }}
          />
        </FlexText>
      </View>
    </SafeAreaProvider>
  );
};

export default RequestCancel

const styles = StyleSheet.create({})