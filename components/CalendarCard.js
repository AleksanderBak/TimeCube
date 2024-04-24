import { View, Text, TouchableOpacity } from "react-native";

const CalendarCard = ({ dayNumber, month, active }) => {
  let bgColor = active ? "#6552FE" : "#6B6980";
  return (
    <TouchableOpacity
      style={[styles.calendarCard, { backgroundColor: bgColor }]}
    >
      <Text style={styles.calendarCardDay}>{dayNumber}</Text>
      <Text style={styles.calendarCardMonth}>{month}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  calendarCard: {
    height: 60,
    width: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  calendarCardDay: {
    textAlign: "center",
    fontSize: 22,
    color: "white",
  },
  calendarCardMonth: {
    textAlign: "center",
    fontSize: 12,
    color: "#DEDEDE",
  },
};

export default CalendarCard;
