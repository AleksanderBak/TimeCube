import { View, Text, TouchableOpacity, FlatList } from "react-native";
import colors from "../configs/colors";
import { useRef } from "react";
import { set } from "firebase/database";

const CalendarCard = ({ dayNumber, month, active, id, setActiveDay }) => {
  let bgColor = active ? colors.focusedBottomTab : colors.calendarInactive;
  return (
    <TouchableOpacity
      style={[styles.calendarCard, { backgroundColor: bgColor }]}
      onPress={() => {
        setActiveDay(id);
      }}
    >
      <Text style={styles.calendarCardDay}>{dayNumber}</Text>
      <Text style={styles.calendarCardMonth}>{month}</Text>
    </TouchableOpacity>
  );
};

const Calendar = ({ days, activeDay, setActiveDay }) => {
  const flatListRef = useRef();

  const changeActiveDay = (id) => {
    setActiveDay(id);
    const index = days.findIndex((day) => day.id === id);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  return (
    <View style={styles.CalendarBox}>
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollsToTop={true}
        data={days}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CalendarCard
            dayNumber={item.day}
            month={item.month}
            active={item.id === activeDay}
            id={item.id}
            setActiveDay={changeActiveDay}
          />
        )}
      ></FlatList>
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
