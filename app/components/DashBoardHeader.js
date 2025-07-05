"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image.js";
import { FaBars } from "react-icons/fa";
import { BiBell, BiLogOut, BiSolidNetworkChart } from "react-icons/bi";
import Link from "next/link";
import { BsFillBellFill } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import Disconnect from "./popups/Disconnect";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "@/redux/authSlice/authActions";
import { getUserNotifications } from "@/redux/notifSlice/notifActions";
import { MdDelete } from "react-icons/md";

const DashBoardHeader = ({ handleToggleSidebar }) => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [logoutHide, setLogoutHide] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState();

  const pathname = usePathname();

  const dispatch = useDispatch();
  const { success, userInfo, error } = useSelector((state) => state.auth);
  const { allNotifs } = useSelector((state) => state.notif);

  useEffect(() => {
    const localUser =
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("focal-user"));

    setUser(localUser);
    dispatch(getMe());

    if (!localUser) {
      router.push("/");
    }
    const userId = userInfo?.user?._id?.toString();
    if (userId) {
      dispatch(getUserNotifications(userId));
    }
  }, [dispatch, userInfo?.user?._id]);

  console.log("notif", allNotifs);

  useEffect(() => {
    if (
      error === "Non autorisé, token invalide" ||
      error === "Non autorisé, aucun token"
    ) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("focal-user");
      }
      router.push("/");
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
              onClick={() => setShowNotificationModal(!showNotificationModal)}
              className="absolute w-screen h-screen top-0 left-0 bg-transparent"
            ></div>

            <div className="absolute flex flex-col justify-between bg-white border-2 top-[43px] right-[60px] h-[500px] max-sm:right-[10px] w-[370px] rounded-xl p-4 shadow-lg">
              <div className="font-semibold text-md text-center mb-2">
                Notifications
              </div>
              <hr />

              <div className="flex-1 overflow-y-auto my-2 pr-1">
                {allNotifs?.map((notif) => {
                  const msg = notif.message;
                  const sender = msg?.sender;
                  const hasText = msg?.text?.trim();
                  const hasFiles = msg?.files?.length > 0;
                  const displayText = hasText
                    ? msg.text
                    : hasFiles
                    ? "[vide] : [un fichier]"
                    : "[vide]";
                  const date = new Date(msg?.createdAt).toLocaleString(
                    "fr-FR",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  );

                  return (
                    <div key={notif._id}>
                      <div className="flex items-start py-2 px-1">
                        {/* Icône cloche (non cliquable) */}
                        <span className="p-2 border mr-2 rounded-full w-fit">
                          <BsFillBellFill color="#3a72b8" size={15} />
                        </span>

                        {/* Zone cliquable pour rediriger */}
                        <Link
                          onClick={() =>
                            setShowNotificationModal(!showNotificationModal)
                          }
                          href={`/dashboard/collaborer/${sender?._id}`}
                          className="text-[14px] flex-1 hover:bg-slate-200 p-1 cursor-pointer"
                        >
                          <p>
                            <strong>{sender?.firstname || "Inconnu"} :</strong>{" "}
                            {displayText}
                          </p>
                          <div className="flex items-center my-1 justify-between text-xs">
                            <p className="text-[10px]">{date}</p>
                          </div>
                        </Link>

                        {/* Icône suppression (non cliquable) */}
                        <span
                          className="p-2 border rounded-full w-fit cursor-pointer"
                          onClick={() => {
                            // logique suppression ici
                          }}
                        >
                          <MdDelete color="#3a72b8" size={16} />
                        </span>
                      </div>
                      <hr />
                    </div>
                  );
                })}
              </div>

              {/* Bouton fixe */}
              <button className="w-full rounded-md text-sm font-medium py-1 border bg-app-blue text-white">
                Tout Supprimer
              </button>
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
