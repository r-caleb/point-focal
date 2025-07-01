"use client";
import React from "react";
import { MdOutlineDone, MdClose } from "react-icons/md";
const ModificationRefresh = ({ show, onHide }) => {
  return (
    <div
      className={
        show
          ? "hidden"
          : "transition fixed w-screen h-screen top-0 left-0 z-50 flex flex-col justify-center items-center bg-red"
      }
    >
      <div
        onClick={() => {
          onHide(true);
          window.location.reload();
        }}
        className="fixed bg-[rgba(0,0,0,0.4)] w-screen h-screen top-0 left-0 z-50"
      ></div>
      <div
        onClick={() => {
          onHide(true);
          window.location.reload();
        }}
        className="text-left w-1/4 max-sm:w-5/6 max-lg:w-3/5 mb-4 z-50 cursor-pointer"
      >
        <span className="block w-fit rounded-lg bg-white z-50 p-2 ">
          <MdClose size={18} className="text-red-600 bg-white border-3xl" />
        </span>
      </div>
      <div className="bg-white rounded-lg w-1/4 max-lg:w-3/5 p-8 max-sm:w-4/5 max-md:px-4 max-sm:px-3 z-50">
        <div className="py-3 flex justify-between items-center flex-col ">
          <div className="h-fit w-fit p-6 bg-app-blue shadow-[0_0_4px_5px] shadow-app-filter-blue rounded-full">
            <MdOutlineDone size={30} color="white" />
          </div>
          <p className="text-center max-lg:px-1 max-xl:px-8 xl:px-18 text-[#707070] my-8">
            Modification réussie !
          </p>
        </div>
      </div>
    </div>
  );
};
export default ModificationRefresh;
