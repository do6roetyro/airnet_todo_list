import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";

import "./assets/styles/index.scss";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"))
const RegisterPage = lazy(() => import("./pages/RegisterPage"))
const CalendarPage = lazy(() => import("./pages/CalendarPage"))

const App: React.FC = () => {
  const location = useLocation();

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
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </>
  );
};

export default App;
