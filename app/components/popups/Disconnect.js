import Link from "next/link";
import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { logout } from "@/redux/authSlice/authSlice";

export default function Disconnect({ show, onHide }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div
      className={
        show
          ? "hidden"
          : "transition fixed w-screen h-screen top-0 left-0 z-50 flex flex-col justify-center items-center bg-red"
      }
    >
      <div
        onClick={() => onHide(true)}
        className="fixed bg-[rgba(0,0,0,0.4)] w-screen h-screen top-0 left-0 z-50"
      ></div>
      <div
        onClick={() => onHide(true)}
        className="text-left w-1/3 max-sm:w-5/6 max-lg:w-3/5 mb-4 z-50 cursor-pointer"
      >
        <span className="block w-fit rounded-lg bg-white z-50 p-2 ">
          <MdClose size={18} className="text-red-600 bg-white border-3xl" />
        </span>
      </div>
      <div className="bg-white rounded-lg w-1/3 max-lg:w-3/5 px-12 py-6 max-sm:w-5/6 max-md:px-4 max-sm:px-3 z-50">
        <div className=" flex justify-between items-center flex-col ">
          <p className="text-center max-lg:px-1 max-xl:px-8 xl:px-18 text-[#707070] my-16">
            Souhaitez-vous vraiment vous <br />
            déconnectez ?
          </p>
          <div className="flex gap-4 max-sm:gap-2 items-center">
            <span
              onClick={() => onHide(true)}
              className="text-xs text-center font-semibold text-white  bg-app-blue  rounded-3xl px-12 max-sm:px-10 py-2.5 cursor-pointer"
            >
              Annuler
            </span>
            <div>
              <span
                onClick={handleLogout}
                className="text-xs text-center font-semibold border-app-blue border-2 text-app-blue  rounded-3xl px-12 max-sm:px-10 py-2 hover:bg-app-filter-blue cursor-pointer"
              >
                Déconnexion
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
