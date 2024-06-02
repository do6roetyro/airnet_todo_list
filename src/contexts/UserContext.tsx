import React, { createContext, useState, useEffect, ReactNode } from "react";
import { fetchUserData } from "../services/dataService";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  task: UserTasks;
}

interface UserTasks {
  [year: number]: {
    [month: number]: {
      [day: number]: Task[];
    };
  };
}

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface UserContextType {
  users: User[];
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData();
        setUsers(data);
      } catch (error) {
        console.error("Ошибка загрузки данных пользователя", error);
      }
    };

    loadUserData();
  }, []);

  return (
    <UserContext.Provider value={{ users, currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};


// Используйте контекст в компонентах:
// // src/components/UserTasks.tsx
// import React, { useContext, useState } from 'react';
// import { UserContext } from '../contexts/UserContext';

// const UserTasks: React.FC = () => {
//   const userContext = useContext(UserContext);

//   if (!userContext) {
//     return null;
//   }

//   const { currentUser, setCurrentUser } = userContext;

//   if (!currentUser) {
//     return <div>Select a user to view tasks</div>;
//   }

//   return (
//     <div>
//       <h2>{currentUser.firstName} {currentUser.lastName}'s Tasks</h2>
//       {Object.keys(currentUser.tasks).map(year => (
//         <div key={year}>
//           <h3>{year}</h3>
//           {Object.keys(currentUser.tasks[year]).map(month => (
//             <div key={month}>
//               <h4>{month}</h4>
//               {Object.keys(currentUser.tasks[year][month]).map(day => (
//                 <div key={day}>
//                   <h5>{day}</h5>
//                   <ul>
//                     {currentUser.tasks[year][month][day].map(task => (
//                       <li key={task.id}>
//                         <span
//                           style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
//                         >
//                           {task.text}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserTasks;

// Настройте использование контекста в приложении:
// // src/App.tsx
// import React from 'react';
// import { UserProvider } from './contexts/UserContext';
// import UserTasks from './components/UserTasks';

// const App: React.FC = () => {
//   return (
//     <UserProvider>
//       <div className="app">
//         <UserTasks />
//       </div>
//     </UserProvider>
//   );
// };

// export default App;