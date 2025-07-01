"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image.js";
import { FaBars, FaUserAlt } from "react-icons/fa";
import { BiBell, BiLogOut, BiSolidNetworkChart } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import Link from "next/link";
import { BsFillBellFill } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import Disconnect from "./Disconnect";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "@/redux/authSlice/authActions";
import { logout } from "@/redux/authSlice/authSlice";

const DashBoardHeader = ({ handleToggleSidebar }) => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [logoutHide, setLogoutHide] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState();

  const pathname = usePathname();

  const dispatch = useDispatch();
  const { success, userInfo, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const localUser =
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("focal-user"));

    setUser(localUser);
    dispatch(getMe());

    if (!localUser) {
      router.push("/");
    }
  }, [dispatch]);

  useEffect(() => {
    if (
      error === "Non autorisé, token invalide" ||
      error === "Non autorisé, aucun token"
    ) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("focal-user");
      }
      router.push("/");
      return;
    }
  }, [error, router]);
  useEffect(() => {
    if (!userInfo?.user?.role) return;

    if (pathname === "/dashboard") {
      if (userInfo?.user?.role !== "admin") {
        router.push("/dashboard/web-apps");
      }
    }
  }, [router, pathname, userInfo]);

  return (
    <>
      <div className="sticky z-[50] top-0 bg-white flex w-full items-center px-6 max-sm:px-1 py-2.5 ">
        <FaBars
          className="hidden max-md:block max-md:mx-2.5 cursor-pointer text-[#b8b8b8]"
          size={26}
          onClick={() => handleToggleSidebar()}
        />
        <div className="flex-1 items-center">
          <Link href="/dashboard" className="flex items-center">
            <BiSolidNetworkChart size={30} className="text-app-dark-blue" />{" "}
            <span className="text-app-dark-blue font-semibold text-xl">
              Point Focal
            </span>
          </Link>
        </div>
        <div className="flex">
          <div
            className="rounded-full h-fit text-2xl max-md:text-lg border border-[#E3E3F0]  p-1.5 hover:border hover:border-app-blue flex items-center  font-medium mx-1.5"
            onClick={() => {
              if (showNotificationModal) setShowNotificationModal(false);
              else setShowNotificationModal(true);
            }}
          >
            <BiBell className="text-[#b8b8b8]" size={15} />
          </div>
          <div
            className="rounded-full h-fit text-2xl max-md:text-lg border border-[#E3E3F0] p-1.5 hover:border hover:border-app-blue flex items-center font-medium mx-1.5"
            onClick={() => {
              if (showAccountModal) setShowAccountModal(false);
              else setShowAccountModal(true);
            }}
          >
            <FiUser className="text-[#b8b8b8]" size={15} />
          </div>
        </div>
        {!showNotificationModal ? (
          ""
        ) : (
          <>
            <div
              onClick={() => {
                if (showNotificationModal) setShowNotificationModal(false);
                else setShowNotificationModal(true);
              }}
              className="absolute w-screen h-screen top-0 left-0 bg-transparent"
            ></div>
            <div className="absolute bg-white border-2 top-[43px] right-[60px] w-[260px] rounded-xl text-xs p-4 ">
              <div className="font-semibold text-md text-center mb-2">
                Notifications
              </div>
              <hr />
              <div>
                <div className="flex items-start py-2">
                  <span className="p-2 border mr-2 rounded-full w-fit">
                    <BsFillBellFill color="#3a72b8" size={15} className="" />
                  </span>
                  <div className="">
                    <p>Woohoo, you&apos;re reading this text in a modal!</p>
                    <div className="flex items-center my-1.5 justify-between text-xs">
                      <p className="text-[10px]">Le 1er septembre 2022 à 10h</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />{" "}
              <div>
                <div className="flex items-start py-2">
                  <span className="p-2 border mr-2 rounded-full w-fit">
                    <BsFillBellFill color="#3a72b8" size={15} className="" />
                  </span>
                  <div className="">
                    <p>Woohoo, you&apos;re reading this text in a modal!</p>
                    <div className="flex items-center my-1.5 justify-between text-xs">
                      <p className="text-[10px]">Le 1er septembre 2022 à 10h</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />{" "}
              <div>
                <div className="flex items-start py-2">
                  <span className="p-2 border mr-2 rounded-full w-fit">
                    <BsFillBellFill color="#3a72b8" size={15} className="" />
                  </span>
                  <div className="">
                    <p>Woohoo, you&apos;re reading this text in a modal!</p>
                    <div className="flex items-center my-1.5 justify-between text-xs">
                      <p className="text-[10px]">Le 1er septembre 2022 à 10h</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <Link href="/dashboard/collaborer">
                <button className="w-full rounded-md font-medium py-1 m-auto border bg-app-blue mt-2 text-white">
                  Voir plus
                </button>
              </Link>
            </div>
          </>
        )}
        {!showAccountModal ? (
          ""
        ) : (
          <>
            <div
              onClick={() => {
                if (showAccountModal) setShowAccountModal(false);
                else setShowAccountModal(true);
              }}
              className="absolute w-screen h-screen top-0 left-0 bg-transparent"
            ></div>
            <div className="absolute bg-white border-2 top-[43px] right-[20px] rounded-xl p-6 ">
              <div className="flex items-center justify-start w-full mb-2">
                {user?.picture ? (
                  <Image
                    src={`${user?.picture}`}
                    width={130} // Largeur souhaitée
                    height={130} // Hauteur souhaitée
                    alt="Photo de profil"
                    className="group-hover:opacity-40 object-cover h-[25px] w-[25px] mr-2 rounded-full"
                  />
                ) : (
                  <div className="rounded-full h-fit max-md:text-lg border border-[#E3E3F0] p-1.5  hover:border-app-blue flex items-center font-medium mx-1.5">
                    <FiUser size={15} className="text-[#565661]" />
                  </div>
                )}

                <p className="text-[15px] font-semibold text-app-dark">
                  {user ? user?.firstname : "---"}
                  <span> {user?.lastname} </span>
                </p>
              </div>
              <hr />
              <div className="my-1">
                <Link
                  href="/profile"
                  className="flex items-center cursor-pointer"
                >
                  <span className="p-2  mr-2  w-fit">
                    <FiUser color="#565661" size={15} className="" />
                  </span>
                  <p className="text-[14px] text-app-dark font-semibold cursor-pointer hover:underline">
                    Profil
                  </p>
                </Link>
              </div>
              <hr />
              <div className="mt-1">
                <div
                  onClick={() => setLogoutHide(false)}
                  className="flex items-center cursor-pointer"
                >
                  <span className="p-2  mr-2  w-fit">
                    <BiLogOut
                      color="#3a72b8"
                      size={15}
                      className="rotate-180"
                    />
                  </span>
                  <p className="text-[14px] text-app-dark-blue font-semibold hover:underline">
                    Se déconnecter
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        <Disconnect show={logoutHide} onHide={setLogoutHide} />
      </div>
      <hr className="w-full fixed" />
    </>
  );
};

export default DashBoardHeader;
