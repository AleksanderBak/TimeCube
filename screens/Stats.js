import { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  PieChart,
  LineChart,
  BarChart,
  StackedBarChart,
} from "react-native-gifted-charts";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TaskStats from "../components/TaskStats";
import LoadingScreen from "../components/LoadingScreen";

import fonts from "../configs/fonts";
import colors from "../configs/colors";
import availableCubeColors from "../configs/availableCubeColors";
import cache from "../configs/cacheConfig";
import { set } from "firebase/database";

const Stats = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [cubes, setCubes] = useState({});
  const [data, setData] = useState([]);

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

  const showStats = () => {
    console.log("Show Stats");
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
    console.log(cubes);
    if (cubes) {
      let data = [];
      for (let i = 1; i < 7; i++) {
        if (cubes[i]) {
          data.push({
            id: i,
            text: cubes[i].name,
            value: 20,
            color: availableCubeColors[cubes[i].color].bright,
          });
        }
      }
      setData(data);
    }
  }, [cubes]);

  return cubes ? (
    <View style={styles.container}>
      <View style={styles.calendarBox}>
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
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.chartBox}>
            <PieChart
              data={data}
              showText={false}
              labelsPosition="outward"
              strokeWidth={1}
              strokeColor={colors.secondaryBackground}
            />
          </View>
          <View style={styles.statsBox}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <TaskStats
                  taskName={item.text}
                  taskTotalTime={2}
                  taskAvgTime={2}
                />
              )}
              keyExtractor={(item) => item.id}
            />

            <TaskStats taskName={"Task 5"} taskTotalTime={7} taskAvgTime={3} />
          </View>
          {/* <View style={styles.chartBox}>
          <BarChart stackData={stackedData} />
        </View> */}
        </ScrollView>
      </View>
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
    width: 100,
    height: 40,
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
    justifyContent: "center",
    alignItems: "center",
  },

  calendarText: {
    color: colors.primaryText,
    fontSize: 15,
    margin: 10,
    fontFamily: fonts.Regular,
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
