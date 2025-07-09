"use client";
import { useEffect, useState } from "react";
/* import { useDispatch, useSelector } from "react-redux";
 import {
  customerTransactionStats,
  customerViewTransaction,
} from "@/redux/transactionSlice/transactionActions";*/
import Image from "next/image";
import { MdHome } from "react-icons/md";
import { Input } from "../../components/inputs";
import { BiSearch } from "react-icons/bi";
import RegisterMinister from "@/app/components/RegisterMinister";
import {
  deleteMinistry,
  getMinistries,
  updateMinistry,
} from "@/redux/ministrySlice/ministryActions";
import { useDispatch, useSelector } from "react-redux";
import Suppression from "@/app/components/popups/Suppression";
import Modification from "@/app/components/popups/Modification";
import { resetMessage } from "@/redux/ministrySlice/ministrySlice";
import MinistryTableSkeleton from "@/app/components/skeletons/MinistryTableSkeleton";

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMinistry, setSelectedMinistry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [successPopup, setHide] = useState(true);
  const [editPopup, setEdit] = useState(true);

  const openEditModal = (ministry) => {
    setSelectedMinistry(ministry);
    setEditModalOpen(true);
  };

  const openDeleteModal = (ministry) => {
    setSelectedMinistry(ministry);
    setDeleteModalOpen(true);
  };

  const closeModals = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedMinistry(null);
  };

  const dispatch = useDispatch();
  const { allMinistries, ministryInfo } = useSelector(
    (state) => state.ministry
  );

  const filteredMinistries = allMinistries
    ? allMinistries.filter((ministry) =>
        ministry.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    dispatch(getMinistries());
    if (ministryInfo?.message == "Ministère supprimé") {
      setHide(false);
      dispatch(resetMessage()); // Réinitialiser le message
    }
    if (ministryInfo?.message == "Ministère modifié !") {
      setEdit(false);
      dispatch(resetMessage()); // Réinitialiser le message
    }
  }, [dispatch, ministryInfo]);

  const ministriesPerPage = 5;

  const indexOfLastMinistry = currentPage * ministriesPerPage;
  const indexOfFirstMinistry = indexOfLastMinistry - ministriesPerPage;
  const currentMinistries = filteredMinistries.slice(
    indexOfFirstMinistry,
    indexOfLastMinistry
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="flex bg-[#f9f9f9] dark:bg-[#1E293B] pb-2 text-app-dark min-h-screen">
      <div className="flex flex-col gap-2 w-full">
        <div className="bg-white dark:bg-[#27364a] text-md w-full p-2.5 flex  items-center justify-between border border-b">
          <div className="flex items-center gap-2 dark:text-[#cccccc]">
            <div className="bg-app-filter-blue rounded-lg p-1 ">
              <MdHome size={15} className="text-app-blue" />
            </div>
            <p>Dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <div className=" rounded-lg">
              <Input
                type={"text"}
                placeholder={"Tapez le nom d'un ministère..."}
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
        <div className="px-3.5 flex items-center gap-4">
          <div className="bg-white dark:bg-[#27364a] dark:text-[#cccccc] w-full p-4 rounded-lg  px-8 max-md:px-4">
            <div className="flex items-center justify-between w-full">
              <div className="w-full">
                <h4 className="font-semibold text-lg mb-4">
                  Enregistrement -- Ministères
                </h4>
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="justify-center items-center w-full">
                    <RegisterMinister />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {" "}
          <div className="container mx-auto mt-1 p-2">
            <h1 className="text-lg font-bold m-2 dark:text-[#cccccc]">
              Liste des Ministères
            </h1>
            {!allMinistries ? (
              <MinistryTableSkeleton />
            ) : (
              <div className="max-md:overflow-scroll">
                <table className="min-w-full bg-white dark:bg-[#27364a] border border-gray-200">
                  <thead>
                    <tr className="w-full bg-gray-200 dark:bg-[#27364a] text-gray-600 dark:text-[#cccccc] uppercase text-md leading-normal">
                      <th className="py-3 px-6 text-left"></th>
                      <th className="py-3 px-6 text-left">Nom Complet</th>
                      <th className="py-3 px-6 text-left">Nom abregé</th>
                      <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-[#cccccc] text-[15px] font-light">
                    {currentMinistries?.map((ministry, idx) => (
                      <tr
                        key={ministry._id}
                        className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-500"
                      >
                        <td className="py-3 px-6">{idx + 1}</td>
                        <td className="py-3 px-6 w-96">{ministry?.name}</td>
                        <td className="py-3 px-6">{ministry?.smallName}</td>

                        <td className="py-3 px-6">
                          <button
                            onClick={() => openEditModal(ministry)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 max-sm:mb-1"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => openDeleteModal(ministry)}
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
            <Suppression show={successPopup} onHide={setHide} />
            <Modification show={editPopup} onHide={setEdit} />
            {/* Info Pagination */}
            <p className="text-center text-sm text-gray-600 my-2">
              Page {currentPage} sur{" "}
              {Math.ceil(filteredMinistries.length / ministriesPerPage)} —{" "}
              {filteredMinistries.length} ministère(s) trouvé(s)
            </p>
            {/* Pagination */}
            <div className="flex justify-center mt-2 text-xs">
              {[
                ...Array(
                  Math.ceil(filteredMinistries.length / ministriesPerPage)
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
              {isEditModalOpen && selectedMinistry && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-lg p-6 max-sm:w-5/6">
                    <h2 className="text-lg font-bold mb-4">
                      Modifier le ministère
                    </h2>
                    <form
                      className="text-[15px]"
                      onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(
                          updateMinistry({
                            id: selectedMinistry._id,
                            updates: {
                              name: selectedMinistry.name,
                              smallName: selectedMinistry.smallName,
                            },
                          })
                        );
                        closeModals();
                      }}
                    >
                      <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          value={selectedMinistry.name}
                          onChange={(e) =>
                            setSelectedMinistry({
                              ...selectedMinistry,
                              name: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded text-base sm:text-sm"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">
                          Nom abrégé
                        </label>
                        <input
                          type="text"
                          value={selectedMinistry.smallName}
                          onChange={(e) =>
                            setSelectedMinistry({
                              ...selectedMinistry,
                              smallName: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded text-base sm:text-sm"
                        />
                      </div>
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
                          className="bg-app-blue text-white px-4 py-2 rounded"
                        >
                          Enregistrer
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {isDeleteModalOpen && selectedMinistry && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-lg p-6 max-sm:w-5/6 text-center">
                    <h2 className="text-lg font-bold mb-4">
                      Supprimer le ministère
                    </h2>
                    <p className="mb-4 text-[15px]">
                      Êtes-vous sûr de vouloir supprimer le ministère{" "}
                      <span className="font-semibold">
                        {selectedMinistry.name}
                      </span>{" "}
                      ?
                    </p>
                    <div className="flex justify-center gap-4 text-[15px]">
                      <button
                        onClick={() => {
                          dispatch(deleteMinistry(selectedMinistry._id));
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
      </div>
    </section>
  );
}
