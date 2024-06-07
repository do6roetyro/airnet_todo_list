import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Checkbox,
  Modal,
  Box,
  Backdrop,
  Fade,
} from "@mui/material";
import cross from "../../assets/images/cross.svg";
import trash from "../../assets/images/trash.svg";

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
    setNewTaskText("");
    setError("");
  }, [isOpen]);

  // const style = {
  //   position: "absolute" as "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: 400,
  //   bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  //   p: 4,
  //   borderRadius: "8px",
  // };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box className="task-modal">
          <div className="task-modal__header">
            <span
              className={`task-modal__date ${
                isHoliday ? "task-modal__date--holiday" : ""
              }`}
            >
              {date}
            </span>
            <Button className="task-modal__close" onClick={onClose}>
              <span className="visually-hidden">Закрыть</span>
              <img
                src={cross as unknown as string}
                alt="Крестик"
                className="social__logo"
                width={32}
                height={32}
              />
            </Button>
          </div>
          <div className="task-modal__body">
            <h2 className="task-modal__title">Список задач</h2>
            {tasks.length === 0 ? (
              <p className="task-modal__empty">Список пуст</p>
            ) : (
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
                    <span className="task-modal__text">{task.text}</span>
                    <Button onClick={() => onDeleteTask(task.id)}>
                    <span className="visually-hidden">Удалить задачу</span>
              <img
                src={trash as unknown as string}
                alt="Корзина"
                className="task-modal__delete-button"
                width={32}
                height={32}
              />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
            <div className="task-modal__add-task">
              <TextField
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                label="Добавить задачу"
                multiline
                maxRows={4}
                size="small"
                error={Boolean(error)}
                helperText={error}
              />
              <Button
                className="task-modal__add-task-button"
                variant="contained"
                onClick={handleAddTask}
              >
                OK
              </Button>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TaskModal;
