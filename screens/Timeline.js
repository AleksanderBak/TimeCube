import { useCallback, useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoadingScreen from "../components/LoadingScreen";
import Calendar from "../components/Calendar";
import Task from "../components/Task";

import cubeConfig from "../configs/cubeConfig";
import firebaseConfig from "../configs/firebaseConfig";

const sameYear = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const Timeline = () => {
  const [cubes, setCubes] = useState({});
  const [tasks, setTasks] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [days, setDays] = useState();
  const [activeDay, setActiveDay] = useState(2);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const getDays = () => {
    const numberOfDays = 5;
    let days = [];
    let today = new Date();
    today.setDate(today.getDate() - numberOfDays);
    for (let i = 0; i <= numberOfDays; i++) {
      let day = today.toLocaleString("default", { day: "2-digit" });
      let month = today.toLocaleString("default", { month: "short" });
      date = new Date(today);
      days.push({ id: i, day: day, month: month, date: date });
      today.setDate(today.getDate() + 1);
    }
    setDays(days);
  };

  const getTasks = useCallback(async () => {
    let taskResult = [];
    const taskQuerySnapshot = await getDocs(collection(db, "Tasks"));
    taskQuerySnapshot.forEach((task) => {
      taskResult.push({
        id: task.id,
        CubeId: task.data().CubeId,
        StartTime: task.data().StartTime.seconds,
        StopTime: task.data().StopTime.seconds,
      });
    });
    setTasks(taskResult);
  }, []);

  const getCubes = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      let resultObject = {};
      result.forEach((item) => {
        resultObject[item[0]] = JSON.parse(item[1]);
      });
      setCubes(resultObject);
    } catch (e) {
      console.log("No value");
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    getCubes();
    getTasks();
    setIsRefreshing(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      getCubes();
      getTasks();
    };
    getDays();
    fetchData();
  }, [activeDay]);

  const taskRenderer = ({ item }) => {
    const id = item.CubeId;

    const currDate = days[activeDay].date;

    const startDate = new Date(item.StartTime * 1000);

    // DIVISION BY DAYS
    // if (!sameYear(currDate, startDate)) {
    //   return <View></View>;
    // }

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

    const startHour = startDate.getHours();
    let startMinutes = startDate.getMinutes();
    if (startMinutes < 10) {
      startMinutes = `0${startMinutes}`;
    }
    const startHourWithMinutes = `${startHour}:${startMinutes}`;

    const name = cubes[id] ? cubes[id].name : cubeConfig[id].name;
    const color = cubes[id] ? cubes[id].color : cubeConfig[id].color;

    return (
      <Task
        name={name}
        time={totalTime}
        startTime={startHourWithMinutes}
        color={color}
      />
    );
  };

  return cubes && tasks && days ? (
    <View style={styles.TaskBox}>
      <Calendar days={days} activeDay={activeDay} setActiveDay={setActiveDay} />
      <FlatList
        data={tasks}
        refreshing={isRefreshing}
        onRefresh={() => {
          onRefresh();
        }}
        keyExtractor={(item) => item.id}
        renderItem={taskRenderer}
        showsVerticalScrollIndicator={false}
      ></FlatList>
    </View>
  ) : (
    <LoadingScreen />
  );
};

styles = {
  TaskBox: {
    flex: 1,
    alignItems: "center",
  },
};

export default Timeline;
