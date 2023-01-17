import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/loginPage/LoginPage";
import { MainPage } from "../pages/mainPage/MainPage";
import { HomePage } from "../pages/homePage/HomePage";
import { NotePage } from "../pages/notePage/NotePage";
import { TripPage } from "../pages/tripPage/TripPage";
import { Layout } from "../components/Layout/Layout";

export const RoutingBlock = () => {
  return (
    <div>
      <Routes>
        <Route  path="/" element={<MainPage />} />
        <Route  path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/home/trippage" element={<TripPage />} />
          <Route path="/home/notepage" element={<NotePage />} />
        </Route>
      </Routes>
    </div>
  );
};
