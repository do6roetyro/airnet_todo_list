import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from '@mui/material/Button';

const WeekTasksPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startOfWeek, tasks, year, month } = location.state || {};

  if (!startOfWeek || !tasks) {
    return <p>Нет данных для отображения.</p>;
  }

  const startDate = new Date(startOfWeek);
  const endDate = new Date(startOfWeek);
  endDate.setDate(endDate.getDate() + 6);

  return (
    <div className="week-tasks-page">
      <div className="week-tasks-page__header">
        <h2 className="week-tasks-page__title">Список задач на неделю</h2>
        <p className="week-tasks-page__interval">
          {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
        </p>
      </div>
      <div className="week-tasks-page__body">
        {tasks.map((task: any) => (
          <div className="week-tasks-page__container" key={task.date}>
            <h3 className="week-tasks-page__day">
              {new Date(task.date).toLocaleDateString()}
            </h3>
            <ul className="week-tasks-page__list list">
              {task.tasks.map((t: any) => (
                <li
                  key={t.id}
                  className={`week-tasks-page__item ${
                    t.completed ? "week-tasks-page__item--completed" : ""
                  }`}
                >
                  {t.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Button
          className="week-tasks-page__return-button"
          variant="contained"
          color="primary"
          onClick={() => navigate("/calendar", { state: { year, month } })}
        >
          Вернуться в календарь
        </Button>
      </div>
    </div>
  );
};

export default WeekTasksPage;
