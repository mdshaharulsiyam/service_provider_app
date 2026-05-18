import React from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { otherIcons } from '../../constant/images';
import FilterOptionsFields from '../../formFields/FilterOptionsFields';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { FieldsType } from '../../types/Types';
import Navigate from '../../utils/Navigate';
import { RenderField } from '../../utils/RenderField';
import ButtonBG from '../ui/buttons/ButtonBG';
import ButtonGreenOpacity30 from '../ui/buttons/ButtonGreenOpacity30';
import IconButtonBG from '../ui/buttons/IconButtonBG';
import FlexText from './FlexText';

const FIlterOptions = (props: any) => {
  const { fields, setFields } = FilterOptionsFields();
  const { setRole } = useGlobalContext();
  const navigate = Navigate();
  return (
    <View
      style={{
        flex: 1,
        gap: 6,
        justifyContent: "flex-start",
        paddingHorizontal: 10
      }}
    >
      {fields?.map((field: FieldsType, index) => (
        <React.Fragment key={field.name || index}>
          {RenderField(field, setFields)}
        </React.Fragment>
      ))}
      <FlexText style={{
        justifyContent: "space-between",
        marginTop: 20
      }}>
        <IconButtonBG
          style={{
            width: "auto"
          }}
          text="Map View"
          handler={() => {

          }}
        />
        <IconButtonBG
          icon={otherIcons.List as ImageSourcePropType}
          style={{
            width: "auto"
          }}
          text="List View"
          handler={() => {

          }}
        />
      </FlexText>
      <ButtonBG
        text='Apply'
        handler={() => { }}
      />
      <ButtonGreenOpacity30
        text='Close'
        handler={() => props?.navigation.closeDrawer()}
      />
    </View>
  );
};


export default FIlterOptions
