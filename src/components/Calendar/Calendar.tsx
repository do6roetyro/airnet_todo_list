import React, { useEffect, useState } from "react";
import Week from "./Week";
import { DAYS_OF_WEEK } from "../../utils/variables";
import { generateCalendar } from "../../utils/generateCalendar";
import { isDayOff } from "../../services/isDayOffService";

interface CalendarProps {
  year: number;
  month: number;
  tasks: any;
  onDayClick: (date: { date: number; month: number; year: number }) => void;
  onWeekClick: (startOfWeek: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  year,
  month,
  tasks,
  onDayClick,
  onWeekClick,
}) => {
  const [holidays, setHolidays] = useState<{ [day: number]: boolean }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHolidays = async (year: number, month: number) => {
      const monthHolidays = await isDayOff(year, month);
      setHolidays(monthHolidays);
    };

    setIsLoading(true);
    fetchHolidays(year, month).finally(() => setIsLoading(false));
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

  const startOfWeekOffset = (startOfWeek: Date): Date => {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() - ((date.getDay() + 6) % 7)); // Смещение к понедельнику
    return date;
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
        generateCalendar(year, month, tasks).map((week, index) => {
          const startOfWeek = startOfWeekOffset(new Date(year, month, week[0].date));
          return (
            <div className="calendar-table__week" key={index}>
              <div
                className={`calendar-table__week-point ${
                  hasTasksForWeek(startOfWeek)
                    ? "calendar-table__week-point--has-tasks"
                    : "calendar-table__week-point--no-tasks"
                }`}
                onClick={() =>
                  hasTasksForWeek(startOfWeek) && onWeekClick(startOfWeek)
                }
              />
              <Week
                days={week}
                holidays={holidays}
                onDayClick={(date) => onDayClick({ date: date.date, month: date.month, year: date.year })}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default Calendar;