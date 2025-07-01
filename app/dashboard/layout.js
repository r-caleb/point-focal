"use client";
import DashBoardHeader from "../components/DashBoardHeader";
import SideBar from "../components/SideBar";
import React, { useState } from "react";

export default function DashLayout({ children }) {
  const [sidebar, toggleSidebar] = useState(false);
  const handleToggleSidebar = () => toggleSidebar((value) => !value);
  return (
    <>
      <DashBoardHeader handleToggleSidebar={handleToggleSidebar} />
      <div className="bg-[#f9f9f9]">
        <SideBar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <div className="md:ml-[200px]">{children}</div>
      </div>
    </>
  );
}
