import { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { PieChart } from "react-native-gifted-charts";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TaskStats from "../components/TaskStats";
import LoadingScreen from "../components/LoadingScreen";

import fonts from "../configs/fonts";
import colors from "../configs/colors";
import availableCubeColors from "../configs/availableCubeColors";
import cache from "../configs/cacheConfig";
import firebaseConfig from "../configs/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Stats = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [cubes, setCubes] = useState({});
  const [chartData, setChartData] = useState([]);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [tasks, setTasks] = useState();

  const onRefresh = () => {
    setRefreshing(true);
    getCubes();
    setRefreshing(false);
  };

  const getYearMonthDay = (date) => {
    return date.toISOString().split("T")[0];
  };

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setStartDate(currentDate);
  };

  const showStartDatePicker = (currentMode) => {
    DateTimePickerAndroid.open({
      value: startDate,
      onChange: onStartDateChange,
      mode: currentMode,
      is24Hour: true,
      style: { color: colors.primaryText },
    });
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEndDate(currentDate);
  };

  const showEndDatePicker = (currentMode) => {
    DateTimePickerAndroid.open({
      value: endDate,
      onChange: onEndDateChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const getHoursWithMinutes = (time) => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    if (hours === 0) {
      if (minutes === 0) {
        minutes = "<1";
      }
      return minutes + "min";
    }
    return hours + "h " + minutes + "min";
  };

  const getTasks = async () => {
    const currentTime = Date.now();
    const cachedData = await AsyncStorage.getItem(cache.TASK_STATS_KEY);
    const parsedData = JSON.parse(cachedData || "{}");

    if (
      parsedData.data &&
      parsedData.timestamp &&
      currentTime - parsedData.timestamp < cache.TASK_CACHE_TIME
    ) {
      return parsedData.data;
    }

    let taskResult = [];
    const taskQuerySnapshot = await getDocs(collection(db, "Tasks"));

    taskQuerySnapshot.forEach((task) => {
      taskResult.push({
        id: task.id,
        CubeId: task.data().CubeId,
        StartTime: task.data().StartTime.seconds,
        StopTime: task.data().EndTime ? task.data().EndTime.seconds : -1,
      });
    });

    await AsyncStorage.setItem(
      cache.TASK_STATS_KEY,
      JSON.stringify({ timestamp: currentTime, data: taskResult })
    );

    return taskResult;
  };

  const showStats = async () => {
    const tasks = await getTasks();
    const taskData = {};
    for (let task of tasks) {
      if (task.StopTime === -1) {
        break;
      }
      let taskStartDate = getYearMonthDay(new Date(task.StartTime * 1000));
      let startDateString = getYearMonthDay(startDate);
      let endDateString = getYearMonthDay(endDate);
      if (taskStartDate >= startDateString && taskStartDate <= endDateString) {
        if (taskData[task.CubeId]) {
          taskData[task.CubeId].totalTime += task.StopTime - task.StartTime;
          taskData[task.CubeId].numTasks += 1;
        } else {
          taskData[task.CubeId] = {
            totalTime: task.StopTime - task.StartTime,
            numTasks: 1,
          };
        }
      }
    }
    setTasks(taskData);
  };

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

  useEffect(() => {
    getCubes();
  }, []);

  useEffect(() => {
    if (cubes) {
      let chartData = [];
      let data = [];
      console.log(tasks);
      for (let cube in cubes) {
        chartData.push({
          id: cube,
          text: cubes[cube].name,
          value: tasks?.[cube] ? tasks[cube].totalTime : 0,
          color: availableCubeColors[cubes[cube].color].bright,
          textColor: availableCubeColors[cubes[cube].color].dim,
        });
        data.push({
          id: cube,
          name: cubes[cube].name,
          totalTime: tasks?.[cube]
            ? getHoursWithMinutes(tasks[cube].totalTime)
            : 0,
          avgTime: tasks?.[cube]
            ? getHoursWithMinutes(tasks[cube].totalTime / tasks[cube].numTasks)
            : 0,
          color: {
            bright: availableCubeColors[cubes[cube].color].bright,
            dim: availableCubeColors[cubes[cube].color].dim,
          },
        });
      }
      setChartData(chartData);
      setData(data);
    }
  }, [cubes, tasks]);

  return cubes ? (
    <View style={styles.container}>
      <View style={styles.calendarBox}>
        <View>
          <Text style={styles.calendarText}>From:</Text>
          <TouchableOpacity
            onPress={() => {
              showStartDatePicker("date");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {startDate.toLocaleDateString("en-GB")}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.calendarText}>To:</Text>
          <TouchableOpacity
            onPress={() => {
              showEndDatePicker("date");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {endDate.toLocaleDateString("en-GB")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={showStats} style={styles.showStatsButton}>
        <Text style={styles.showStatsButtonText}>Show Stats</Text>
      </TouchableOpacity>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: colors.primaryText,
          width: "80%",
          marginBottom: 5,
        }}
      ></View>
      {tasks &&
        (Object.keys(tasks).length === 0 ? (
          <Text
            style={{ color: colors.warningText, fontSize: 20, padding: 20 }}
          >
            No tasks found for the selected period
          </Text>
        ) : (
          <View style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <View style={styles.chartBox}>
                <PieChart
                  data={chartData}
                  showText={true}
                  labelsPosition="min"
                  strokeWidth={1}
                  strokeColor={colors.secondaryBackground}
                />
              </View>
              <View style={styles.statsBox}>
                {data.map((cube) => {
                  if (cube.totalTime === 0) {
                    return null;
                  } else {
                    return (
                      <TaskStats
                        key={cube.id}
                        taskColor={cube.color}
                        taskName={cube.name}
                        taskTotalTime={cube.totalTime}
                        taskAvgTime={cube.avgTime}
                      />
                    );
                  }
                })}
              </View>
            </ScrollView>
          </View>
        ))}
    </View>
  ) : (
    <LoadingScreen />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    paddingTop: 20,
  },

  button: {
    width: 120,
    height: 50,
    borderRadius: 5,
    backgroundColor: colors.secondaryBackground,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primaryText,
  },

  buttonText: {
    color: colors.primaryText,
    fontSize: 15,
    fontWeight: "bold",
  },

  calendarText: {
    color: colors.secondaryText,
    fontSize: 12,
    fontFamily: fonts.Regular,
  },

  showStatsButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: colors.saveButton,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  showStatsButtonText: {
    color: colors.primaryText,
    fontFamily: fonts.SemiBold,
    fontSize: 16,
  },

  calendarBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    padding: 10,
  },

  dateBox: {
    width: 120,
    height: 40,
    borderRadius: 5,
    backgroundColor: colors.secondaryBackground,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  dateText: {
    color: colors.primaryText,
    fontSize: 15,
    fontWeight: "bold",
  },

  chartBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondaryBackground,
    padding: 30,
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 10,
  },

  statsBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondaryBackground,
    paddingHorizontal: 30,
    paddingTop: 20,
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
});

export default Stats;
