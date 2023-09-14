import React from "react";
import Logo from "./Logo";
import AppNavbar from "./AppNavbar";
import style from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={style.sidebar}>
      <Logo />
      <AppNavbar />
      <Outlet />
      <footer className={style.footer}>
        <p className={style.copyright}>
          &copy; Copyright {new Date().getFullYear()} by world-wide inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
