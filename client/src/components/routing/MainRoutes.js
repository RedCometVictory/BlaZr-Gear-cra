import React from "react";
import { Outlet } from "react-router-dom";

const MainRoutes = () => {
  return (
    <main className="container">
      <Outlet />
    </main>
  );
};
export default MainRoutes;