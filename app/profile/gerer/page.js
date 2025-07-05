"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { Input } from "../../components/inputs";
import {
  FiEye,
  FiMail,
  FiMapPin,
  FiPhone,
  FiUser,
  FiUserPlus,
} from "react-icons/fi";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineSafetyCertificate,
} from "react-icons/ai";
import { FaRegBuilding } from "react-icons/fa";
import { HiLockClosed } from "react-icons/hi";
import { registerUser } from "@/redux/authSlice/authActions";
import { useDispatch, useSelector } from "react-redux";
import SuccessPopup from "@/app/components/popups/SuccessPopup";
import { deleteUser, getUsers } from "@/redux/userSlice/userActions";
import { getMinistries } from "@/redux/ministrySlice/ministryActions";
import Suppression from "@/app/components/popups/Suppression";
import { resetMessage } from "@/redux/userSlice/userSlice";
import { resetInfos } from "@/redux/authSlice/authSlice";

export default function Profile() {
  const [input, setInput] = useState({});
  const [user, setUser] = useState();
  const [successPopup, setHide] = useState(true);
  const [errors, setError] = useState({});
  const [showPassword, _setShowPassword] = useState(false);
  const [key, setKey] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const dispatch = useDispatch();

  const togglePassword = () => {
    if (showPassword) _setShowPassword(false);
    else _setShowPassword(true);
  };
  useLayoutEffect(() => {
    setUser(
      typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("focal-user")) &&
        JSON.parse(localStorage.getItem("focal-user"))
    );
  }, []);
  const dataSent = {
    email: input?.email,
    firstname: input?.firstname,
    lastname: input?.lastname,
    middlename: input?.middlename,
    gender: input?.gender,
    fonction: input?.fonction,
    administration: input?.administration,
    address: input?.address,
    phoneNumber: input?.phoneNumber,
    password: input?.password,
    domain: "",
    role: user?.role == "admin" ? input?.role : "secretariat",
    ministry:
      user?.role == "admin"
        ? input?.ministry?.smallName
        : user?.ministry?.smallName,
  };

  const handleNewUSer = () => {
    if (!input?.password) {
      setError({
        ...errors,
        password: "Mot de passe indispensable",
      });
    } else {
      dispatch(registerUser({ ...dataSent }));
    }
  };
  const { success, newUser, error } = useSelector((state) => state.auth);
  const { allUsers, delInfos } = useSelector((state) => state.user);
  const { allMinistries, ministryInfo } = useSelector(
    (state) => state.ministry
  );

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getMinistries());

    if (newUser?.message == "Utilisateur créé avec succès") {
      setHide(false);
      setShowForm(false);
      setInput("");
      dispatch(resetInfos());
    }
    if (delInfos?.message == "Utilisateur supprimé avec succès.") {
      setHide(false);
      dispatch(resetMessage());
    }
  }, [dispatch, newUser, getUsers, delInfos]);

  const userAll = allUsers?.users;

  const filteredUserByMinistries = userAll
    ? userAll?.filter(
        (aUser) =>
          aUser.ministry.name
            .toLowerCase()
            .includes(user?.ministry?.name?.toLowerCase()) &&
          aUser?.role == "secretariat"
      )
    : [];

  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUserByMinistries.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white p-4 min-h-[400px]">
      <h5 className="font-semibold text-[#6c6c6c] text-lg p-2">
        Gérer un autre compte
      </h5>

      <div className="">
        <p className="text-[13px] p-2">
          {user?.role !== "admin"
            ? filteredUserByMinistries
              ? "Veuillez créer un utilisateur pour le compte du Secrétariat Général"
              : "Les informations du compte Point Focal du Secrétariat Général"
            : ""}
        </p>
        {user?.role !== "admin" &&
          filteredUserByMinistries &&
          (!showForm ? (
            <div
              className={`flex py-3 px-6 mx-2 my-2 rounded-md max-sm:mx-3  border text-white  items-center whitespace-nowrap cursor-pointer text-sm w-[250px] bg-app-dark-blue hover:opacity-90`}
              onClick={() => setShowForm(true)}
            >
              <div>
                <FiUserPlus size={18} color={"#c5c5c5"} />
              </div>
              <span className="ml-1">Créer un nouveau compte </span>
            </div>
          ) : (
            <div
              className={`flex py-3 px-6 mx-2 my-2 rounded-md max-sm:mx-3  border text-white  items-center whitespace-nowrap cursor-pointer text-sm w-[250px] bg-app-dark-blue hover:opacity-90`}
              onClick={() => setShowForm(false)}
            >
              <div>
                <FiEye size={18} color={"#c5c5c5"} />
              </div>
              <span className="ml-1">Voir le compte du Secrétariat</span>
            </div>
          ))}
      </div>
      {user?.role !== "admin" ? (
        showForm && (
          <div>
            <p className="text-[13px]  p-2">
              Créez un autre utilisateur en remplissant les informations le
              concernant et appuyez sur Enregistrer.
            </p>
            <div className="flex w-full gap-4 max-lg:flex-col    p-2">
              <Input
                Icon={<FiUser size={13} color="#707070" />}
                placeholder={"Prenom"}
                name={"firstname"}
                value={input?.firstName}
                customClass={"w-full"}
                doOnInput={(text) => setInput({ ...input, firstname: text })}
              />
              <Input
                Icon={<FiUser size={13} color="#707070" />}
                placeholder={"Nom"}
                name={"lastname"}
                value={input?.lastname}
                customClass={"w-full"}
                doOnInput={(text) => setInput({ ...input, lastname: text })}
              />
            </div>
            <div className="flex w-full gap-4 max-lg:flex-col     p-2 pb-4">
              <Input
                Icon={<FiUser size={13} color="#707070" />}
                placeholder={"Postnom"}
                name={"middlename"}
                value={input?.middlename}
                customClass={"w-full"}
                doOnInput={(text) => setInput({ ...input, middlename: text })}
              />
              <div className="flex items-center w-full bg-app-filter-blue border border-transparent rounded-md min-w-[300px] pl-5 transiton-all duration-500 ease-out hover:border-app-blue focus-within:border-app-blue focus-within:shadow-[0_0_0_1px_#348206]">
                <FiUser size={12} color="#707070" />
                <select
                  onChange={(text) =>
                    setInput({ ...input, gender: text.target.value })
                  }
                  value={input?.gender}
                  className={
                    "w-full h-full p-2 outline-none rounded-full bg-transparent text-xs text-app-dark"
                  }
                >
                  <option value="#">-- Selectionner le Genre --</option>
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </select>
              </div>
            </div>
            <hr />
            <div className="flex w-full gap-4 max-lg:flex-col     px-2 py-4">
              <Input
                Icon={<FiPhone size={13} color="#707070" />}
                placeholder={"Téléphone"}
                name={"tel"}
                value={input?.phoneNumber}
                customClass={"w-full"}
                doOnInput={(text) => setInput({ ...input, phoneNumber: text })}
              />
              <Input
                Icon={<FiMail size={13} color="#707070" />}
                placeholder={"Mail"}
                name={"email"}
                value={input?.email}
                customClass={"w-full"}
                doOnInput={(text) => setInput({ ...input, email: text })}
              />
            </div>
            <div className="flex w-full gap-5 max-lg:flex-col    px-2 pb-4">
              <Input
                Icon={<AiOutlineSafetyCertificate size={13} color="#707070" />}
                placeholder={"Fonction (Grade)"}
                name={"fonction"}
                value={input?.fonction}
                customClass={"w-full"}
                doOnInput={(text) => setInput({ ...input, fonction: text })}
              />
              <div className="flex items-center w-full bg-app-filter-blue border border-transparent rounded-md min-w-[300px] pl-5 transiton-all duration-500 ease-out hover:border-app-blue focus-within:border-app-blue focus-within:shadow-[0_0_0_1px_#348206]">
                <FiUser size={12} color="#707070" />
                <select
                  value="secretariat"
                  disabled
                  className="w-full h-full p-2 outline-none rounded-full bg-transparent text-xs text-app-dark"
                >
                  <option value="secretariat">Secretariat</option>
                </select>
              </div>
            </div>
            <div className="flex w-full gap-5 max-lg:flex-col    px-2 pb-4">
              <div className="flex items-center w-full bg-app-filter-blue border border-transparent rounded-md min-w-[300px] pl-5 transiton-all duration-500 ease-out hover:border-app-blue focus-within:border-app-blue focus-within:shadow-[0_0_0_1px_#348206]">
                <FaRegBuilding size={12} color="#707070" />
                <select
                  value={user?.ministry?.smallName}
                  disabled
                  className={
                    "w-full h-full p-2 outline-none rounded-full bg-transparent text-xs text-app-dark"
                  }
                >
                  <option value={user?.ministry?.smallName}>
                    {user?.ministry?.smallName}
                  </option>
                </select>
              </div>
              <Input
                Icon={<FaRegBuilding size={13} color="#707070" />}
                placeholder={"Nom de l'administration"}
                name={"company"}
                value={input?.administration}
                customClass={"w-full"}
                doOnInput={(text) =>
                  setInput({ ...input, administration: text })
                }
              />
            </div>
            <div className="flex w-full gap-5 max-lg:flex-col    px-2 pb-4">
              <Input
                Icon={<FiMapPin size={13} color="#707070" />}
                placeholder={"Adresse (lieu de travail)"}
                name={"address"}
                value={input?.address}
                customClass={"w-full"}
                doOnInput={(text) => setInput({ ...input, address: text })}
              />
              <Input
                Icon={<HiLockClosed size={15} color="#707070" />}
                type={showPassword ? "text" : "password"}
                name={"password"}
                value={input?.password}
                placeholder={"Mot de passe"}
                doOnInput={(text) => setInput({ ...input, password: text })}
                customClass={""}
                messageIfError={errors?.password}
                customElements={
                  showPassword ? (
                    <AiFillEyeInvisible
                      size={18}
                      color="#3a72b8"
                      onClick={togglePassword}
                    />
                  ) : (
                    <AiFillEye
                      size={18}
                      color="#3a72b8"
                      onClick={togglePassword}
                    />
                  )
                }
              />
            </div>
            {error && (
              <p className="text-xs text-red-700 text-center">{`Erreur : ${error}`}</p>
            )}
            <hr />
            <div className="flex justify-end gap-4 py-4 max-sm:flex-wrap">
              <div className="py-2">
                <span className="text-[15px] text-center text-app-green  bg-white border border-[#b8b8b8] hover:bg-app-filter-blue rounded-md px-8 py-2 cursor-pointer">
                  Annuler
                </span>
              </div>
              <div className="py-2">
                <span
                  onClick={handleNewUSer}
                  className="text-[15px] text-center text-white bg-app-blue rounded-md px-8 py-2 cursor-pointer"
                >
                  Enregistrer
                </span>
              </div>
            </div>
          </div>
        )
      ) : (
        <div>
          <p className="text-[13px] px-2">
            Créez un autre utilisateur en remplissant les informations le
            concernant et appuyez sur Enregistrer.
          </p>
          <div className="flex w-full gap-4 max-lg:flex-col     p-2">
            <Input
              Icon={<FiUser size={13} color="#707070" />}
              placeholder={"Prenom"}
              name={"firstname"}
              value={input?.firstName}
              customClass={"w-full"}
              doOnInput={(text) => setInput({ ...input, firstname: text })}
            />
            <Input
              Icon={<FiUser size={13} color="#707070" />}
              placeholder={"Nom"}
              name={"lastname"}
              value={input?.lastname}
              customClass={"w-full"}
              doOnInput={(text) => setInput({ ...input, lastname: text })}
            />
          </div>
          <div className="flex w-full gap-4 max-lg:flex-col     p-2 pb-4">
            <Input
              Icon={<FiUser size={13} color="#707070" />}
              placeholder={"Postnom"}
              name={"middlename"}
              value={input?.middlename}
              customClass={"w-full"}
              doOnInput={(text) => setInput({ ...input, middlename: text })}
            />
            <div className="flex items-center w-full bg-app-filter-blue border border-transparent rounded-md min-w-[300px] pl-1 transiton-all duration-500 ease-out hover:border-app-blue focus-within:border-app-blue focus-within:shadow-[0_0_0_1px_#348206]">
              <FiUser size={13} color="#707070" className="ml-3" />
              <select
                onChange={(text) =>
                  setInput({ ...input, gender: text.target.value })
                }
                value={input?.gender}
                className={
                  "w-full h-full p-2 outline-none rounded-full bg-transparent text-[15px] text-app-dark"
                }
              >
                <option value="#">-- Selectionner le Genre --</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
          </div>
          <hr />
          <div className="flex w-full gap-4 max-lg:flex-col     px-2 py-4">
            <Input
              Icon={<FiPhone size={13} color="#707070" />}
              placeholder={"Téléphone"}
              name={"tel"}
              value={input?.phoneNumber}
              customClass={"w-full"}
              doOnInput={(text) => setInput({ ...input, phoneNumber: text })}
            />
            <Input
              Icon={<FiMail size={13} color="#707070" />}
              placeholder={"Mail"}
              name={"email"}
              value={input?.email}
              customClass={"w-full"}
              doOnInput={(text) => setInput({ ...input, email: text })}
            />
          </div>
          <div className="flex w-full gap-5 max-lg:flex-col    px-2 pb-4">
            <Input
              Icon={<AiOutlineSafetyCertificate size={13} color="#707070" />}
              placeholder={"Fonction (Grade)"}
              name={"fonction"}
              value={input?.fonction}
              customClass={"w-full"}
              doOnInput={(text) => setInput({ ...input, fonction: text })}
            />
            <div className="flex items-center w-full bg-app-filter-blue border border-transparent rounded-md min-w-[300px] pl-1 transiton-all duration-500 ease-out hover:border-app-blue focus-within:border-app-blue focus-within:shadow-[0_0_0_1px_#348206]">
              <FiUser size={12} color="#707070" className="ml-3" />
              <select
                onChange={(text) =>
                  setInput({ ...input, role: text.target.value })
                }
                value={input?.role}
                className={
                  "w-full h-full p-2 outline-none rounded-full bg-transparent text-[15px] text-app-dark"
                }
              >
                <option value="admin">Administrateur</option>
                <option value="cabinet">Cabinet</option>
                <option value="secretariat">Secretariat</option>
              </select>
            </div>
          </div>
          <div className="flex w-full gap-5 max-lg:flex-col    px-2 pb-4">
            <div className="flex items-center w-full bg-app-filter-blue border border-transparent rounded-md min-w-[300px] pl-4 transiton-all duration-500 ease-out hover:border-app-blue focus-within:border-app-blue focus-within:shadow-[0_0_0_1px_#348206]">
              <FaRegBuilding size={12} color="#707070" />
              <select
                onChange={(text) =>
                  setInput({
                    ...input,
                    ministry: {
                      ...input.ministry,
                      smallName: text.target.value,
                    },
                  })
                }
                value={input?.ministry?.smallName}
                className={
                  "w-full h-full p-2 outline-none rounded-full bg-transparent text-[15px] text-app-dark"
                }
              >
                <option value="" disabled>
                  -- Sélectionnez un ministère --
                </option>
                {allMinistries?.map((ministry) => (
                  <option key={ministry._id} value={ministry.smallName}>
                    {ministry.smallName}
                  </option>
                ))}
              </select>
            </div>
            <Input
              Icon={<FaRegBuilding size={13} color="#707070" />}
              placeholder={"Nom de l'administration"}
              name={"company"}
              value={input?.administration}
              customClass={"w-full"}
              doOnInput={(text) => setInput({ ...input, administration: text })}
            />
          </div>
          <div className="flex w-full gap-5 max-lg:flex-col    px-2 pb-4">
            <Input
              Icon={<FiMapPin size={13} color="#707070" />}
              placeholder={"Adresse (lieu de travail)"}
              name={"address"}
              value={input?.address}
              customClass={"w-full"}
              doOnInput={(text) => setInput({ ...input, address: text })}
            />
            <Input
              Icon={<HiLockClosed size={15} color="#707070" />}
              type={showPassword ? "text" : "password"}
              name={"password"}
              value={input?.password}
              placeholder={"Mot de passe"}
              doOnInput={(text) => setInput({ ...input, password: text })}
              customClass={""}
              messageIfError={errors?.password}
              customElements={
                showPassword ? (
                  <AiFillEyeInvisible
                    size={18}
                    color="#3a72b8"
                    onClick={togglePassword}
                  />
                ) : (
                  <AiFillEye
                    size={18}
                    color="#3a72b8"
                    onClick={togglePassword}
                  />
                )
              }
            />
          </div>
          {error && (
            <p className="text-[13px] text-red-700 text-center">{`Erreur : ${error}`}</p>
          )}
          <hr />
          <div className="flex justify-end gap-4 py-4 max-sm:flex-wrap">
            <div className="py-2">
              <span className="text-[15px] text-center text-app-green  bg-white border border-[#b8b8b8] hover:bg-app-filter-blue rounded-md px-8 py-2 cursor-pointer">
                Annuler
              </span>
            </div>
            <div className="py-2">
              <span
                onClick={handleNewUSer}
                className="text-[15px] text-center text-white bg-app-blue rounded-md px-8 py-2 cursor-pointer"
              >
                Enregistrer
              </span>
            </div>
          </div>
        </div>
      )}
      {user?.role !== "admin" && !showForm && (
        <div className="max-sm:overflow-scroll ">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="w-full bg-gray-200 text-gray-600 uppercase text-md leading-normal">
                <th className="py-3 px-6 text-left"></th>
                <th className="py-3 px-6 text-left">Nom</th>
                <th className="py-3 px-6 text-left">
                  Ministère | Administration
                </th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-[15px] font-light">
              {filteredUserByMinistries?.map((user) => (
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
                    {user?.ministry?.smallName}{" "}
                    {user?.administration && `| ${user.administration}`}
                  </td>

                  <td className="py-3 px-6">
                    <button
                      onClick={() => openModal(user)}
                      className="bg-app-blue text-white px-4 py-2 rounded mr-2"
                    >
                      Voir
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
      )}
      {/* Info Pagination */}
      {user?.role !== "admin" && !showForm && (
        <p className="text-center text-xs text-gray-600 my-2">
          Page {currentPage} sur{" "}
          {Math.ceil(filteredUserByMinistries.length / usersPerPage)} —{" "}
          {filteredUserByMinistries.length} utilisateur(s) trouvé(s)
        </p>
      )}
      {/* Pagination */}
      {user?.role !== "admin" && !showForm && (
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
      )}
      <SuccessPopup show={successPopup} onHide={setHide} />
      <Suppression show={successPopup} onHide={setHide} />

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-lg p-6">
            <h2 className="text-lg font-bold mb-4">
              Détails de {selectedUser.firstname} {selectedUser.lastname}
            </h2>
            <div className="flex gap-4 text-[15px]">
              <img
                src={
                  selectedUser?.picture
                    ? `${process.env.NEXT_PUBLIC_DEV_API_URL}${selectedUser.picture}`
                    : "/images/unknown.png"
                }
                alt="User"
                className="w-24 h-24 rounded-full object-cover border"
              />
              <div>
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
            <div className="flex justify-end gap-2 mt-4">
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
      {/* Modal de suppression */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-md p-6">
            <h2 className="text-lg font-bold mb-4">Confirmer la suppression</h2>
            <p className="mb-4 text-[15px]">
              Êtes-vous sûr de vouloir supprimer{" "}
              <span className="font-semibold">
                {selectedUser?.firstname} {selectedUser?.lastname}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-2 text-[15px]">
              <button
                onClick={closeModals}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  dispatch(deleteUser(selectedUser?._id));
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
  );
}
