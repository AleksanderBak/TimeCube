import { View, Text } from "react-native";
import cubeColors from "../configs/availableCubeColors";
import colors from "../configs/colors";

const Task = ({ name, time, startTime, color }) => {
  bgColor = cubeColors[color].dim;
  borderColor = cubeColors[color].bright;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.startTimeContainer}>
        <Text style={styles.startTimeText}>{startTime}</Text>
        <View style={[styles.lineBox, { backgroundColor: borderColor }]}></View>
      </View>
      <View
        style={[
          styles.nameContainer,
          { backgroundColor: bgColor, borderLeftColor: borderColor },
        ]}
      >
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{time}</Text>
      </View>
    </View>
  );
};

const styles = {
  mainContainer: {
    flexDirection: "row",
    marginBottom: 0,
  },
  nameContainer: {
    height: 60,
    width: 200,
    borderLeftWidth: 5,
    borderRadius: 7,
    marginTop: 25,
  },
  nameText: {
    fontSize: 17,
    color: colors.primaryText,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  timeContainer: {
    height: 60,
    width: 60,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.primaryText,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    marginTop: 25,
  },
  timeText: {
    fontSize: 20,
    color: colors.primaryText,
  },
  startTimeContainer: {
    height: 90,
    width: 70,
    alignItems: "center",
  },
  startTimeText: {
    fontSize: 15,
    color: colors.primaryText,
  },
  lineBox: {
    height: 60,
    width: 2,
    marginTop: 5,
  },
};

export default Task;
