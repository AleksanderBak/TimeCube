import { View, Text, StyleSheet, ScrollView } from "react-native";
import CalendarCard from "./CalendarCard";

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
    marginTop: 20,
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
};

export default Calendar;
