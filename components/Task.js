import { View, Text } from "react-native";
import cubeColors from "../configs/availableCubeColors";
import colors from "../configs/colors";
import fonts from "../configs/fonts";

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
    fontFamily: fonts.Light,
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
    includeFontPadding: false,
    fontFamily: fonts.Regular,
  },
  startTimeContainer: {
    height: 90,
    width: 40,
    alignItems: "center",
    marginRight: 5,
  },
  startTimeText: {
    fontSize: 15,
    color: colors.primaryText,
    includeFontPadding: false,
    fontFamily: fonts.Light,
  },
  lineBox: {
    height: 60,
    width: 2,
  },
};

export default Task;
