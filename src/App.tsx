import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useUser } from "./contexts/UserContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const CalendarPage = lazy(() => import("./pages/CalendarPage"));
const WeekTasksPage = lazy(() => import("./pages/WeekTaskPage")); // Новый импорт

const App: React.FC = () => {
  const location = useLocation();
  const { user } = useUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <div className="page__wrapper wrapper">
        <main className="main-container">
          <h1 className="visually-hidden">ToDoList - планировщик дел.</h1>
          <Suspense fallback={<div className="suspense-load"></div>}>
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/calendar" /> : <HomePage />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/calendar"
                element={user ? <CalendarPage /> : <Navigate to="/" />}
              />
              <Route
                path="/week-tasks"
                element={user ? <WeekTasksPage /> : <Navigate to="/" />}
              />
            </Routes>
          </Suspense>
        </main>
      </div>
      <Footer
        url="https://github.com/do6roetyro"
        link_name="GitHub"
        copyright="© ToDoList"
      />
    </>
  );
};

export default App;