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
import cache from "../configs/cacheConfig";

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
    const currentTime = Date.now();
    const cachedData = await AsyncStorage.getItem(cache.TASK_KEY);
    const parsedData = JSON.parse(cachedData || "{}");

    if (
      parsedData.data &&
      parsedData.timestamp &&
      currentTime - parsedData.timestamp < cache.TASK_CACHE_TIME
    ) {
      setTasks(parsedData.data);
      return;
    }

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

    await AsyncStorage.setItem(
      cache.TASK_KEY,
      JSON.stringify({ timestamp: currentTime, data: taskResult })
    );

    setTasks(taskResult);
  }, []);

  const getCubes = async () => {
    try {
      const result = await AsyncStorage.multiGet(cache.CUBE_KEYS);
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
    await AsyncStorage.removeItem(cache.TASK_KEY);
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
        renderItem={({ item }) => {
          const id = item.CubeId;
          return (
            <Task
              name={cubes[id] ? cubes[id].name : cubeConfig[id].name}
              stopTime={item.StopTime}
              startTime={item.StartTime}
              color={cubes[id] ? cubes[id].color : cubeConfig[id].color}
            />
          );
        }}
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
