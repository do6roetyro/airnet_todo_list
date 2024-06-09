import React from "react";
import { render, screen, fireEvent, waitFor } from "../test_utils/test-utils";
import Calendar from "../components/Calendar/Calendar";
import { mockUser, TasksByYear } from "../test_utils/mockUser";

// Мокируем fetchHolidays
jest.mock("../utils/calendarUtils", () => ({
  ...jest.requireActual("../utils/calendarUtils"),
  fetchHolidays: jest.fn((year, month, setHolidays, setIsLoading) => {
    setHolidays({});
    setIsLoading(false);
    return Promise.resolve(); // Имитация завершения асинхронной операции
  }),
}));

describe("Calendar", () => {
  const onDayClick = jest.fn();
  const onWeekClick = jest.fn();

  it("рендер календаря и проверка наличия задач", async () => {
    const tasks = mockUser.tasks;

    render(
      <Calendar
        year={2024}
        month={5}
        tasks={tasks}
        onDayClick={onDayClick}
        onWeekClick={onWeekClick}
      />
    );
    console.log("Rendered Calendar with user context");
    console.log(tasks);

    // Ожидание завершения рендеринга и проверка наличия дня с задачами
    await waitFor(() => {
      expect(screen.getByText("5")).toBeInTheDocument();
    });

    const dayWithTasks = screen
      .getAllByText("5")
      .find((day) => day.closest(".calendar-table__day--has-tasks"));
    expect(dayWithTasks).toBeDefined();
    expect(dayWithTasks).toHaveClass("calendar-table__day--has-tasks");
  });

  it("проверка добавления и удаления классов при изменении задач", async () => {
    const tasks = mockUser.tasks;

    render(
      <Calendar
        year={2024}
        month={5}
        tasks={tasks}
        onDayClick={onDayClick}
        onWeekClick={onWeekClick}
      />
    );

    // Ожидание завершения рендеринга и проверка наличия дня без задач
    await waitFor(() => {
      expect(screen.getByText("6")).toBeInTheDocument();
    });

    const dayWithoutTasks = screen
      .getAllByText("6")
      .find((day) => day.closest(".calendar-table__day"));
    expect(dayWithoutTasks).toBeDefined();
    expect(dayWithoutTasks).not.toHaveClass("calendar-table__day--has-tasks");

    if (dayWithoutTasks) {
      fireEvent.click(dayWithoutTasks);
    }
    expect(onDayClick).toHaveBeenCalledWith({ date: 6, month: 5, year: 2024 });

    // Добавление задачи
    const updatedTasks: TasksByYear = {
      ...tasks,
      2024: {
        ...tasks[2024],
        5: {
          ...tasks[2024][5],
          6: [{ id: 1, text: "Task 1", completed: false }],
        },
      },
    };

    render(
      <Calendar
        year={2024}
        month={5}
        tasks={updatedTasks}
        onDayClick={onDayClick}
        onWeekClick={onWeekClick}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("6")).toBeInTheDocument();
    });

    const updatedDayWithTasks = screen
      .getAllByText("6")
      .find((day) => day.closest(".calendar-table__day--has-tasks"));
    expect(updatedDayWithTasks).toBeDefined();
    expect(updatedDayWithTasks).toHaveClass("calendar-table__day--has-tasks");

    // Удаление задачи
    const tasksAfterDelete: TasksByYear = {
      ...tasks,
      2024: {
        ...tasks[2024],
        5: {
          ...tasks[2024][5],
          6: [],
        },
      },
    };

    render(
      <Calendar
        year={2024}
        month={5}
        tasks={tasksAfterDelete}
        onDayClick={onDayClick}
        onWeekClick={onWeekClick}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("6")).toBeInTheDocument();
    });

    const updatedDayWithoutTasks = screen
      .getAllByText("6")
      .find((day) => day.closest(".calendar-table__day"));
    expect(updatedDayWithoutTasks).toBeDefined();
    expect(updatedDayWithoutTasks).not.toHaveClass(
      "calendar-table__day--has-tasks"
    );
  });
});
