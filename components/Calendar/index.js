import React from "react";
import moment from "moment";
import "moment/locale/ru";
import { StyleSheet, View, Text } from "react-native";
import { toUpper, shortLocale, convertToMatrix } from "../../common/constants";

const Calendar = ({ selectedMonth }) => {
  moment.locale(shortLocale);

  const month = selectedMonth ? moment(selectedMonth, "MM") : moment();
  const monthName = toUpper(month.format("MMMM"));
  const weekDays = moment.weekdaysShort(true);

  const calendarDays = {
    first: month.clone().startOf("month").startOf("week").date(),
    last: month.clone().endOf("month").date(),
  };

  const monthDays = {
    lastPrevious: month.clone().subtract(1, "months").endOf("month").date(),
    lastCurrent: month.clone().endOf("month").date(),
  };

  const createCalendarArray = () => {
    let index = 0;
    let nextDay = 1;
    let isNextMonth = false;
    let calendar = [];
    const maxDays = 41;

    if (calendarDays.first > 1) {
      for (
        let day = calendarDays.first;
        day <= monthDays.lastPrevious;
        index++
      ) {
        calendar.push([day++, true]);
      }
    }

    for (let day = 1; index <= maxDays; index++) {
      if (day > monthDays.lastCurrent) {
        calendar.push([nextDay++, true]);
        isNextMonth = true;
      }

      if (!isNextMonth) {
        calendar.push([day++, false]);
      }
    }

    return calendar;
  };

  const drawWeeks = () => {
    const calendarArray = createCalendarArray();
    const calendar = convertToMatrix(calendarArray);

    return [...Array(calendar.length).keys()].map((week, index) => (
      <View key={week} style={styles.week}>
        {calendar[index].map((day) => (
          <Text style={[styles.day, day[1] && styles.dayGlass]} key={day}>
            {day}
          </Text>
        ))}
      </View>
    ));
  };

  const weeks = drawWeeks();

  const head = weekDays.map((x) => (
    <Text key={x} style={styles.headDay}>
      {toUpper(x)}
    </Text>
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.month}>{monthName}</Text>
      <View style={styles.head}>{head}</View>
      {weeks}
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    zIndex: 11,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  month: {
    alignSelf: "center",
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 60,
    letterSpacing: 0,
    color: "#ffffff",
    marginBottom: 18,
  },
  head: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
    paddingBottom: 8,
    marginBottom: 8,
  },
  headDay: {
    fontSize: 26,
    fontStyle: "normal",
    width: 36,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
  },
  week: {
    flexDirection: "row",
    paddingVertical: 4,
  },
  day: {
    fontSize: 26,
    fontStyle: "normal",
    width: 36,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
  },
  dayGlass: {
    color: "rgba(255, 255, 255, 0.3)",
  },
});
