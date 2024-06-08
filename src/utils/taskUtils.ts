interface Task {
    id: number;
    text: string;
    completed: boolean;
  }
  
  interface User {
    id: string; // Изменение типа id на string
    firstName: string;
    lastName: string;
    email: string;
    tasks: {
      [year: number]: {
        [month: number]: {
          [day: number]: Task[];
        };
      };
    };
  }
  
  export const getTasksByMonth = (tasks: User["tasks"], year: number): { [key: number]: boolean } => {
    const tasksByMonth: { [key: number]: boolean } = {};
  
    if (tasks[year]) {
      Object.keys(tasks[year]).forEach((month) => {
        tasksByMonth[parseInt(month) - 1] = true;
      });
    }
  
    return tasksByMonth;
  };
  
  export const handleAddTask = (
    text: string,
    selectedDate: Date | null,
    user: User,
    setSelectedTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    login: (user: User) => void
  ): void => {
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
  
      login({ ...user, tasks: { ...user.tasks } });
    }
  };
  
  export const handleToggleTask = (
    id: number,
    selectedDate: Date | null,
    user: User,
    setSelectedTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    login: (user: User) => void
  ): void => {
    if (selectedDate && user) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();
  
      const tasks = user.tasks[year][month][day];
      const taskIndex = tasks.findIndex((t) => t.id === id);
      if (taskIndex > -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
  
        setSelectedTasks([...tasks]);
  
        login({ ...user, tasks: { ...user.tasks } });
      }
    }
  };
  
  export const handleDeleteTask = (
    id: number,
    selectedDate: Date | null,
    user: User,
    setSelectedTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    login: (user: User) => void
  ): void => {
    if (selectedDate && user) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();
  
      const tasks = user.tasks[year][month][day];
      user.tasks[year][month][day] = tasks.filter((t) => t.id !== id);
  
      setSelectedTasks(user.tasks[year][month][day]);
  
      login({ ...user, tasks: { ...user.tasks } });
    }
  };