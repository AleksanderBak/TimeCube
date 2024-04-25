import { View, Text, FlatList, ScrollView } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import Task from "../components/Task";

const Timeline = ({ route }) => {
  const tasks = route.params.tasks;
  const cubes = route.params.cubes;

  const taskRenderer = ({ item }) => {
    let minutes = Math.round(
      (item.StopTime - item.StartTime) / 60,
      2
    ).toString();
    const hours = Math.floor(minutes / 60);

    minutes = (minutes % 60).toString();

    if (minutes.length < 2) {
      minutes = `0${minutes}`;
    }

    const totalTime = `${hours}:${minutes}`;

    const startDate = new Date(item.StartTime * 1000);
    const startHour = startDate.getHours();
    let startMinutes = startDate.getMinutes();
    if (startMinutes < 10) {
      startMinutes = `0${startMinutes}`;
    }
    const startHourWithMinutes = `${startHour}:${startMinutes}`;

    const name = cubes[item.CubeId].Name;
    const color = cubes[item.CubeId].Color;

    return (
      <Task
        name={name}
        time={totalTime}
        startTime={startHourWithMinutes}
        color={color}
      />
    );
  };

  return (
    <View style={styles.TaskBox}>
      <Calendar />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={taskRenderer}
      ></FlatList>
      {/* <ScrollView>
        <Task name="Task 1" time="1:30" startTime="10:00" color={"red"} />
        <Task name="Task 2" time="1:30" startTime="11:30" />
        <Task name="Task 1" time="1:30" startTime="10:00" />
        <Task name="Task 2" time="1:30" startTime="11:30" />
        <Task name="Task 1" time="1:30" startTime="10:00" />
        <Task name="Task 2" time="1:30" startTime="11:30" />
        <Task name="Task 1" time="1:30" startTime="10:00" />
        <Task name="Task 2" time="1:30" startTime="11:30" />
      </ScrollView> */}
    </View>
  );
};

styles = {
  TaskBox: {
    flex: 1,
  },
};

export default Timeline;