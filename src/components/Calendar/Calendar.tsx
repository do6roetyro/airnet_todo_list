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
  const [holidays, setHolidays] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchHolidays = async () => {
      const holidaysData = await isDayOff(year, month);
      setHolidays(holidaysData);
    };

    fetchHolidays();
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
      {generateCalendar(year, month, tasks).map((week, index) => (
        <div className="calendar-table__week" key={index}>
          <Week days={week} holidays={holidays} onDayClick={onDayClick} />
        </div>
      ))}
    </div>
  );
};

export default Calendar;
