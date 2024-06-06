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
  onWeekClick: (startOfWeek: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  year,
  month,
  tasks,
  onDayClick,
  onWeekClick,
}) => {
  const [holidays, setHolidays] = useState<{
    [month: number]: { [day: number]: boolean };
  }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHolidays = async (year: number) => {
      const yearHolidays = await isDayOff(year, month);
      setHolidays((prevHolidays) => ({
        ...prevHolidays,
        [month]: yearHolidays,
      }));
    };

    setIsLoading(true);
    fetchHolidays(year).finally(() => setIsLoading(false));
  }, [year, month]);

  const hasTasksForWeek = (startOfWeek: Date): boolean => {
    const tasksForWeek = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      if (tasks[year]?.[month]?.[day]?.length > 0) {
        tasksForWeek.push(tasks[year][month][day]);
      }
    }
    return tasksForWeek.length > 0;
  };

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
            <div
              className={`calendar-table__week-point ${
                hasTasksForWeek(new Date(year, month, index * 7 + 1))
                  ? "calendar-table__week-point--has-tasks"
                  : "calendar-table__week-point--no-tasks"
              }`}
              onClick={() =>
                hasTasksForWeek(new Date(year, month, index * 7 + 1)) &&
                onWeekClick(new Date(year, month, index * 7 + 1))
              }
            />
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