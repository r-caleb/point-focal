"use client";
import {
  deleteMessage,
  getAllOnePersonMessages,
  getMessages,
} from "@/redux/messageSlice/messageActions";
import { sendMessage } from "@/redux/messageSlice/messageActions";
import { getUsersById } from "@/redux/userSlice/userActions";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaChevronCircleLeft, FaPaperclip } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

export default function Collaborer() {
  const [file, setFile] = useState([]);
  const [user, setUser] = useState("");
  const [text, setText] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const router = useRouter();
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { messageDelInfo, messageInfo, messageSent } = useSelector(
    (state) => state.message
  );
  const { userUpdate } = useSelector((state) => state.user);

  useEffect(() => {
    setUser(
      typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("focal-user")) &&
        JSON.parse(localStorage.getItem("focal-user"))
    );
    dispatch(getAllOnePersonMessages({ id }));
    dispatch(getUsersById({ id }));
    dispatch(getMessages());
  }, [dispatch, messageSent?.message, messageDelInfo]);

  const handleChange = (e) => setText(e.target.value);

  const handleClick = async () => {
    const formData = new FormData();
    formData.append("receiverId", id);
    formData.append("senderId", user?.id);
    formData.append("text", text);
    if (file && file.length > 0) {
      file.forEach((f) => {
        formData.append("files", f);
      });
    }

    try {
      await dispatch(sendMessage(formData));
      setText("");
      setFile([]);
    } catch (error) {
      console.error("Erreur lors de l'envoi", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString("fr-FR", { weekday: "long" });
    const day = date.getDate();
    const monthName = date.toLocaleDateString("fr-FR", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${dayName}, ${day} ${monthName} ${year} ${hours}:${minutes}`;
  };

  const retour = () => {
    router.push("/dashboard/collaborer");
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageInfo?.messages]);

  const openDeleteModal = (message) => {
    setSelectedMessage(message);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <section className="bg-[#f9f9f9] dark:bg-[#1E293B]  text-[13px]">
      <div className="rounded-2xl max-md:px-0 gap-2">
        <div className="p-2 w-full min-h-[375px]">
          <div className="flex flex-col justify-between rounded-xl border-4 min-h-screen">
            {/* Header */}
            <div className="bg-app-dark-blue w-full rounded-t-xl p-1.5 flex items-center">
              <div className="p-1.5 flex items-center md:justify-between font-medium mx-1.5 w-full">
                <FaChevronCircleLeft
                  size={20}
                  color="#FFF"
                  onClick={retour}
                  className="cursor-pointer mr-2"
                />
                <div className="flex items-center">
                  {userUpdate?.user?.picture ? (
                    <Image
                      src={`${userUpdate?.user?.picture}`}
                      width={130}
                      height={130}
                      alt="Photo de profil"
                      className="group-hover:opacity-40 object-cover h-[25px] w-[25px] mr-1 rounded-full"
                    />
                  ) : (
                    <div className="rounded-full h-fit max-md:text-lg border border-[#E3E3F0] p-1.5 hover:border-app-blue flex items-center font-medium mx-1.5">
                      <FiUser size={15} className="text-white" />
                    </div>
                  )}
                  <p className="font-medium text-white text-sm">
                    {userUpdate?.user?.firstname} {userUpdate?.user?.lastname}{" "}
                    {userUpdate?.user?.middlename},{" "}
                    {userUpdate?.user?.ministry?.smallName}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="overflow-y-scroll min-h-[395px] flex flex-col items-center px-4 text-black dark:text-[#cccccc]"
            >
              {messageInfo?.messages?.map((message) => (
                <div
                  key={message._id}
                  className={
                    user.id == message.receiver
                      ? "flex items-center gap-2 text-[13px] w-full"
                      : "flex justify-end items-center gap-2 text-[13px] w-full"
                  }
                >
                  <div className="flex flex-col items-start my-1 min-w-[200px] text-[13px] gap-1 p-1.5 rounded-lg shadow-xl bg-white dark:bg-[#27364a]">
                    <p>{message.text}</p>
                    {message.files && message.files.length > 0 && (
                      <div className="flex flex-col gap-1 mt-1">
                        {message.files.map((url, index) => {
                          const extension = url.split(".").pop().toLowerCase();
                          const filename = url.split("/").pop(); // pour nommer le fichier

                          const isImage = [
                            "jpg",
                            "jpeg",
                            "png",
                            "gif",
                            "webp",
                          ].includes(extension);
                          const isPDF = extension === "pdf";

                          return (
                            <div key={index}>
                              {isImage ? (
                                <a
                                  href={url}
                                  download={filename}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block"
                                >
                                  <Image
                                    src={url}
                                    alt={`Image jointe ${index + 1}`}
                                    width={200}
                                    height={200}
                                    className="rounded cursor-pointer hover:opacity-80"
                                  />
                                  <p className="text-xs text-blue-600 underline mt-1">
                                    📥 Télécharger l’image
                                  </p>
                                </a>
                              ) : isPDF ? (
                                <a
                                  href={url}
                                  download={filename}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 underline text-xs"
                                >
                                  📄 Télécharger le PDF
                                </a>
                              ) : (
                                <a
                                  href={url}
                                  download={filename}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 underline text-xs"
                                >
                                  📎 Télécharger le fichier
                                </a>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <p className="text-[#707070] dark:text-[#cccccc] text-[10px] self-end">
                      {formatDate(message.createdAt)}
                    </p>
                  </div>
                  {user.id !== message.receiver && (
                    <div className="message-menu">
                      <button onClick={() => openDeleteModal(message)}>
                        <BsThreeDotsVertical />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {isDeleteModalOpen && selectedMessage && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-md p-6">
                    <h2 className="font-bold mb-4 text-sm text-center">
                      Confirmer la suppression
                    </h2>
                    <p className="mb-4 text-sm">
                      Êtes-vous sûr de vouloir supprimer ce message :{" "}
                      <span className="font-semibold">
                        "{selectedMessage?.text}"
                      </span>{" "}
                      ?
                    </p>
                    <div className="flex justify-end gap-2 text-sm">
                      <button
                        onClick={closeModals}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={() => {
                          dispatch(
                            deleteMessage({ messageId: selectedMessage?._id })
                          );
                          closeModals();
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Confirmer
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Zone de message */}
            <div className="bg-app-dark-blue w-full rounded-b-xl p-1.5 flex flex-col">
              <div className="container px-4 mx-auto w-full">
                <textarea
                  rows="4"
                  className="w-full dark:bg-[#1E293B] rounded-lg p-1 focus:outline-none text-base"
                  value={text}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="flex items-center ">
                <div className="py-4 ml-4">
                  <span
                    className="text-[13px] font-semibold border-2 border-white text-app-dark-blue hover:bg-app-filter-blue hover:text-white bg-white rounded-md px-8 py-2 cursor-pointer"
                    onClick={handleClick}
                  >
                    Envoyer
                  </span>
                </div>
                <div className="flex items-center gap-2 py-2 text-white mx-4">
                  <label className="cursor-pointer flex items-center gap-1">
                    <FaPaperclip size={18} />
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => setFile(Array.from(e.target.files))}
                      className="hidden"
                      multiple
                    />
                  </label>

                  {file && file.length > 0 && (
                    <div className="text-xs text-white flex gap-0.5 max-w-[250px]">
                      {file.map((f, i) => (
                        <div
                          key={i}
                          className="truncate overflow-hidden whitespace-nowrap text-ellipsis"
                          title={f.name}
                        >
                          📎 {f.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
