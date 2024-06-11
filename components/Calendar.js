import { View, Text, TouchableOpacity, FlatList } from "react-native";
import colors from "../configs/colors";
import { useRef, useEffect } from "react";
import { set } from "firebase/database";
import fonts from "../configs/fonts";
import { useFonts } from "expo-font";

const CalendarCard = ({ dayNumber, month, active, id, setActiveDay }) => {
  let bgColor = active ? colors.calendarActive : colors.calendarInactive;

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

  const today = new Date();

  return (
    <View style={styles.CalendarBox}>
      <View style={styles.todayBox}>
        <Text
          style={{
            color: colors.primaryText,
            fontSize: 15,
            marginTop: 10,
            fontFamily: "PoppinsLight",
          }}
        >
          Today
        </Text>
        <Text style={styles.today}>{today.toDateString()}</Text>
      </View>
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollsToTop={true}
        scrollEnabled={false}
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
    height: 145,
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 15,
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryText,
  },
  todayBox: {
    marginBottom: 5,
    alignSelf: "stretch",
    alignItems: "flex-start",
  },
  today: {
    color: colors.primaryText,
    fontSize: 18,
    fontFamily: fonts.Bold,
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
    includeFontPadding: false,
    textAlign: "center",
    fontSize: 20,
    color: colors.primaryText,
    fontFamily: fonts.Regular,
  },
  calendarCardMonth: {
    textAlign: "center",
    fontSize: 12,
    color: colors.primaryText,
    fontFamily: fonts.Light,
  },
};

export default Calendar;
