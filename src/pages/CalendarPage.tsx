import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CurrentYear from "../components/Calendar/CurrentYear";
import MonthList from "../components/Calendar/MonthList";
import Calendar from "../components/Calendar/Calendar";
import TaskModal from "../components/TaskModal/TaskModal";
import { useUser } from "../contexts/UserContext";

const CalendarPage: React.FC = () => {
  const { user, login } = useUser();
  const navigate = useNavigate();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<
    { id: number; text: string; completed: boolean }[]
  >([]);

  useEffect(() => {
    if (selectedDate && user) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();
      const tasks = user.tasks[year]?.[month]?.[day] || [];
      setSelectedTasks(tasks);
    }
  }, [selectedDate, user]);

  if (!user) {
    return (
      <p className="main-container__description">
        Пожалуйста, зарегистрируйтесь или войдите в свой профиль, чтобы увидеть
        задачи.
      </p>
    );
  }

  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);
  const handleSelectMonth = (month: number) => setMonth(month);

  const tasks = user.tasks;

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

  const handleDayClick = (date: number) => {
    const currentDate = new Date(year, month, date);
    setSelectedDate(currentDate);
    setIsModalOpen(true);
  };

  const handleWeekClick = (startOfWeek: Date) => {
    const tasksForWeek = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      if (user.tasks[year]?.[month]?.[day]) {
        tasksForWeek.push({
          date: date.toISOString(),
          tasks: user.tasks[year][month][day],
        });
      }
    }
    navigate("/week-tasks", { state: { startOfWeek: startOfWeek.toISOString(), tasks: tasksForWeek } });
  };

  const handleAddTask = (text: string) => {
    if (selectedDate && user) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();

      if (!user.tasks[year]) user.tasks[year] = {};
      if (!user.tasks[year][month]) user.tasks[year][month] = {};
      if (!user.tasks[year][month][day]) user.tasks[year][month][day] = [];

      const newTask = { id: Date.now(), text, completed: false };
      user.tasks[year][month][day].push(newTask);

      setSelectedTasks((prevTasks) => [...prevTasks, newTask]);

      login({ ...user, tasks: { ...user.tasks } }); // обновление данных пользователя
    }
  };

  const handleToggleTask = (id: number) => {
    if (selectedDate && user) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();

      const tasks = user.tasks[year][month][day];
      const taskIndex = tasks.findIndex((t: any) => t.id === id);
      if (taskIndex > -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;

        setSelectedTasks([...tasks]);

        login({ ...user, tasks: { ...user.tasks } }); // обновление данных пользователя
      }
    }
  };

  const handleDeleteTask = (id: number) => {
    if (selectedDate && user) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();

      const tasks = user.tasks[year][month][day];
      user.tasks[year][month][day] = tasks.filter((t: any) => t.id !== id);

      setSelectedTasks(user.tasks[year][month][day]);

      login({ ...user, tasks: { ...user.tasks } }); // обновление данных пользователя
    }
  };

  const handleModalClose = () => {
    if (selectedDate && user) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();

      if (user.tasks[year]?.[month]?.[day]?.length === 0) {
        delete user.tasks[year][month][day];
        if (Object.keys(user.tasks[year][month]).length === 0) {
          delete user.tasks[year][month];
        }
        if (Object.keys(user.tasks[year]).length === 0) {
          delete user.tasks[year];
        }
        login({ ...user, tasks: { ...user.tasks } });
      }
    }
    setIsModalOpen(false);
  };

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
        onDayClick={handleDayClick}
        onWeekClick={handleWeekClick}
      />
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        date={selectedDate ? selectedDate.toLocaleDateString() : ""}
        tasks={selectedTasks}
        onAddTask={handleAddTask}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        isHoliday={false} // Передайте правильное значение в зависимости от того, праздничный это день или нет
      />
    </section>
  );
};

export default CalendarPage;
