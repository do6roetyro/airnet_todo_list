import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskModal from '../components/TaskModal/TaskModal';
import { mockTasks } from '../test_utils/mocks';

describe('TaskModal', () => {
  const onAddTask = jest.fn();
  const onToggleTask = jest.fn();
  const onDeleteTask = jest.fn();
  const onClose = jest.fn();

  it('рендер модального окна задач и проверка наличия задач', () => {
    render(
      <TaskModal
        isOpen={true}
        onClose={onClose}
        date="2024-05-30"
        tasks={mockTasks}
        onAddTask={onAddTask}
        onToggleTask={onToggleTask}
        onDeleteTask={onDeleteTask}
        isHoliday={false}
      />
    );

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('добавление задачи', () => {
    render(
      <TaskModal
        isOpen={true}
        onClose={onClose}
        date="2024-05-30"
        tasks={mockTasks}
        onAddTask={onAddTask}
        onToggleTask={onToggleTask}
        onDeleteTask={onDeleteTask}
        isHoliday={false}
      />
    );

    fireEvent.change(screen.getByLabelText('Добавить задачу'), { target: { value: 'New Task' } });
    fireEvent.click(screen.getByText('OK'));

    expect(onAddTask).toHaveBeenCalledWith('New Task');
  });
});