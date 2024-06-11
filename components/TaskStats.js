import { View, Text, StyleSheet } from "react-native";

import colors from "../configs/colors";
import fonts from "../configs/fonts";

const TaskStats = ({ taskColor, taskName, taskTotalTime, taskAvgTime }) => {
  return (
    <View style={styles.taskStatBox}>
      <View style={[styles.taskLabel, { borderColor: taskColor.dim }]}>
        <Text style={[styles.taskLabelText, { color: taskColor.bright }]}>
          {taskName}
        </Text>
      </View>
      <Text style={styles.totalTimeText}>
        Total time:{" "}
        <Text style={{ color: taskColor.bright, fontFamily: fonts.Digital }}>
          {taskTotalTime}
        </Text>
      </Text>
      <Text style={styles.avgTimeText}>
        Average time:{" "}
        <Text style={{ color: taskColor.bright, fontFamily: fonts.Digital }}>
          {taskAvgTime}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  taskStatBox: {
    alignSelf: "stretch",
  },
  taskLabel: {
    marginBottom: 10,
    borderBottomWidth: 2,
  },
  taskLabelText: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
  },
  totalTimeText: {
    color: colors.primaryText,
    fontSize: 15,
    marginBottom: 5,
    fontFamily: fonts.Regular,
  },
  avgTimeText: {
    color: colors.primaryText,
    fontSize: 15,
    marginBottom: 20,
    fontFamily: fonts.Regular,
  },
});

export default TaskStats;
