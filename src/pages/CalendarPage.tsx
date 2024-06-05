import React, { useState } from "react";
import CurrentYear from "../components/Calendar/CurrentYear";
import MonthList from "../components/Calendar/MonthList";
import Calendar from "../components/Calendar/Calendar";

const fakeDb = [
  {
    id: 1,
    firstName: "John",
    lastName: "Biden",
    email: "john.bid@fake.com",
    password: "password123",
    tasks: {
      "2024": {
        "5": {
          "30": [
            {
              id: 1,
              text: "Провести совещание с конгрессом",
              completed: false,
            },
            {
              id: 2,
              text: "Выгулять собаку",
              completed: true,
            },
            {
              id: 3,
              text: "Поесть кукурузу",
              completed: true,
            },
          ],
        },
        "6": {
          "1": [
            {
              id: 4,
              text: "Покататься на велосипеде в Централ-Парк",
              completed: false,
            },
          ],
        },
      },
    },
  },
  {
    id: 2,
    firstName: "Cat",
    lastName: "Boris",
    email: "cat.boris@meow.com",
    password: "password456",
    tasks: {
      "2024": {
        "3": {
          "21": [
            {
              id: 5,
              text: "Поесть корм",
              completed: false,
            },
            {
              id: 6,
              text: "Поспать",
              completed: true,
            },
          ],
        },
        "6": {
          "2": [
            {
              id: 7,
              text: "Помурчать у хозяйки на груди",
              completed: false,
            },
          ],
        },
      },
    },
  },
];

const CalendarPage: React.FC = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);
  const handleSelectMonth = (month: number) => setMonth(month);

  const tasks = fakeDb.reduce((acc, user) => {
    return { ...acc, ...user.tasks };
  }, {});

  const getTasksByMonth = (
    tasks: any,
    year: number
  ): { [key: number]: boolean } => {
    const tasksByMonth: { [key: number]: boolean } = {};

    if (tasks[year]) {
      Object.keys(tasks[year]).forEach((month) => {
        tasksByMonth[parseInt(month) - 1] = true; // Преобразование месяца к индексу (0-11)
      });
    }

    return tasksByMonth;
  };

  const tasksByMonth = getTasksByMonth(tasks, year);

  return (
    <section className="calendar">
      <CurrentYear
        year={year}
        onPrev={handlePrevYear}
        onNext={handleNextYear}
      />
      <MonthList
        currentMonth={month}
        onSelectMonth={handleSelectMonth}
        tasksByMonth={tasksByMonth}
      />
      <Calendar
        year={year}
        month={month}
        tasks={tasks}
        onDayClick={(date) => console.log(date)}
      />
    </section>
  );
};

export default CalendarPage;
