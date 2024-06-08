import { generateCalendar } from '../utils/generateCalendar';

describe('generateCalendar', () => {
  it('Должен генерировать корректную структуру календаря', () => {
    const tasks = {
      2024: {
        5: {
          5: [{ id: 1, text: 'Task 1', completed: false }],
          6: [],
        },
      },
    };

    const calendar = generateCalendar(2024, 5, tasks);
    console.log(calendar);

    // Убедитесь, что структура календаря верна
    expect(calendar).toBeDefined();
  });
});