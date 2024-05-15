import { View, Text } from "react-native";
import cubeColors from "../configs/availableCubeColors";
import colors from "../configs/colors";
import fonts from "../configs/fonts";

const Task = ({ name, stopTime, startTime, color }) => {
  const bgColor = cubeColors[color].dim;
  const borderColor = cubeColors[color].bright;

  const start = new Date(startTime * 1000);
  const stop = new Date(stopTime * 1000);

  const startHours = start.getHours() + "";
  const startMinutes = start.getMinutes() + "";
  const startString = `${startHours}:${
    startMinutes.length > 1 ? startMinutes : "0" + startMinutes
  }`;

  const stopHours = stop.getHours() + "";
  const stopMinutes = stop.getMinutes() + "";
  const stopString = `${stopHours}:${
    stopMinutes.length > 1 ? stopMinutes : "0" + stopMinutes
  }`;

  const durationHours = Math.floor(((stop - start) % 86400000) / 3600000);
  const durationMinutes = Math.floor(
    (((stop - start) % 86400000) % 3600000) / 60000
  ).toString();

  const duration = `${durationHours}:${
    durationMinutes.length > 1 ? durationMinutes : "0" + durationMinutes
  }`;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{startString}</Text>
        <View style={[styles.lineBox, { backgroundColor: borderColor }]}></View>
        <Text style={styles.timeText}>{stopString}</Text>
      </View>
      <View
        style={[
          styles.nameContainer,
          { backgroundColor: bgColor, borderLeftColor: borderColor },
        ]}
      >
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <View style={styles.durationContainer}>
        <Text style={styles.durationText}>{duration}</Text>
      </View>
    </View>
  );
};

const styles = {
  mainContainer: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nameContainer: {
    height: 70,
    width: 200,
    borderLeftWidth: 6,
    borderRadius: 7,
  },
  nameText: {
    fontSize: 17,
    color: colors.primaryText,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: fonts.Light,
  },
  durationContainer: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.primaryText,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  durationText: {
    fontSize: 18,
    color: colors.primaryText,
    includeFontPadding: false,
    fontFamily: fonts.DigitalBold,
  },
  timeContainer: {
    height: 90,
    width: 40,
    alignItems: "center",
    marginRight: 5,
    justifyContent: "center",
  },
  timeText: {
    fontSize: 12,
    color: colors.primaryText,
    includeFontPadding: false,
    fontFamily: fonts.Digital,
  },
  lineBox: {
    height: 20,
    width: 2,
    margin: 5,
  },
};

export default Task;
