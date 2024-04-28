import { View, Text, StyleSheet } from "react-native";
import colors from "../configs/colors";

const EmptyTask = ({ timeStart, timeEnd }) => {
  return (
    <View style={styles.emptyTaskBox}>
      <View style={styles.topDividerHorizontal}></View>
      <View style={styles.topDividerVertical}></View>
      <Text style={styles.emptyTaskText}>
        {timeStart} - {timeEnd}
      </Text>
      <View style={styles.bottomDividerVertical}></View>
      <View style={styles.bottomDividerHorizontal}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyTaskBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTaskText: {
    fontSize: 15,
    color: colors.emptyTaskText,
  },
  topDividerHorizontal: {
    width: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryText,
  },
  topDividerVertical: {
    height: 20,
    width: 1,
    backgroundColor: colors.primaryText,
    marginBottom: 10,
  },
  bottomDividerVertical: {
    marginTop: 10,
    height: 20,
    width: 1,
    backgroundColor: colors.primaryText,
  },
  bottomDividerHorizontal: {
    width: 30,
    borderTopWidth: 1,
    borderTopColor: colors.primaryText,
    marginBottom: 10,
  },
});

export default EmptyTask;
