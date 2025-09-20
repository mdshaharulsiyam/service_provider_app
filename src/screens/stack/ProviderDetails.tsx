import React from 'react'
import { FlatList, ImageSourcePropType, View } from 'react-native'
import FlexImages from '../../components/providerDetails/FlexImages'
import BackButton from '../../components/shered/BackButton'
import FlexText from '../../components/shered/FlexText'
import HeaderDesign from '../../components/shered/HeaderDesign'
import HeaderSecondary from '../../components/shered/HeaderSecondary'
import ImageFlex from '../../components/shered/ImageFlex'
import TextPrimary from '../../components/shered/TextPrimary'
import TextSecondary from '../../components/shered/TextSecondary'
import Bids_Question from '../../components/taskDetails/Bids_Question'
import BlueBadgeOpacity30 from '../../components/ui/badges/BlueBadgeOpacity30'
import ButtonBG from '../../components/ui/buttons/ButtonBG'
import ButtonGreenOpacity30 from '../../components/ui/buttons/ButtonGreenOpacity30'
import { otherIcons } from '../../constant/images'
import SafeAreaProviderNoScroll from '../../providers/SafeAreaProviderNoScroll'
const ProviderDetails = () => {
  const elements = [
    <ButtonGreenOpacity30
      key={1}
      activeOpacity={1}
      text='Cleaning'
      style={{
        width: 200,

        borderRadius: 8,
        marginVertical: 10
      }}
      textStyle={{
        color: "#115E59",
        fontWeight: 700
      }}
    />,
    <HeaderDesign key={2} text='Office Cleaning Service ' />,
    <FlexImages key={3} />,

    <ImageFlex
      key={4}
      image={`https://placehold.co/400x400.png`}
      text='Posted by'
      text1='Marvin Fey'
    />,
    <ImageFlex
      component={<BlueBadgeOpacity30
        icon={otherIcons.Location as ImageSourcePropType}
      />}
      key={5}
      text='Location'
      text1='New York, USA'
    />,
    <ImageFlex
      component={<BlueBadgeOpacity30
        icon={otherIcons.Calendar as ImageSourcePropType}
      />}
      key={6}
      text='to be done on  '
      text1='15 May 2020 8:00 am'
    />,
    <HeaderSecondary
      key={7}
      style={{
        fontWeight: 700,
      }}
      text='Details'
    />,
    <TextPrimary
      key={8}
      text="I'm after 2 palettes that are sold out online but available from 2 specific stores.  They meed to be sent out to you in the US and then forwarded to me in Sydney in 1 package for convenience. For more information please direct message me! Paid!"
    />,
    <FlexText
      key={9}
      style={{
        justifyContent: "space-between",
        marginTop: 10
      }}
    >
      <View>
        <TextSecondary
          text='Task budget '
        />
        <HeaderDesign
          text='₦24.00'
        />
      </View>
      <ButtonBG
        style={{
          width: "auto"
        }}
        text='Submit a Bid'
        handler={() => { }}
      />
    </FlexText>,
    <Bids_Question
      key={10}
    />
  ]
  return (
    <SafeAreaProviderNoScroll>
      <BackButton text='Provider Details' />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: 150
        }}
        showsVerticalScrollIndicator={false}
        data={elements}
        renderItem={({ item }) => item}

      />
    </SafeAreaProviderNoScroll>
  )
}

export default ProviderDetails

