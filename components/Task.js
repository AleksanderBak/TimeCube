import { View, Text } from "react-native";
import cubeColors from "../configs/cubeColors";

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
    marginBottom: 20,
  },
  nameContainer: {
    height: 70,
    width: 200,
    borderLeftWidth: 5,
    borderLeftColor: "#2a9d8f",
    borderRadius: 7,
    marginTop: 5,
  },
  nameText: {
    fontSize: 17,
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  timeContainer: {
    height: 70,
    width: 70,
    borderColor: "black",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "white",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    marginTop: 5,
  },
  timeText: {
    fontSize: 20,
    color: "white",
  },
  startTimeContainer: {
    height: 90,
    width: 70,
    alignItems: "center",
    marginLeft: 20,
  },
  startTimeText: {
    fontSize: 15,
    color: "white",
  },
  lineBox: {
    height: 60,
    width: 2,
    marginTop: 5,
  },
};

export default Task;
