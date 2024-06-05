import React, { useEffect, useState } from "react";
import Week from "./Week";
import { DAYS_OF_WEEK } from "../../utils/variables";
import { generateCalendar } from "../../utils/generateCalendar";
import { isDayOff } from "../../services/isDayOffService";

interface CalendarProps {
  year: number;
  month: number;
  tasks: any;
  onDayClick: (date: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  year,
  month,
  tasks,
  onDayClick,
}) => {
  const [holidays, setHolidays] = useState<{
    [month: number]: { [day: number]: boolean };
  }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchHolidays = async (year: number, month: number) => {
    const currentMonthHolidays = await isDayOff(year, month);
    const prevMonth = (month - 1 + 12) % 12;
    const prevYear = prevMonth === 11 ? year - 1 : year;
    const prevMonthHolidays = await isDayOff(prevYear, prevMonth);

    const nextMonth = (month + 1) % 12;
    const nextYear = nextMonth === 0 ? year + 1 : year;
    const nextMonthHolidays = await isDayOff(nextYear, nextMonth);

    setHolidays((prevHolidays) => ({
      ...prevHolidays,
      [month]: currentMonthHolidays,
      [prevMonth]: prevMonthHolidays,
      [nextMonth]: nextMonthHolidays,
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchHolidays(year, month).finally(() => setIsLoading(false));
  }, [year, month]);

  return (
    <div className="calendar__table calendar-table">
      <div className="calendar-table__header">
        {DAYS_OF_WEEK.map((day, index) => (
          <div key={index} className="calendar-table__header-day">
            {day}
          </div>
        ))}
      </div>
      {isLoading ? (
        <div className="calendar__loading">
          Подождите - приложение готовится к работе
        </div>
      ) : (
        generateCalendar(year, month, tasks).map((week, index) => (
          <div className="calendar-table__week" key={index}>
            <Week
              days={week}
              holidays={holidays[month] || {}}
              onDayClick={onDayClick}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Calendar;
