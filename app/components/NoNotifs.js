"use client";
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const NoNotifs = () => {
  return (
    <div className="h-[300px] flex flex-col justify-center items-center gap-10">
      <div className="bg-app-bg-gray p-12 rounded-full  flex justify-center items-center ">
        <FaExclamationTriangle size={50} color="white" />
      </div>
      <p className="w-[250px] font-medium text-app-bg-gray text-center text-sm ">
        Aucune notification
      </p>
    </div>
  );
};
export default NoNotifs;
