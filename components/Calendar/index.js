import dayjs from "dayjs";
import "dayjs/locale/ru";
import { View, Text } from "react-native";
import { toUpper, shortLocale, convertToMatrix } from "../../common/constants";
import { styles } from "../../common/styles";

const localeData = require("dayjs/plugin/localeData");

dayjs.extend(localeData);
dayjs().localeData();
dayjs.locale(shortLocale);

const Calendar = ({
  selectedMonth,
  advancedStyleDay,
  advancedStyleHeadDay,
  advancedStyleContainer,
}) => {
  const month = selectedMonth ? dayjs().month(selectedMonth) : dayjs();
  const monthName = toUpper(month.format("MMMM"));
  const weekDays = dayjs.weekdaysMin(true);

  const calendarDays = {
    first: month.startOf("M").startOf("w").date(),
    last: month.endOf("M").date(),
  };

  const monthDays = {
    lastPrevious: month.subtract(1, "M").endOf("M").date(),
    lastCurrent: month.endOf("M").date(),
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
        calendar[index] = [day++, true];
      }
    }

    for (let day = 1; index <= maxDays; index++) {
      if (day > monthDays.lastCurrent) {
        calendar[index] = [nextDay++, true];
        isNextMonth = true;
      }

      if (!isNextMonth) {
        calendar[index] = [day++, false];
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
          <Text
            style={[styles.day, day[1] && styles.dayGlass, advancedStyleDay]}
            key={day}
          >
            {day}
          </Text>
        ))}
      </View>
    ));
  };

  const weeks = drawWeeks();

  const head = weekDays.map((x) => (
    <Text key={x} style={[styles.headDay, advancedStyleHeadDay]}>
      {toUpper(x)}
    </Text>
  ));

  return (
    <View style={[styles.calendarContainer, advancedStyleContainer]}>
      <Text style={styles.month}>{monthName}</Text>
      <View style={styles.head}>{head}</View>
      {weeks}
    </View>
  );
};

export default Calendar;
