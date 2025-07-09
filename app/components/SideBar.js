"use client";
import React, { useEffect, useState } from "react";
import {
  MdApps,
  MdCircleNotifications,
  MdDashboard,
  MdOutlineHistory,
  MdOutlineSms,
  MdWeb,
} from "react-icons/md";
import { useParams, usePathname } from "next/navigation";
import { FiUser, FiUsers } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { BiSolidNetworkChart } from "react-icons/bi";
import { FaRegBuilding } from "react-icons/fa";

export default function SideBar({ sidebar, handleToggleSidebar }) {
  const pathname = usePathname();
  const [value, setValue] = useState("fr");
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(
      typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("focal-user"))
    );
  }, []);

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
        className={`border-r text-app-dark-green overflow-hidden w-[12.5rem] max-md:w-[18rem] bg-white dark:bg-[#1E293B] dark:text-[#cccccc]  fixed max-md:top-0  h-screen z-[45]
                    ${
                      sidebar
                        ? "max-md:flex-col transition ease-in duration-300"
                        : "max-md:hidden"
                    }`}
      >
        <div className="flex-1 hidden max-md:inline items-center">
          <div className="flex justify-between items-center">
            <BiSolidNetworkChart />

            <AiOutlineCloseSquare
              className="cursor-pointer"
              size={30}
              onClick={() => handleToggleSidebar(false)}
            />
          </div>
        </div>

        <hr />

        {!user ? (
          <div className="flex flex-col items-center justify-start w-full gap-4 my-4 px-2 text-center animate-pulse">
            {/* Avatar */}
            <div className="rounded-full border border-[#E3E3F0] p-1.5">
              <div className="h-[52px] w-[52px] bg-gray-300 rounded-full"></div>
            </div>

            {/* Nom */}
            <div className="h-4 w-32 bg-gray-300 rounded"></div>

            {/* Rôle */}
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-start w-full gap-4 my-4 px-2 text-center">
            <div className="rounded-full h-fit text-2xl max-md:text-lg border border-[#E3E3F0] p-1.5  hover:border-app-blue flex items-center font-medium mx-1.5">
              {user?.picture ? (
                <Image
                  src={`${user?.picture}`}
                  width={130} // Largeur souhaitée
                  height={130} // Hauteur souhaitée
                  alt="Photo de profil"
                  className="group-hover:opacity-40 object-cover h-[52px] w-[52px] rounded-full"
                />
              ) : (
                <FiUser size={35} className="text-[#b8b8b8]" />
              )}
            </div>
            <p className="text-[15px] font-medium text-app-dark dark:text-[#cccccc]">
              {user ? user?.firstname : "---"}
              <span> {user?.lastname} </span>
              <span> {user?.middlename} </span>
            </p>
            <p className="text-[14px] text-app-dark dark:text-[#cccccc] border border-[#E3E3F0] px-7 py-1 rounded-sm">
              {user?.role == "admin"
                ? "Administrateur"
                : user?.role == "cabinet"
                ? "Cabinet"
                : "SG"}
            </p>
          </div>
        )}
        <ul className="text-app-dark  font-medium flex flex-col">
          {user?.role == "admin" && (
            <li
              className={
                pathname === "/dashboard"
                  ? "active flex py-2 px-4"
                  : "flex py-2 px-4 hover:bg-[#F2F2F2]"
              }
              onClick={() => handleToggleSidebar(false)}
            >
              <Link href="/dashboard" className="flex items-center">
                <MdDashboard
                  size={18}
                  className={
                    pathname === "/dashboard"
                      ? "text-white mx-1 "
                      : "text-[#a3a3a3] dark:text-[#cccccc] mx-1"
                  }
                />
                <span className="text-[15px] dark:text-[#cccccc]">
                  Dashboard
                </span>
              </Link>
            </li>
          )}
          {user?.role == "admin" && (
            <li
              className={
                pathname === "/dashboard/ministere"
                  ? "active flex py-2 px-4"
                  : "flex py-2 px-4 hover:bg-[#F2F2F2]"
              }
              onClick={() => handleToggleSidebar(false)}
            >
              <Link href="/dashboard/ministere" className="flex items-center">
                <FaRegBuilding
                  size={17}
                  className={
                    pathname === "/dashboard/ministere"
                      ? "text-white mx-1 "
                      : "text-[#a3a3a3] dark:text-[#cccccc] mx-1"
                  }
                />
                <span className="text-[15px] dark:text-[#cccccc]">
                  Ministères
                </span>
              </Link>
            </li>
          )}{" "}
          <li
            className={
              pathname === "/dashboard/web-apps" ||
              pathname === `/dashboard/web-apps/${id}`
                ? "active flex py-2 px-4"
                : "flex py-2 px-4 hover:bg-[#F2F2F2]"
            }
            onClick={() => handleToggleSidebar(false)}
          >
            <Link href="/dashboard/web-apps" className="flex items-center">
              <MdApps
                size={18}
                className={
                  pathname === "/dashboard/web-apps" ||
                  pathname === `/dashboard/web-apps/${id}`
                    ? "text-white mx-1 "
                    : "text-[#a3a3a3] dark:text-[#cccccc] mx-1"
                }
              />
              <span className="text-[15px] dark:text-[#cccccc]">
                Applications
              </span>
            </Link>
          </li>
          <li
            className={
              pathname === "/dashboard/collaborer" ||
              pathname === `/dashboard/collaborer/${id}`
                ? "active flex py-2 px-4"
                : "flex py-2 px-4 hover:bg-[#F2F2F2]"
            }
            onClick={() => handleToggleSidebar(false)}
          >
            <Link href="/dashboard/collaborer" className="flex items-center">
              <MdOutlineSms
                size={18}
                className={
                  pathname === "/dashboard/collaborer" ||
                  pathname === `/dashboard/collaborer/${id}`
                    ? "text-white mx-1 "
                    : "text-[#a3a3a3] dark:text-[#cccccc] mx-1"
                }
              />
              <span className="text-[15px] dark:text-[#cccccc]">
                Collaborer
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
