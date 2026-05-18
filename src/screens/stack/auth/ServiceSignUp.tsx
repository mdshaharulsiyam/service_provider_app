import React, { useState } from "react";
import { Dimensions, Image, ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FlexText from "../../../components/shered/FlexText";
import HeaderDesign from "../../../components/shered/HeaderDesign";
import HeaderSecondary from "../../../components/shered/HeaderSecondary";
import TextPrimary from "../../../components/shered/TextPrimary";
import TextSecondary from "../../../components/shered/TextSecondary";
import ButtonBG from "../../../components/ui/buttons/ButtonBG";
import ButtonTransparentBG from "../../../components/ui/buttons/ButtonTransparentBG";
import Divider from "../../../components/ui/devider/Divider";
import ImageUploader from "../../../components/ui/file/ImageUploader";
import ServiceSignUpFields from "../../../formFields/ServiceSignUpFields";
import { handleServiceSignUp } from "../../../handler/serviceSignUp";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import { FieldsType } from "../../../types/Types";
import Navigate, { Navigation } from "../../../utils/Navigate";
import { RenderField } from "../../../utils/RenderField";

const slide = [
  {
    skip: 0,
    keep: 6,
  },
  {
    skip: 6,
    keep: 1,
  },
  {
    skip: 7,
    keep: 2,
  },
  {
    skip: 9,
    keep: 2,
  },
  {
    skip: 11,
    keep: 1,
  },
];

const Content = [
  {
    heading: "Create Your Account",
    text: "Create your account to start offering your services, connect with customers, and manage everything in one place.",
  },
  {
    heading: "Verify Your BVN",
    text: "Enter your 11-digit Bank Verification Number (BVN) for identity confirmation.",
  },
  {
    heading: "Complete Identity Verification",
    text: "Verify your identity with NIN or other accepted documents using Smile ID’s secure process. ",
  },
  {
    heading: "Provide Your Address",
    text: "Please provide your valid address, and verify it to confirm your identity.",
  },
  {
    heading: "Have a Referral Code? Unlock Your Reward",
    text: "Use a referral code and earn 10% EXTRA payout on your first Completed task (done within 48 hours)!",
  },
];

const ServiceSignUp = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { height } = Dimensions.get("window");
  const { fields, setFields } = ServiceSignUpFields();
  const { top, bottom } = useSafeAreaInsets();
  const [fiels, setFiels] = useState<any>([]);
  const navigate = Navigate();
  const navigation = Navigation()
  const backHandler = () => {
    if (currentSlide == 0) {
      navigation.goBack()
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  }
  return (
    <SafeAreaProvider backButtonText="Sign Up as Salon Owner" handler={backHandler}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            gap: 6,
            justifyContent: "center",
            minHeight: height - top - bottom,
            paddingBottom: 90,
          }}
        >
          <HeaderDesign text={Content[currentSlide].heading as string} />
          <TextSecondary text={Content[currentSlide].text as string} />
          {fields
            ?.slice(
              slide[currentSlide].skip,
              slide[currentSlide].keep + slide[currentSlide].skip
            )
            ?.map((field: FieldsType) => RenderField(field, setFields))}
          {(currentSlide == 2 || currentSlide == 3) && (
            <View style={{ marginTop: 10 }}>
              <TextPrimary text="Address Verification Document" />
              <FlexText>
                {/* {
                  fiels?.map((file: any, idx: number) => (
                    <Image
                      key={idx}
                      source={{ uri: file?.uri }}
                      style={{ width: 80, height: 80, borderRadius: 8, marginRight: 8 }}
                    />
                  ))
                } */}
                {
                  fiels?.length > 0 && <Image
                    source={{ uri: fiels?.[0]?.uri }}
                    style={{ width: 80, height: 80, borderRadius: 8, marginRight: 8, resizeMode: "contain" }}
                  />
                }
                <ImageUploader setFiels={setFiels} />
              </FlexText>
            </View>
          )}

          {currentSlide == 0 && (
            <>
              <FlexText
                style={{
                  marginTop: 8,
                }}
              >
                <Divider
                  style={{
                    width: "45%",
                  }}
                />
                <HeaderSecondary text="OR" />
                <Divider
                  style={{
                    width: "45%",
                  }}
                />
              </FlexText>

              <FlexText
                style={{
                  marginTop: 8,
                }}
              >
                <TextPrimary text="Already have an account?" />
                <TouchableOpacity onPress={() => navigate("Login")}>
                  <TextSecondary
                    style={{
                      color: "#115E59",
                    }}
                    text="Login"
                  />
                </TouchableOpacity>
              </FlexText>
            </>
          )}
          <ButtonBG
            style={{
              marginTop: 6,
            }}
            text={
              currentSlide == 4
                ? "Apply Code & Continue"
                : currentSlide == 1
                  ? "Verify"
                  : "Continue"
            }
            handler={() => {
              const isValid = handleServiceSignUp(
                fields?.slice(
                  slide[currentSlide].skip,
                  slide[currentSlide].keep + slide[currentSlide].skip
                ),
                setFields,
                currentSlide
              );
              console.log(isValid);
              if (isValid && currentSlide < 4) {
                setCurrentSlide((prev) => prev + 1);
              } else if (currentSlide == 4) {
                navigate("Verify", {
                  params: { phoneNumber: "", from: "signup" },
                });
              }
            }}
          />
          {currentSlide == 4 && (
            <ButtonTransparentBG
              text="Skip & Continue Without Code"
              handler={() => {
                navigate("Verify", {
                  params: { phoneNumber: "", from: "signup" },
                });
              }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default ServiceSignUp;
