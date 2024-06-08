type Task = {
    id: number;
    text: string;
    completed: boolean;
  };
  
  type TasksByDay = {
    [day: number]: Task[];
  };
  
  type TasksByMonth = {
    [month: number]: TasksByDay;
  };
  
  export type TasksByYear = {
    [year: number]: TasksByMonth;
  };
  
  type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    tasks: TasksByYear;
  };
  
  export const mockUser: User = {
    id: '4',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@fake.com',
    password: 'password321',
    tasks: {
      2023: {
        10: {
          5: [
            { id: 16, text: 'Сдать отчет', completed: true },
            { id: 17, text: 'Закрыть годовые счета', completed: false },
          ],
        },
        11: {
          28: [{ id: 18, text: 'Посетить конференцию', completed: false }],
        },
        12: {
          2: [
            { id: 20, text: 'Написать отчет по проекту', completed: false },
            { id: 21, text: 'Подготовка к совещанию', completed: false },
          ],
          3: [{ id: 19, text: 'Посетить конференцию', completed: false }],
          5: [{ id: 22, text: 'Встреча с партнерами', completed: false }],
        },
      },
      2024: {
        2: {
          14: [
            { id: 23, text: 'День Святого Валентина', completed: true },
            { id: 24, text: 'Встреча с друзьями', completed: false },
          ],
          20: [{ id: 25, text: 'Подготовка к презентации', completed: false }],
        },
        5: {
          5: [{ id: 28, text: 'Встреча с клиентом', completed: false }],
          6: [{ id: 29, text: 'Завершить первую фазу проекта X', completed: false }],
        },
        6: {
          3: [{ id: 27, text: 'Начать проект X', completed: false }],
          5: [{ id: 28, text: 'Встреча с клиентом', completed: false }],
          7: [{ id: 29, text: 'Завершить первую фазу проекта X', completed: false }],
          10: [
            { id: 30, text: 'Отчет по проекту Y', completed: false },
            { id: 31, text: 'Совещание по проекту Y', completed: false },
          ],
        },
        9: {
          30: [{ id: 26, text: 'Подготовка к выставке', completed: true }],
        },
      },
      2025: {
        3: {
          8: [{ id: 32, text: 'Международный женский день', completed: false }],
          15: [{ id: 33, text: 'Встреча с партнерами', completed: false }],
        },
        12: {
          25: [{ id: 34, text: 'Рождественская вечеринка', completed: false }],
          31: [
            { id: 35, text: 'Подготовка к Новому Году', completed: false },
            { id: 36, text: 'Финальный отчет за год', completed: false },
          ],
        },
      },
    },
  };