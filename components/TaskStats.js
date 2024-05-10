import { View, Text, StyleSheet } from "react-native";
import colors from "../configs/colors";
import availableCubeColors from "../configs/availableCubeColors";

const TaskStats = ({ taskName, taskTotalTime, taskAvgTime }) => {
  return (
    <View style={styles.taskStatBox}>
      <View style={styles.taskLabel}>
        <Text style={styles.taskLabelText}>{taskName}</Text>
      </View>
      <Text style={styles.totalTimeText}>Total time: {taskTotalTime} min</Text>
      <Text style={styles.avgTimeText}>
        Average time per day: {taskAvgTime} min
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
    borderBottomColor: availableCubeColors.forestGreen.bright,
  },
  taskLabelText: {
    color: availableCubeColors.forestGreen.bright,
    fontSize: 20,
    fontWeight: "bold",
  },
  totalTimeText: {
    color: colors.primaryText,
    fontSize: 15,
    marginBottom: 5,
  },
  avgTimeText: {
    color: colors.primaryText,
    fontSize: 15,
    marginBottom: 20,
  },
});

export default TaskStats;
