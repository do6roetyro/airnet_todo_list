import React, { useState, useEffect } from "react";
import { Button, TextField, Checkbox } from "@mui/material";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  tasks: { id: number; text: string; completed: boolean }[];
  onAddTask: (text: string) => void;
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  isHoliday: boolean;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  date,
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  isHoliday,
}) => {
  const [newTaskText, setNewTaskText] = useState("");
  const [error, setError] = useState("");

  const handleAddTask = () => {
    if (!newTaskText.trim() || /^\d+$/.test(newTaskText)) {
      setError("Укажите задачу корректно");
      return;
    }
    onAddTask(newTaskText);
    setNewTaskText("");
    setError("");
  };

  useEffect(() => {
    setNewTaskText(""); // Очистка текстового поля при открытии модального окна
    setError("");
  }, [isOpen]);

  return isOpen ? (
    <div className="task-modal">
      <div className="task-modal__header">
        <span
          className={`task-modal__date ${
            isHoliday ? "task-modal__date--holiday" : ""
          }`}
        >
          {date}
        </span>
        <Button className="task-modal__close" onClick={onClose}>
          X
        </Button>
      </div>
      <div className="task-modal__body">
        <h2>Список задач</h2>
        <ul className="task-modal__task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`task-modal__task ${
                task.completed ? "task-modal__task--completed" : ""
              }`}
            >
              <Checkbox
                checked={task.completed}
                onChange={() => onToggleTask(task.id)}
              />
              <span>{task.text}</span>
              <Button onClick={() => onDeleteTask(task.id)}>Удалить</Button>
            </li>
          ))}
        </ul>
        <div className="task-modal__add-task">
          <TextField
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Добавить задачу"
            error={Boolean(error)}
            helperText={error}
          />
          <Button onClick={handleAddTask}>OK</Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default TaskModal;