"use client";
import DashBoardHeader from "../components/DashBoardHeader";
import Image from "next/image.js";
import React, { useEffect, useState } from "react";
import { FiHome, FiUser, FiUsers } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { TbCameraPlus } from "react-icons/tb";
import SideBarProfile from "../components/SideBarProfile";
import { MdSecurity } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const options = ["Securite", "Gerer", "Dashboard"];
const optionSec = ["Securite", "Dashboard"];

export default function DashLayout({ children }) {
  const { success, error } = useSelector((state) => state.user);
  const { userInfo } = useSelector((state) => state.auth);

  const [activeElement, setActiveElement] = useState("");

  const [sidebar, toggleSidebar] = useState(false);
  const [picture, setPicture] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState();
  const [uploading, setUploading] = useState(false);

  const handleToggleSidebar = () => toggleSidebar((value) => !value);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const handleClick = (value) => {
    setActiveElement(value);
    if (value === "Dashboard") {
      if (user?.role == "admin") {
        router.push(`/dashboard`);
      } else {
        router.push(`/dashboard/web-apps`);
      }
    } else {
      router.push(`/profile/${value.replace(/\s/g, "-").toLowerCase()}`);
    }
  };
  // Gestion de la sélection du fichier
  const selectPicture = (e) => {
    const file = e.target.files[0];

    // Vérifiez le type de fichier pour s'assurer qu'il est bien une image
    if (file && file.type.startsWith("image/")) {
      setPicture(URL.createObjectURL(file));
      setSelectedFile(file);
    } else {
      console.log("Veuillez sélectionner un fichier d'image valide.");
    }
  };
  const handleUpdateImage = async () => {
    if (!picture) {
      console.log("Aucun fichier sélectionné.");
      return;
    }

    // Limiter la taille du fichier à 5 Mo (par exemple)
    if (picture.size > 5 * 1024 * 1024) {
      console.log("Le fichier est trop volumineux (maximum 5 Mo).");
      return;
    }

    const formData = new FormData();
    formData.append("picture", selectedFile);
    try {
      setUploading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DEV_API_URL}users/update-picture`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          body: formData, // Envoyer l'image dans le corps de la requête
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de l'image.");
      }

      const data = await response.json();
      console.log("Image uploadée avec succès !", data);
      const pictureUpdate = data?.user?.picture;
      const storageUpdate = { ...user, picture: pictureUpdate };
      localStorage.setItem("focal-user", JSON.stringify(storageUpdate));
    } catch (error) {
      console.error("Erreur :", error);
      console.log("Échec de l'upload.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    setUser(
      typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("focal-user")) &&
        JSON.parse(localStorage.getItem("focal-user"))
    );
    handleUpdateImage();
    return () => {
      if (picture) {
        URL.revokeObjectURL(picture);
      }
    };
  }, [dispatch, picture, userInfo]);

  return (
    <>
      <DashBoardHeader />
      <SideBarProfile
        sidebar={sidebar}
        handleToggleSidebar={handleToggleSidebar}
      />
      <div className="bg-[#f9f9f9] p-1 text-sm text-app-dark">
        <div className="flex w-full p-2 gap-2 max-md:flex-col">
          <div className="bg-white md:fixed p-4 flex flex-col rounded-md w-[350px]">
            <div className="flex items-center  my-2 w-full gap-4">
              <form className="flex flex-col items-center">
                <input
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                  id="logoPicture"
                  onChange={selectPicture}
                />
                <label
                  htmlFor="logoPicture"
                  className="group flex flex-col items-center justify-center h-[130px] w-[130px] rounded-full bg-[#e6e6e6] hover:bg-[#000000] hover:opacity-100 transition-[background-color] duration-500 ease-out "
                >
                  {picture ? (
                    <TbCameraPlus
                      className="hidden justify-self-center absolute cursor-pointer group-hover:block group-hover:stroke-white group-hover:opacity-100"
                      size={30}
                    />
                  ) : (
                    <TbCameraPlus
                      className="justify-self-center absolute cursor-pointer group-hover:block group-hover:text-white group-hover:opacity-100"
                      size={30}
                    />
                  )}
                  {(picture || user?.picture) && (
                    <Image
                      src={
                        picture
                          ? picture
                          : `${user?.picture}`
                      }
                      width={130} // Largeur souhaitée
                      height={130} // Hauteur souhaitée
                      alt="Photo de profil"
                      className="group-hover:opacity-40 object-cover h-[130px] w-[130px] rounded-full"
                    />
                  )}
                </label>
              </form>
              <div className="pr-2">
                <p className="text-md font-bold ">
                  {user ? user?.firstname : "---"}
                  <span> {user?.lastname} </span>
                  <span> {user?.middlename} </span>
                </p>
                <p className="text-sm  font-medium py-2">
                  {user?.role === "admin" ? " " : user?.fonction}
                  <span>
                    {user?.role == "admin"
                      ? "Administrateur"
                      : user?.role == "cabinet"
                      ? "- Cabinet"
                      : "- SG"}
                  </span>
                </p>
                <p className="text-[13px]  font-medium">
                  {user ? user?.ministry?.name : "---"}
                </p>
                <p className="text-[13px]  font-thin italic py-2">
                  {user?.domain ? user?.domain : "(Domaine non défini)"}
                </p>
              </div>
            </div>
            <hr />
            <div className="pb-8">
              <p className="text-[13px]  font-medium py-2">DETAILS</p>
              <div className="flex items-start gap-20 pb-2 max-md:flex-col max-md:gap-2">
                <div className="max-md:border-b max-md:w-full max-md:pb-2 max-md:flex">
                  <p className="text-app-dark text-[15px]">Prénom :</p>
                  <p className=" font-medium max-md:ml-2 ">
                    {user ? user?.firstname : "---"}
                  </p>
                </div>
                <div className="max-md:flex">
                  <p className="text-app-dark text-[15px]">Nom :</p>
                  <p className=" font-medium max-md:ml-2">
                    {" "}
                    {user ? user?.lastname : "---"}
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex items-start gap-20 py-2 max-md:flex-col max-md:gap-2 ">
                <div className="max-md:border-b max-md:w-full max-md:pb-2 max-md:flex">
                  <p className="text-app-dark text-[15px] ">Postnom :</p>
                  <p className=" font-medium max-md:ml-2 ">
                    {user ? user?.middlename : "---"}
                  </p>
                </div>
                <div className="max-md:flex">
                  <p className="text-app-dark text-[15px]">Genre :</p>
                  <p className=" font-medium max-md:ml-2">
                    {user ? user?.gender : "---"}
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex items-center py-2">
                <p className="text-app-dark text-[15px] pr-5">
                  Numéro de Téléphone :
                </p>
                <p className=" font-medium ml-2">
                  {user ? user?.phoneNumber : "---"}
                </p>
              </div>
              <hr />
              <div className="flex items-center py-2">
                <p className="text-app-dark text-[15px]">Email :</p>
                <p className=" font-medium ml-2">
                  {user ? user?.email : "---"}
                </p>
              </div>

              <hr />
              <div className="flex items-center py-2">
                <p className="text-app-dark text-[15px]">
                  Adresse (lieu de travail) :
                </p>
                <p className=" font-medium ml-2 ">
                  {" "}
                  {user ? user?.address : "---"}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:ml-[360px]">
            <div className="flex justify-start w-full py-2 rounded-3xl max-lg:overflow-x-scroll max-sm:p-0 max-md:scrollbar-hide max-lg:rounded-none ">
              <div
                className={`flex py-3 px-6 m-2 rounded-md max-sm:mx-3 border items-center whitespace-nowrap cursor-pointer text-sm ${
                  pathname === "/profile"
                    ? "bg-app-blue text-white border-app-blue font-bold max-md:text-whitemax-sm:text-white"
                    : " bg-white font-semibold  border-[#cccccc] hover:bg-app-filter-blue"
                }`}
                onClick={() => handleClick("")}
              >
                <div>
                  <FiUser
                    size={18}
                    color={pathname === "/profile" ? "#fff" : "#c5c5c5"}
                  />
                </div>
                <span className="ml-1">Compte</span>
              </div>
              {user?.role !== "secretariat"
                ? options.map((value, i) => {
                    return (
                      <div
                        className={`flex py-3 px-6 m-2 rounded-md max-sm:mx-3 border items-center whitespace-nowrap cursor-pointer text-sm ${
                          activeElement === value
                            ? "bg-app-blue text-white border-app-blue font-bold max-md:text-whitemax-sm:text-white"
                            : " bg-white font-semibold  border-[#cccccc] hover:bg-app-filter-blue"
                        }`}
                        key={i}
                        onClick={() => handleClick(value)}
                      >
                        <div>
                          {(value === "Dashboard" && (
                            <FiHome
                              size={18}
                              color={
                                activeElement === value ? "#fff" : "#c5c5c5"
                              }
                            />
                          )) ||
                            (value === "Securite" && (
                              <MdSecurity
                                size={18}
                                color={
                                  activeElement === value ? "#fff" : "#c5c5c5"
                                }
                              />
                            )) || (
                              <FiUsers
                                size={18}
                                color={
                                  activeElement === value ? "#fff" : "#c5c5c5"
                                }
                              />
                            )}
                        </div>
                        <span className="ml-1">
                          {value === "Dashboard"
                            ? "Retour au dashboard"
                            : value === "Gerer"
                            ? "Gérer un autre compte"
                            : value === "Securite"
                            ? "Sécurité"
                            : value}
                        </span>
                      </div>
                    );
                  })
                : optionSec.map((value, i) => {
                    return (
                      <div
                        className={`flex py-3 px-6 m-2 rounded-md max-sm:mx-3 border  items-center whitespace-nowrap cursor-pointer text-sm ${
                          activeElement === value
                            ? "bg-app-blue text-white border-app-blue font-bold max-md:text-whitemax-sm:text-white"
                            : " bg-white font-semibold  border-[#cccccc] hover:bg-app-filter-blue"
                        }`}
                        key={i}
                        onClick={() => handleClick(value)}
                      >
                        <div>
                          {(value === "Dashboard" && (
                            <FiHome
                              size={18}
                              color={
                                activeElement === value ? "#fff" : "#c5c5c5"
                              }
                            />
                          )) ||
                            (value === "Securite" && (
                              <MdSecurity
                                size={18}
                                color={
                                  activeElement === value ? "#fff" : "#c5c5c5"
                                }
                              />
                            )) || (
                              <FiUsers
                                size={18}
                                color={
                                  activeElement === value ? "#fff" : "#c5c5c5"
                                }
                              />
                            )}
                        </div>
                        <span className="ml-1">
                          {value === "Dashboard"
                            ? "Retour au dashboard"
                            : value === "Securite"
                            ? "Sécurité"
                            : value}
                        </span>
                      </div>
                    );
                  })}
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
