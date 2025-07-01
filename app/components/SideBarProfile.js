"use client";
import React, { useState } from "react";
import {
  MdDashboard,
  MdOutlineNavigateNext,
  MdOutlineHistory,
  MdClose,
} from "react-icons/md";
import { usePathname } from "next/navigation";
import { FaRegUser, FaHandHoldingUsd, FaQuestionCircle } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { FcMoneyTransfer } from "react-icons/fc";
import { BiSolidNetworkChart } from "react-icons/bi";

export default function SideBarProfile({ sidebar, handleToggleSidebar }) {
  const pathname = usePathname();
  const [value, setValue] = useState("fr");

  return (
    <>
      <div
        onClick={() => handleToggleSidebar(false)}
        className={`md:hidden bg-[rgba(0,0,0,0.5)]  fixed top-0 z-[45] w-screen h-screen overlfow-hidden  ${
          sidebar
            ? "max-md:flex transition ease-in duration-300"
            : "max-md:hidden"
        }`}
      ></div>
      <nav
        className={`md:hidden border-r text-app-dark-green overflow-hidden w-[14rem] max-md:w-[20rem]  bg-white  fixed max-md:top-0  h-screen z-[45]
                    ${
                      sidebar
                        ? "max-md:flex-col transition ease-in duration-300"
                        : "max-md:hidden"
                    }`}
      >
        <div className="flex-1 hidden max-md:inline items-center">
          <div className="flex justify-between items-center">
            <div className="flex-1 items-center">
              <Link href="/dashboard" className="flex items-center">
                <BiSolidNetworkChart size={30} className="text-app-dark-blue" />{" "}
                <span className="text-app-dark-blue font-semibold text-xl">
                  Point Focal
                </span>
              </Link>
            </div>

            <AiOutlineCloseSquare
              className="cursor-pointer"
              size={30}
              onClick={() => handleToggleSidebar(false)}
            />
          </div>
        </div>

        <hr />
        <ul className=" font-[500] ">
          <li className="mt-8 " onClick={() => handleToggleSidebar(false)}>
            <Link href="/dashboard">
              <div
                className={
                  pathname === "/dashboard"
                    ? "active flex p-2"
                    : "flex p-2 hover:bg-[#F2F2F2]"
                }
              >
                <MdDashboard
                  size={20}
                  className={
                    pathname === "/dashboard"
                      ? "text-app-green mx-2"
                      : "text-[#a3a3a3] mx-2"
                  }
                />
                <span className="text-[14px]">Dashboard</span>
              </div>
            </Link>
          </li>
          <li
            className="mt-1 md:hidden"
            onClick={() => handleToggleSidebar(false)}
          >
            <Link href="/send-money">
              <div className={"flex p-2 hover:bg-[#F2F2F2]"}>
                <FcMoneyTransfer size={20} className={"text-[#a3a3a3] mx-2"} />
                <span className="text-[14px]">Envoyer l'argent</span>
              </div>
            </Link>
          </li>
          <h4 className="px-4 mt-10 text-[10px] font-semibold">COMPTE</h4>
          <li className="my-2" onClick={() => handleToggleSidebar(false)}>
            <Link href="/dashboard/historical">
              <div
                className={
                  pathname === "/dashboard/historical"
                    ? "active flex p-2"
                    : "flex p-2 hover:bg-[#F2F2F2]"
                }
              >
                <MdOutlineHistory
                  size={20}
                  className={
                    pathname === "/dashboard/historical"
                      ? "text-app-green mx-2"
                      : "text-[#a3a3a3] mx-2"
                  }
                />
                <span className="text-[14px]">Historique</span>
              </div>
            </Link>
          </li>
          <li className="my-2" onClick={() => handleToggleSidebar(false)}>
            <Link href="/dashboard/beneficiary">
              <div
                className={
                  pathname === "/dashboard/beneficiary"
                    ? "active flex p-2"
                    : "flex p-2 hover:bg-[#F2F2F2]"
                }
              >
                <FaRegUser
                  size={20}
                  className={
                    pathname === "/dashboard/beneficiary"
                      ? "text-app-green mx-2"
                      : "text-[#a3a3a3] mx-2 "
                  }
                />
                <span className="text-[14px]">Bénéficiaires</span>
              </div>
            </Link>
          </li>
          <h4 className="px-4 mt-10 text-[10px] font-semibold">SERVICE</h4>
          <li className="my-2" onClick={() => handleToggleSidebar(false)}>
            <Link href="/dashboard/mode-reception">
              <div
                className={
                  pathname === "/dashboard/mode-reception"
                    ? "active flex p-2"
                    : "flex p-2 hover:bg-[#F2F2F2]"
                }
              >
                <FaHandHoldingUsd
                  size={20}
                  className={
                    pathname === "/dashboard/mode-reception"
                      ? "text-app-green mx-2"
                      : "text-[#a3a3a3] mx-2"
                  }
                />
                <span className="text-[14px]">Mode de réception</span>
              </div>
            </Link>
          </li>
          <li className="my-2" onClick={() => handleToggleSidebar(false)}>
            <Link href="/dashboard/sponsorship">
              <div
                className={
                  pathname === "/dashboard/sponsorship"
                    ? "active flex p-2"
                    : "flex p-2 hover:bg-[#F2F2F2]"
                }
              >
                <FiUsers
                  size={20}
                  className={
                    pathname === "/dashboard/sponsorship"
                      ? "text-app-green mx-2"
                      : "text-[#a3a3a3] mx-2"
                  }
                />
                <span className="text-[14px]">Parrainage</span>
              </div>
            </Link>
          </li>
          <h4 className="px-4 mt-10 text-[10px] font-semibold">
            CENTRE D'AIDE
          </h4>
          <li className="my-2" onClick={() => handleToggleSidebar(false)}>
            <Link href="/faq">
              <div
                className={
                  pathname === "/faq"
                    ? "active flex p-2"
                    : "flex p-2 hover:bg-[#F2F2F2]"
                }
              >
                <FaQuestionCircle
                  size={20}
                  className={
                    pathname === "/faq"
                      ? "text-app-green mx-2"
                      : "text-[#a3a3a3] mx-2"
                  }
                />
                <span className="text-[14px]">FAQ</span>
              </div>
            </Link>
          </li>
          <li className="my-2 md:hidden">
            <select
              value={value}
              className="bg-white w-32 border py-2 mx-4 p-4 border-[#b8b8b8] hover:border-[#00d16f] max-md:text-sm flex items-center  font-medium "
              onChange
            >
              <option value="fr">Français</option>
              <option value="en">Anglais</option>
            </select>
          </li>
        </ul>
      </nav>
    </>
  );
}
