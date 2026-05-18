import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Navigate from "../../utils/Navigate";
import SectionHeading from "../shered/SectionHeading";
import TaskCard from "../shered/TaskCard";
const data = [
  {
    title: "Help move a couch",
    price: "₦24.00",
    location_address: "Los Angeles CA 90024",
    location_city: "New York, USA",
    date: "15 May 2020 8:00 am",
    user: {
      name: "Marvin Fey",
      status: "Open",
      offers: "1 offered",
    },
    image: "",
  },
  {
    title: "Help move a couch",
    price: "₦24.00",
    location_address: "Los Angeles CA 90024",
    location_city: "New York, USA",
    date: "15 May 2020 8:00 am",
    user: {
      name: "Marvin Fey",
      status: "Open",
      offers: "1 offered",
    },
    image: "",
  },
  {
    title: "Help move a couch",
    price: "₦24.00",
    location_address: "Los Angeles CA 90024",
    location_city: "New York, USA",
    date: "15 May 2020 8:00 am",
    user: {
      name: "Marvin Fey",
      status: "Open",
      offers: "1 offered",
    },
    image: "",
  },
  {
    title: "Help move a couch",
    price: "₦24.00",
    location_address: "Los Angeles CA 90024",
    location_city: "New York, USA",
    date: "15 May 2020 8:00 am",
    user: {
      name: "Marvin Fey",
      status: "Open",
      offers: "1 offered",
    },
    image: "",
  },
  {
    title: "Help move a couch",
    price: "₦24.00",
    location_address: "Los Angeles CA 90024",
    location_city: "New York, USA",
    date: "15 May 2020 8:00 am",
    user: {
      name: "Marvin Fey",
      status: "Open",
      offers: "1 offered",
    },
    image: "",
  },
  {
    title: "Help move a couch",
    price: "₦24.00",
    location_address: "Los Angeles CA 90024",
    location_city: "New York, USA",
    date: "15 May 2020 8:00 am",
    user: {
      name: "Marvin Fey",
      status: "Open",
      offers: "1 offered",
    },
    image: "",
  },
];
const RecentlyAddedTask = () => {
  const navigate = Navigate();
  return (
    <View style={{ marginTop: 10 }}>
      <SectionHeading
        handler={() =>
          navigate("Search", {
            type: "Task",
          })
        }
        color="#115E59"
        text="Recently added salon services"
      />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <TaskCard from="service" />}
      />
    </View>
  );
};

export default RecentlyAddedTask;

const styles = StyleSheet.create({});
