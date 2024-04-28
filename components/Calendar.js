import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import colors from "../configs/colors";

const CalendarCard = ({ dayNumber, month, active }) => {
  let bgColor = active ? colors.calendarActive : colors.calendarInactive;
  return (
    <TouchableOpacity
      style={[styles.calendarCard, { backgroundColor: bgColor }]}
    >
      <Text style={styles.calendarCardDay}>{dayNumber}</Text>
      <Text style={styles.calendarCardMonth}>{month}</Text>
    </TouchableOpacity>
  );
};

const Calendar = () => {
  return (
    <View style={styles.CalendarBox}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <CalendarCard dayNumber={27} month={"Feb"} active={true} />
        <CalendarCard dayNumber={28} month={"Feb"} active={false} />
        <CalendarCard dayNumber={29} month={"Feb"} active={false} />
        <CalendarCard dayNumber={30} month={"Feb"} active={false} />
        <CalendarCard dayNumber={31} month={"Feb"} active={false} />
        <CalendarCard dayNumber={32} month={"Feb"} active={false} />
        <CalendarCard dayNumber={33} month={"Feb"} active={false} />
        <CalendarCard dayNumber={34} month={"Feb"} active={false} />
      </ScrollView>
    </View>
  );
};

const styles = {
  CalendarBox: {
    height: 100,
    marginTop: 40,
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryText,
  },
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
    color: colors.primaryText,
  },
  calendarCardMonth: {
    textAlign: "center",
    fontSize: 12,
    color: colors.primaryText,
  },
};

export default Calendar;
