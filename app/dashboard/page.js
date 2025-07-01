"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MdHome } from "react-icons/md";
import { Input } from "../components/inputs";
import { BiSearch } from "react-icons/bi";
import { FaBuilding, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { stats } from "@/redux/statSlice/statActions";
import {
  deleteUser,
  editUserByAdmin,
  getUsers,
} from "@/redux/userSlice/userActions";
import Link from "next/link";
import { resetMessage } from "@/redux/userSlice/userSlice";
import Suppression from "../components/Suppression";
import Modification from "../components/Modification";
import { getMinistries } from "@/redux/ministrySlice/ministryActions";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { registerUser } from "@/redux/authSlice/authActions";
import SuccessPopup from "../components/SuccessPopup";
import { resetInfos } from "@/redux/authSlice/authSlice";

const ministries = [
  "Tout",
  "Primature",
  "Intérieur",
  "Défense",
  "Plan",
  "Economie",
  "Fonction Publique",
  "Agriculture",
  "Affaires étrangères",
  "Education nationale",
  "Environnement",
  "Infrastructures",
  "Justice",
  "Budget",
  "Affaires foncières",
  "Développement rural",
  "Aménagement",
  "Finances",
  "Industrie",
  "Ressources hydrauliques",
  "Mines",
  "Hydrocarbures",
  "Emploi et Travail",
  "Urbanisme",
  "Droits humains",
  "Santé",
  "ESU",
  "Recherche Scientifique",
  "PTN",
  "Portefeuille",
  "Affaires Sociales",
  "Commerce Extérieur",
  "Intégration Régionale",
  "Communication",
  "Formation Professionnelle",
  "Genre",
  "Pêche et Elevage",
  "Culture",
  "Tourisme",
  "Sports",
  "Jeunesse",
];

export default function Dashboard() {
  const [activeElement, setActiveElement] = useState("Tout");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [successPopup, setHide] = useState(true);
  const [editPopup, setEdit] = useState(true);
  const [_newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    gender: "",
    fonction: "",
    administration: "",
    address: "",
    phoneNumber: "",
    role: "cabinet",
    ministry: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const openCreateModal = () => {
    setSelectedUser();
    setIsCreateModalOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsCreateModalOpen(false);
    setSelectedUser(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Logique pour envoyer les modifications au backend
    console.log("Modifications soumises :", selectedUser);
    closeModals();
  };

  const usersPerPage = 5;

  const { stat } = useSelector((state) => state.stat);
  const { allUsers, userUpdate, delInfos } = useSelector((state) => state.user);
  const { success, newUser, error } = useSelector((state) => state.auth);

  const userAll = allUsers?.users;

  const { allMinistries, ministryInfo } = useSelector(
    (state) => state.ministry
  );

  useEffect(() => {
    dispatch(stats({}));
    dispatch(getUsers());
    dispatch(getMinistries());
    if (delInfos?.message == "Utilisateur supprimé avec succès.") {
      setHide(false);
      dispatch(resetMessage()); // Réinitialiser le message
    }
    if (userUpdate?.message == "Profil mis à jour avec succès") {
      setEdit(false);
      dispatch(resetMessage()); // Réinitialiser le message
    }
    if (newUser?.message == "Utilisateur créé avec succès") {
      setIsCreateModalOpen(false);
      setHide(false);
      setNewUser("");
      dispatch(resetInfos);
    }
  }, [dispatch, delInfos, userUpdate, newUser]);

  const handleClick = (value) => {
    setActiveElement(value);
  };
  const usersAll = userAll?.filter((user) =>
    activeElement !== "Tout" ? user.ministry.smallName === activeElement : true
  );

  const filteredUserByMinistries = userAll
    ? usersAll?.filter((user) =>
        user.ministry.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUserByMinistries.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="flex bg-[#f9f9f9] pb-2 text-app-dark">
      <div className="flex flex-col gap-2 w-full">
        <div className="bg-white text-sm w-full p-2.5 flex  items-center justify-between border border-b">
          <div className="flex items-center gap-2">
            <div className="bg-app-filter-blue rounded-lg p-1">
              <MdHome size={15} className="text-app-blue" />
            </div>
            <p>Dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <div className=" rounded-lg">
              <Input
                type={"text"}
                placeholder={"Recherche par ministère..."}
                Icon={<BiSearch size={15} color="#707070" />}
                name={"text"}
                value={searchQuery}
                customClass={""}
                doOnInput={(text) => setSearchQuery(text)}
              />
            </div>
            {/*  <p>Filter</p> */}
          </div>
        </div>
        <div className="px-3.5 flex items-center gap-4 max-sm:flex-col">
          <div className="bg-white w-full p-4 rounded-lg  px-8 max-md:px-4">
            <div className="flex items-center justify-between w-full ">
              <div>
                <h4 className="text-md font-medium mb-4">Points Focaux</h4>
                <p className="text-3xl font-bold text-app-dark-blue">
                  {stat ? stat?.[1]?.count + stat?.[2]?.count : "0"}
                </p>
              </div>
              <FaUsers size={25} color="#3a72b8" />
            </div>
          </div>
          <div className="bg-white w-full p-4 rounded-lg  px-8 max-md:px-4">
            <div className="flex items-center justify-between w-full">
              <div>
                <h4 className=" text-md font-medium mb-4">
                  Cabinet du Ministre
                </h4>
                <p className="text-3xl font-bold text-[#28A745]">
                  {stat ? stat?.[1]?.count : "0"}
                </p>
              </div>
              <FaBuilding size={25} color="#28A745" />
            </div>
          </div>{" "}
          <div className="bg-white w-full p-4 rounded-lg  px-8 max-md:px-4">
            <div className="flex items-center justify-between w-full">
              <div>
                <h4 className=" text-md font-medium mb-4">
                  Secrétariats Généraux
                </h4>
                <p className="text-3xl font-bold text-[#DC3545]">
                  {stat ? stat?.[2]?.count : "0"}
                </p>
              </div>
              <FaBuilding size={25} color="#DC3545" />
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full p-1 overflow-x-scroll max-sm:p-0 scrollbar-hide scrol">
          {ministries.map((value, i) => {
            return (
              <div
                className={`flex py-1 px-4 mx-2 rounded-md max-sm:mx-3  items-center max-sm:border whitespace-nowrap cursor-pointer text-[13px] ${
                  activeElement === value
                    ? "bg-app-blue text-white font-medium max-md:text-whitemax-sm:text-white"
                    : "text-[#565661] bg-white font-medium border hover:bg-app-filter-blue"
                }`}
                key={i}
                onClick={() => handleClick(value)}
              >
                <span className="ml-1">{value}</span>
              </div>
            );
          })}
        </div>
        <div>
          {" "}
          <div className="container mx-auto mt-1 p-2">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold m-2">Liste des Points focaux</h2>{" "}
              <div
                onClick={() => openCreateModal()}
                className="text-app-blue border-2 border-app-blue hover:bg-app-blue hover:text-white transition  mb-1 px-2 p-1 text-md rounded-md cursor-pointer"
              >
                + Ajouter un point focal
              </div>
            </div>
            <div className="max-sm:overflow-scroll ">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="w-full bg-gray-200 text-gray-600 uppercase text-md leading-normal">
                    <th className="py-3 px-6 text-left"></th>
                    <th className="py-3 px-6 text-left">Nom</th>
                    <th className="py-3 px-6 text-left">
                      Ministère | Administration
                    </th>
                    <th className="py-3 px-6 text-left">ROLE</th>
                    <th className="py-3 px-6 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-[15px] font-light">
                  {currentUsers?.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6">
                        <img
                          src={
                            user?.picture
                              ? `${process.env.NEXT_PUBLIC_DEV_API_URL}${user?.picture}`
                              : "/images/unknown.png"
                          }
                          alt={user.firstname}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="py-3 px-6">
                        {user.firstname} {user.lastname}
                      </td>
                      <td className="py-3 px-6 w-72">
                        {user?.ministry?.name}{" "}
                        {user?.administration && `| ${user.administration}`}
                      </td>
                      <td className="py-3 px-6">
                        {user?.role == "cabinet"
                          ? "Cabinet"
                          : user?.role == "secretariat"
                          ? "Secrétariat"
                          : "Administrateur"}
                      </td>
                      <td className="py-3 px-6">
                        <button
                          onClick={() => openModal(user)}
                          className="bg-app-blue text-white px-4 py-2 rounded mr-2 max-sm:mb-1"
                        >
                          Voir
                        </button>
                        <button
                          onClick={() => openEditModal(user)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 max-sm:mb-1"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => openDeleteModal(user)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Info Pagination */}
            <p className="text-center text-xs text-gray-600 my-2">
              Page {currentPage} sur{" "}
              {Math.ceil(filteredUserByMinistries.length / usersPerPage)} —{" "}
              {filteredUserByMinistries.length} utilisateur(s) trouvé(s)
            </p>
            {/* Pagination */}
            <div className="flex justify-center mt-2 text-xs">
              {[
                ...Array(
                  Math.ceil(filteredUserByMinistries.length / usersPerPage)
                ).keys(),
              ].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`mx-1 px-3 py-1 rounded ${
                    currentPage === number + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {number + 1}
                </button>
              ))}
            </div>
            {/* Modal */}
            {isModalOpen && selectedUser && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-lg max-sm:w-5/6 p-6">
                  <h2 className="text-lg font-bold mb-4">
                    Détails de {selectedUser.firstname} {selectedUser.lastname}
                  </h2>
                  <div className="flex gap-4 max-sm:flex-col">
                    <img
                      src={
                        selectedUser?.picture
                          ? `${process.env.NEXT_PUBLIC_DEV_API_URL}${selectedUser.picture}`
                          : "/images/unknown.png"
                      }
                      alt="User"
                      className="w-24 h-24 rounded-full object-cover border"
                    />
                    <div className="text-[15px]">
                      <p className="py-1">
                        <span className="font-semibold">Nom :</span>{" "}
                        {selectedUser.firstname} {selectedUser.lastname}{" "}
                        {selectedUser.middlename}
                      </p>
                      <p className="py-1">
                        <span className="font-semibold">Genre :</span>{" "}
                        {selectedUser?.gender || "Non spécifié"}
                      </p>
                      <p className="py-1">
                        <span className="font-semibold">Ministère :</span>{" "}
                        {selectedUser?.ministry?.name}
                      </p>
                      <p className="py-1">
                        <span className="font-semibold">Administration :</span>{" "}
                        {selectedUser?.administration || "Non spécifié"}
                      </p>
                      <p className="py-1">
                        <span className="font-semibold">Rôle :</span>{" "}
                        {selectedUser?.role === "cabinet"
                          ? "Cabinet"
                          : selectedUser?.role === "secretariat"
                          ? "Secrétariat"
                          : "Administrateur"}
                      </p>
                      <p className="py-1">
                        <span className="font-semibold">Fonction :</span>{" "}
                        {selectedUser?.fonction || "Non spécifié"}
                      </p>
                      <p className="py-1">
                        <a href={`tel:${selectedUser?.phoneNumber}`}>
                          <span className="font-semibold">Téléphone :</span>{" "}
                          {selectedUser?.phoneNumber || "Non spécifié"}
                        </a>
                      </p>
                      <p className="py-1">
                        <a href={`mailto:${selectedUser?.email}`}>
                          <span className="font-semibold">Email :</span>{" "}
                          {selectedUser?.email || "Non spécifié"}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4 text-[15px]">
                    <Link
                      href={`/dashboard/collaborer/${selectedUser?._id}`}
                      className="bg-app-blue text-white px-4 py-2 rounded"
                    >
                      Contacter
                    </Link>
                    <button
                      onClick={closeModals}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal de création */}
            {isCreateModalOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-2/4 p-4 overflow-y-auto max-sm:w-5/6 max-h-[90vh]">
                  <h2 className="text-lg font-bold mb-2">
                    Créer un nouvel utilisateur
                  </h2>

                  <form
                    className="text-[15px]"
                    onSubmit={(e) => {
                      e.preventDefault();
                      dispatch(registerUser(_newUser));
                      closeModals();
                    }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {/* Prénom */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Prénom
                        </label>
                        <input
                          type="text"
                          value={_newUser.firstname || ""}
                          onChange={(e) =>
                            setNewUser({
                              ..._newUser,
                              firstname: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>

                      {/* Nom */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Nom
                        </label>
                        <input
                          type="text"
                          value={_newUser.lastname || ""}
                          onChange={(e) =>
                            setNewUser({
                              ..._newUser,
                              lastname: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Postnom */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Postnom
                        </label>
                        <input
                          type="text"
                          value={_newUser.middlename || ""}
                          onChange={(e) =>
                            setNewUser({
                              ..._newUser,
                              middlename: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>

                      {/* Genre */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Genre
                        </label>
                        <select
                          value={_newUser.gender || ""}
                          onChange={(e) =>
                            setNewUser({ ..._newUser, gender: e.target.value })
                          }
                          className="w-full p-2 border rounded"
                        >
                          <option value="">-- Sélectionnez --</option>
                          <option value="Homme">Homme</option>
                          <option value="Femme">Femme</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Rôle */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Rôle
                        </label>
                        <select
                          value={_newUser.role}
                          onChange={(e) =>
                            setNewUser({ ..._newUser, role: e.target.value })
                          }
                          className="w-full p-2 border rounded"
                        >
                          <option value="cabinet">Cabinet</option>
                          <option value="secretariat">Secrétariat</option>
                          <option value="admin">Administrateur</option>
                        </select>
                      </div>

                      {/* Ministère */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Ministère
                        </label>
                        <select
                          value={_newUser?.ministry || ""}
                          onChange={(e) =>
                            setNewUser({
                              ..._newUser,
                              ministry: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        >
                          <option value="">
                            -- Sélectionnez un ministère --
                          </option>
                          {allMinistries.map((ministry) => (
                            <option
                              key={ministry._id}
                              value={ministry.smallName}
                            >
                              {ministry.smallName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Administration */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Administration
                        </label>
                        <input
                          type="text"
                          value={_newUser.administration || ""}
                          onChange={(e) =>
                            setNewUser({
                              ..._newUser,
                              administration: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>

                      {/* Fonction */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Fonction
                        </label>
                        <input
                          type="text"
                          value={_newUser.fonction || ""}
                          onChange={(e) =>
                            setNewUser({
                              ..._newUser,
                              fonction: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Téléphone */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Téléphone
                        </label>
                        <input
                          type="text"
                          value={_newUser.phoneNumber || ""}
                          onChange={(e) =>
                            setNewUser({
                              ..._newUser,
                              phoneNumber: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>

                      {/* Email */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={_newUser.email || ""}
                          onChange={(e) =>
                            setNewUser({ ..._newUser, email: e.target.value })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>

                    {/* Mot de passe */}
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-1">
                        Mot de passe
                      </label>

                      <div className="flex items-center border rounded px-2">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={_newUser.password || ""}
                          onChange={(e) =>
                            setNewUser({
                              ..._newUser,
                              password: e.target.value,
                            })
                          }
                          className="w-full p-2 outline-none border-none bg-transparent"
                          placeholder="Entrez le mot de passe"
                        />

                        <button
                          type="button"
                          onClick={togglePassword}
                          className="p-1 focus:outline-none"
                        >
                          {showPassword ? (
                            <AiFillEyeInvisible size={20} color="#3a72b8" />
                          ) : (
                            <AiFillEye size={20} color="#3a72b8" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end mt-4">
                      <button
                        type="button"
                        onClick={closeModals}
                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="bg-app-blue text-white px-4 py-2 rounded"
                      >
                        Enregistrer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {/* Modal d'édition */}
            {isEditModalOpen && selectedUser && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-2/4 p-4 overflow-y-auto max-sm:w-5/6 max-h-[90vh]">
                  <h2 className="text-lg font-bold mb-2">
                    Modifier l'utilisateur
                  </h2>
                  <form
                    className="text-[15px]"
                    onSubmit={(e) => {
                      e.preventDefault();
                      dispatch(
                        editUserByAdmin({
                          id: selectedUser._id, // ID de l'utilisateur à modifier
                          email: selectedUser.email,
                          firstname: selectedUser.firstname,
                          lastname: selectedUser.lastname,
                          middlename: selectedUser.middlename,
                          gender: selectedUser.gender,
                          fonction: selectedUser.fonction,
                          administration: selectedUser.administration,
                          address: selectedUser.address,
                          phoneNumber: selectedUser.phoneNumber,
                          domain: selectedUser.domain,
                          role: selectedUser.role,
                          ministryName: selectedUser.ministry?.smallName || "",
                        })
                      );

                      closeModals();
                    }}
                  >
                    <div className="grid grid-cols-2 gap-4 ">
                      {/* Firstname */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Prénom
                        </label>
                        <input
                          type="text"
                          value={selectedUser.firstname}
                          onChange={(e) =>
                            setSelectedUser({
                              ...selectedUser,
                              firstname: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>

                      {/* Lastname */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Nom
                        </label>
                        <input
                          type="text"
                          value={selectedUser.lastname}
                          onChange={(e) =>
                            setSelectedUser({
                              ...selectedUser,
                              lastname: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Middlename (Postnom) */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Postnom
                        </label>
                        <input
                          type="text"
                          value={selectedUser.middlename || ""}
                          onChange={(e) =>
                            setSelectedUser({
                              ...selectedUser,
                              middlename: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>

                      {/* Gender */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Genre
                        </label>
                        <select
                          value={selectedUser.gender || ""}
                          onChange={(e) =>
                            setSelectedUser({
                              ...selectedUser,
                              gender: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        >
                          <option value="Homme">Homme</option>
                          <option value="Femme">Femme</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Role */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Rôle
                        </label>
                        <select
                          value={selectedUser.role}
                          onChange={(e) =>
                            setSelectedUser({
                              ...selectedUser,
                              role: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        >
                          <option value="cabinet">Cabinet</option>
                          <option value="secretariat">Secrétariat</option>
                          <option value="admin">Administrateur</option>
                        </select>
                      </div>

                      {/* Ministry */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Ministère
                        </label>
                        <select
                          value={selectedUser?.ministry?.smallName || ""}
                          onChange={(e) =>
                            setSelectedUser({
                              ...selectedUser,
                              ministry: {
                                ...selectedUser.ministry,
                                smallName: e.target.value,
                              },
                            })
                          }
                          className="w-full p-2 border rounded"
                        >
                          <option value="" disabled>
                            -- Sélectionnez un ministère --
                          </option>
                          {allMinistries.map((ministry) => (
                            <option
                              key={ministry._id}
                              value={ministry.smallName}
                            >
                              {ministry.smallName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>{" "}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Administration */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Administration
                        </label>
                        <input
                          type="text"
                          value={selectedUser.administration || ""}
                          onChange={(e) =>
                            setSelectedUser({
                              ...selectedUser,
                              administration: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>

                      {/* Fonction */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Fonction
                        </label>
                        <input
                          type="text"
                          value={selectedUser.fonction || ""}
                          onChange={(e) =>
                            setSelectedUser({
                              ...selectedUser,
                              fonction: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>{" "}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Phone Number */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Téléphone
                        </label>
                        <input
                          type="text"
                          value={selectedUser.phoneNumber || ""}
                          onChange={(e) =>
                            setSelectedUser({
                              ...selectedUser,
                              phoneNumber: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>

                      {/* Email */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={selectedUser.email || ""}
                          onChange={(e) =>
                            setSelectedUser({
                              ...selectedUser,
                              email: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>{" "}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Address */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Adresse
                        </label>
                        <input
                          type="text"
                          value={selectedUser.address || ""}
                          onChange={(e) =>
                            setSelectedUser({
                              ...selectedUser,
                              address: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>

                      {/* Domain */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-semibold mb-1">
                          Domaine
                        </label>
                        <input
                          type="text"
                          value={selectedUser.domain || ""}
                          onChange={(e) =>
                            setSelectedUser({
                              ...selectedUser,
                              domain: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex justify-end mt-4 ">
                      <button
                        type="button"
                        onClick={closeModals}
                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="bg-app-blue text-white  px-4 py-2 rounded"
                      >
                        Enregistrer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {/* Modal de suppression */}
            {isDeleteModalOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-md max-sm:w-5/6 p-6 text-center">
                  <h2 className="font-bold mb-4 text-lg">
                    Confirmer la suppression
                  </h2>
                  <p className="mb-4 text-[15px]">
                    Êtes-vous sûr de vouloir supprimer{" "}
                    <span className="font-semibold">
                      {selectedUser?.firstname} {selectedUser?.lastname}
                    </span>
                    ?
                  </p>
                  <div className="flex justify-center gap-2 text-[15px]">
                    <button
                      onClick={() => {
                        dispatch(deleteUser(selectedUser?._id));
                        closeModals();
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Oui, Supprimer
                    </button>
                    <button
                      onClick={closeModals}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Suppression show={successPopup} onHide={setHide} />
      <Modification show={editPopup} onHide={setEdit} />
      <SuccessPopup show={successPopup} onHide={setHide} />
    </section>
  );
}
