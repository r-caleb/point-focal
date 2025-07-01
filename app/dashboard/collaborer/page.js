"use client";
import { getMessages } from "@/redux/messageSlice/messageActions";
import Image from "next/image";
import { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineSms } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { getMe } from "@/redux/authSlice/authActions";
import { getAdmin } from "@/redux/userSlice/userActions";

export default function Collaborer() {
  const dispatch = useDispatch();

  const { allMessages, messageInfo } = useSelector((state) => state.message);
  const { userInfo } = useSelector((state) => state.auth);
  const { admin } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMessages());
    dispatch(getMe());
    dispatch(getAdmin());
  }, [messageInfo, dispatch]);

  console.log("admin", admin);

  return (
    <section className=" bg-[#f9f9f9] text-[13px]">
      <div className="p-2 rounded-2xl max-md:px-2 gap-2 flex items-center justify-between">
        <div className="flex flex-col bg-white rounded-2xl w-full min-h-[475px]">
          <div className=" border-b w-full  bg-white z-10">
            <div className="mx-auto w-[70%] flex items-center gap-10 pt-4  font-semibold text-[#707070]">
              <span className="text-app-green border-b-2 pb-3 px-2 border-app-green">
                Discussions
              </span>
            </div>
          </div>
          <div className="mx-auto w-[90%] px-4 max-md:px-2 max-md:w-full">
            {userInfo?.user?.role == "admin" ? (
              allMessages?.messages?.map((message, index) => (
                <div
                  key={index}
                  className="flex items-center md:justify-between border-b hover:bg-app-filter-blue px-8 max-md:px-1"
                >
                  <Link
                    className="flex flex-col items-center px-2 w-3/4 max-md:w-full"
                    href={`collaborer/${message.sender._id}`}
                    key={message.sender._id}
                  >
                    <div className="flex justify-between items-center w-full ">
                      <div className="flex items-center justify-between gap-2 text-[13px] w-full">
                        {message.sender.picture ? (
                          <Image
                            src={`${message.sender.picture}`}
                            width={130} // Largeur souhaitée
                            height={130} // Hauteur souhaitée
                            alt="Photo de profil"
                            className="group-hover:opacity-40 object-cover h-[38px] w-[38px] rounded-full"
                          />
                        ) : (
                          <p className="p-2 border mr-2 bg-app-filter-blue rounded-full w-fit">
                            <MdOutlineSms size={25} />
                          </p>
                        )}
                        <div className="flex flex-col items-start my-5 text-[13px] gap-1 w-full">
                          <p className="font-medium">
                            {message.sender.firstname} {message.sender.lastname}
                            ,<span> {message.sender.ministry.name}</span>
                          </p>
                          <p>{message.messages[0].text}</p>
                          <p className="text-[#707070] text-[10px]">
                            {new Date(
                              message.messages[0].createdAt
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <AiFillDelete color="#3a72b8" size={20} />
                </div>
              ))
            ) : (
              <div className="flex items-center justify-between border-b hover:bg-app-filter-blue px-8 py-2">
                <Link
                  className="flex flex-col items-center  px-2 w-3/4"
                  href={`collaborer/${admin?._id}`}
                  title="Cliquez pour envoyer un message aux administrateurs"
                >
                  <div className="flex justify-between items-center w-full ">
                    <div className="flex items-center justify-between gap-12 text-[13px] w-full">
                      <Image
                        src={`/images/logo_pt.png`}
                        width={130} // Largeur souhaitée
                        height={130} // Hauteur souhaitée
                        alt="Logo"
                        className="group-hover:opacity-40 object-cover h-[78px] w-full rounded-full"
                      />
                      <div className="flex flex-col items-start my-5 text-[13px] gap-1 w-full">
                        <p className="font-medium">
                          Ecrire aux Administrateurs
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
