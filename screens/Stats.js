import { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { registerTranslation } from "react-native-paper-dates";
import {
  PieChart,
  LineChart,
  BarChart,
  StackedBarChart,
} from "react-native-gifted-charts";

import colors from "../configs/colors";
import availableCubeColors from "../configs/availableCubeColors";

import TaskStats from "../components/TaskStats";

registerTranslation("en", {
  save: "Save",
  close: "Reset",
  typeInDate: "Type in date",
  selectRange: "Select range",
  pickDateFromCalendar: "Pick date from calendar",
});

const Stats = () => {
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [visibleDates, setVisibleDates] = useState({
    visibleStartDate: undefined,
    visibleEndDate: undefined,
  });
  const [open, setOpen] = useState(false);

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback(
    ({ startDate, endDate }) => {
      if (startDate && endDate) {
        let visibleStartDate = startDate.toLocaleString("default", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        let visibleEndDate = endDate.toLocaleString("default", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        setVisibleDates({ visibleStartDate, visibleEndDate });
      }
      setOpen(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange, setVisibleDates]
  );

  const data = [
    {
      text: "Work",
      value: 50,
      color: availableCubeColors.red.bright,
      textColor: availableCubeColors.red.dim,
      fontWeight: "bold",
    },
    {
      text: "Sleep",
      value: 70,
      color: availableCubeColors.blue.bright,
      textColor: availableCubeColors.blue.dim,
      fontWeight: "bold",
    },
    {
      text: "Leisure",
      value: 20,
      color: availableCubeColors.yellow.bright,
      textColor: availableCubeColors.yellow.dim,
      fontWeight: "bold",
    },
    {
      text: "Praca 2",
      value: 20,
      color: availableCubeColors.pink.bright,
      textColor: availableCubeColors.pink.dim,
      fontWeight: "bold",
      strokeWidth: 1,
    },
  ];

  const stackedData = [
    {
      stacks: [
        { value: 10, color: availableCubeColors.red.dim },
        { value: 20, color: availableCubeColors.blue.dim },
        { value: 30, color: availableCubeColors.yellow.dim },
      ],
      label: "Work",
    },
    {
      stacks: [
        { value: 10, color: availableCubeColors.red.bright },
        { value: 20, color: availableCubeColors.blue.bright },
        { value: 30, color: availableCubeColors.yellow.bright },
      ],
      label: "Work2",
      spacing: 10,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.calendarBox}>
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>
            {visibleDates.visibleStartDate
              ? visibleDates.visibleStartDate.toString()
              : "----"}
          </Text>
        </View>
        <View
          style={{ backgroundColor: colors.primaryText, height: 2, width: 15 }}
        ></View>
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>
            {visibleDates.visibleEndDate
              ? visibleDates.visibleEndDate.toString()
              : "----"}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => setOpen(true)} style={styles.button}>
        <Text style={styles.buttonText}>Select Date Range</Text>
      </TouchableOpacity>
      <DatePickerModal
        locale="en"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onConfirm}
      />
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.chartBox}>
            <PieChart
              data={data}
              showText={true}
              labelsPosition="outward"
              strokeWidth={1}
              strokeColor={colors.secondaryBackground}
            />
          </View>
          <View style={styles.statsBox}>
            <TaskStats
              taskName={"Task 1"}
              taskTotalTime={2}
              taskAvgTime={2.1}
            />
            <TaskStats
              taskName={"Task 2"}
              taskTotalTime={23}
              taskAvgTime={23}
            />
            <TaskStats
              taskName={"Task 3"}
              taskTotalTime={22}
              taskAvgTime={4.2}
            />
            <TaskStats
              taskName={"Task 4"}
              taskTotalTime={15}
              taskAvgTime={6.3}
            />
            <TaskStats taskName={"Task 5"} taskTotalTime={7} taskAvgTime={3} />
          </View>
          {/* <View style={styles.chartBox}>
          <BarChart stackData={stackedData} />
        </View> */}
        </ScrollView>
      </View>
    </View>
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
    width: 275,
    height: 40,
    borderRadius: 5,
    backgroundColor: colors.focusedBottomTab,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  buttonText: {
    color: colors.primaryText,
    fontSize: 15,
    fontWeight: "bold",
  },

  calendarBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
