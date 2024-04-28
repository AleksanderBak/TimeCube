import { View, FlatList } from "react-native";
import { useCallback, useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import Task from "../components/Task";
import EmptyTask from "../components/EmptyTask";
import cubeConfig from "../configs/cubeConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get, set } from "firebase/database";
import LoadingScreen from "./LoadingScreen";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import firebaseConfig from "../configs/firebaseConfig";

const Timeline = () => {
  const [cubes, setCubes] = useState({});
  const [tasks, setTasks] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

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
    fetchData();
  }, []);

  const taskRenderer = useCallback(
    ({ item }) => {
      const id = item.CubeId;
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
    },
    [cubes]
  );

  return cubes && tasks ? (
    <View style={styles.TaskBox}>
      <Calendar />
      <FlatList
        data={tasks}
        refreshing={isRefreshing}
        onRefresh={() => {
          onRefresh();
        }}
        keyExtractor={(item) => item.id}
        renderItem={taskRenderer}
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
    paddingBottom: 10,
  },
};

export default Timeline;
