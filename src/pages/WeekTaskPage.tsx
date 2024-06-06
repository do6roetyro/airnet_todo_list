import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TaskModal from "../components/TaskModal/TaskModal";

const WeekTasksPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startOfWeek, tasks } = location.state || {};

  if (!startOfWeek || !tasks) {
    return <p>Нет данных для отображения.</p>;
  }

  const startDate = new Date(startOfWeek);
  const endDate = new Date(startOfWeek);
  endDate.setDate(endDate.getDate() + 6);

  return (
    <div className="week-tasks-page">
      <div className="week-tasks-page__header">
        <h2>Список задач на неделю</h2>
        <p>
          {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
        </p>
        <button onClick={() => navigate("/calendar")}>Вернуться в календарь</button>
      </div>
      <div className="week-tasks-page__body">
        {tasks.map((task: any) => (
          <div key={task.date} className="week-tasks-page__day">
            <h3>{new Date(task.date).toLocaleDateString()}</h3>
            <ul>
              {task.tasks.map((t: any) => (
                <li key={t.id} className={`task ${t.completed ? "task--completed" : ""}`}>
                  {t.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekTasksPage;