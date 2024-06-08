import React, { useEffect, useState } from "react";
import Week from "./Week";
import { DAYS_OF_WEEK } from "../../utils/variables";
import { generateCalendar } from "../../utils/generateCalendar";
import {
  fetchHolidays,
  hasTasksForWeek,
  startOfWeekOffset,
} from "../../utils/calendarUtils";

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
    fetchHolidays(year, month, setHolidays, setIsLoading);
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
        generateCalendar(year, month, tasks).map((week, index) => {
          const startOfWeek = startOfWeekOffset(
            new Date(year, month, week[0].date)
          );
          const hasTasks = hasTasksForWeek(startOfWeek, tasks);
          return (
            <div className="calendar-table__week" key={index}>
              <div
                className={`calendar-table__week-point ${
                  hasTasks
                    ? "calendar-table__week-point--has-tasks"
                    : "calendar-table__week-point--no-tasks"
                }`}
                onClick={() => hasTasks && onWeekClick(startOfWeek)}
                tabIndex={hasTasks ? 0 : -1}
              />
              <Week
                days={week}
                holidays={holidays}
                onDayClick={(date) =>
                  onDayClick({
                    date: date.date,
                    month: date.month,
                    year: date.year,
                  })
                }
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default Calendar;
