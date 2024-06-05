import React from "react";
import CurrentYear from "../components/Calendar/CurrentYear";

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
  return (
    <section className="calendar">
      
    </section>
  );
};

export default CalendarPage;
