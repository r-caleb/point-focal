import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Suppression from "./popups/Suppression";
import {
  deleteApplication,
  updateApplication,
} from "@/redux/appSlice/appActions";
import Modification from "./popups/Modification";
import { resetMessage } from "@/redux/appSlice/appSlice";
import AppTableSkeleton from "./skeletons/AppTableSkeleton";

export const ApplicationList = ({
  applications,
  apps,
  showForm,
  setShow,
  role,
}) => {
  const [selectedApp, setSelectedApp] = useState(null); // Application sélectionnée
  const [popupType, setPopupType] = useState(""); // Type de popup ("details", "edit", "delete")
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    description: "",
    registry: "",
    developmentService: "",
    financingSource: "",
    partnerName: "",
    usageContext: "",
    maintenanceService: "",
  });
  const [successPopup, setHide] = useState(true);
  const [editPopup, setEdit] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const { appInfo, error } = useSelector((state) => state.app);
  useEffect(() => {
    if (appInfo?.message == "Application supprimée avec succès") {
      setHide(false);
      dispatch(resetMessage()); // Réinitialiser le message
    }
    if (appInfo?.message == "Application modifiée avec succès") {
      setEdit(false);
      dispatch(resetMessage()); // Réinitialiser le message
    }
  }, [dispatch, appInfo]);
  const listApps = role == "admin" ? apps : applications;

  // Fermer le popup
  const closePopup = () => {
    setSelectedApp(null);
    setPopupType("");
    setFormData({
      type: "",
      name: "",
      description: "",
      registry: "",
      developmentService: "",
      financingSource: "",
      partnerName: "",
      usageContext: "",
      maintenanceService: "",
    });
  };

  const handleDetails = (app) => {
    setSelectedApp(app);
    setPopupType("details");
  };

  const handleEdit = (app) => {
    setSelectedApp(app);
    setFormData({
      type: app.type,
      name: app.name,
      description: app.description,
      registry: app.registry,
      developmentService: app.developmentService,
      financingSource: app.financingSource,
      partnerName: app.partnerName,
      usageContext: app.usageContext,
      maintenanceService: app.maintenanceService,
    });
    setPopupType("edit");
  };

  const handleDeleteConfirmation = (app) => {
    setSelectedApp(app);
    setPopupType("delete");
  };
  const handleDelete = (id) => {
    dispatch(deleteApplication(id));
    closePopup();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateApplication({ id: selectedApp._id, updates: formData }));
    closePopup();
  };

  const safeListApps = Array.isArray(listApps) ? listApps : [];
  const appsPerPage = 5;

  const indexOfLastApp = currentPage * appsPerPage;
  const indexOfFirstApp = indexOfLastApp - appsPerPage;
  const currentApps = safeListApps.slice(indexOfFirstApp, indexOfLastApp);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-lg font-bold mb-4">Liste des applications</h2>{" "}
        {!showForm && (
          <p
            onClick={() => setShow(true)}
            className="text-app-dark-blue border-2 border-app-dark-blue hover:bg-app-filter-blue px-2 p-1 rounded-md cursor-pointer text-md max-md:w-2/3"
          >
            + Ajouter une application
          </p>
        )}
      </div>
      {!apps || !applications ? (
        <AppTableSkeleton />
      ) : (
        <div className="max-md:overflow-scroll">
          <table className="min-w-full bg-white border">
            <thead className=" text-md">
              <tr>
                <th className="border px-4 py-2">NOM</th>
                <th className="border px-4 py-2">TYPE</th>
                <th className="border px-4 py-2">MINISTERE</th>
                <th className="border px-4 py-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-[15px]">
              {currentApps?.map((app) => (
                <tr key={app._id}>
                  <td className="border px-4 py-2">{app.name}</td>
                  <td className="border px-4 py-2">{app.type}</td>
                  <td className="border px-4 py-2">{app.ministry.smallName}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDetails(app)}
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2 max-sm:mb-1"
                    >
                      Détails
                    </button>
                    <button
                      onClick={() => handleEdit(app)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 max-sm:mb-1"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(app)}
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
      <p className="text-center text-xs text-gray-600 my-2">
        Page {currentPage} sur {Math.ceil(safeListApps.length / appsPerPage)} —{" "}
        {safeListApps.length} application(s) trouvée(s)
      </p>
      {/* Pagination */}
      <div className="flex justify-center mt-2 text-xs">
        {[...Array(Math.ceil(safeListApps.length / appsPerPage)).keys()].map(
          (number) => (
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
          )
        )}
      </div>
      <Suppression show={successPopup} onHide={setHide} />
      <Modification show={editPopup} onHide={setEdit} />

      {/* Popup Détails */}
      {popupType === "details" && selectedApp && (
        <div className="fixed inset-0 bg-black z-50 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md max-sm:w-5/6">
            <h2 className="text-lg font-bold text-app-blue mb-4">
              Détails de l'application
            </h2>
            <div className="text-[15px] flex flex-col gap-2">
              <p>
                <strong>Nom :</strong> {selectedApp.name}
              </p>
              <p>
                <strong>Type :</strong> {selectedApp.type}
              </p>
              <p>
                <strong>Ministère :</strong> {selectedApp.ministry.smallName}
              </p>
              <p>
                <strong>Description :</strong> {selectedApp.description}
              </p>
              <p>
                <strong>Registre d'utilisation :</strong> {selectedApp.registry}
              </p>
              <p>
                <strong>Service de Développement :</strong>{" "}
                {selectedApp.developmentService}
              </p>
              <p>
                <strong>Source de Financement :</strong>{" "}
                {selectedApp.financingSource}
              </p>
              {selectedApp?.partnerName && (
                <p>
                  <strong>Partenaire :</strong> {selectedApp.partnerName}
                </p>
              )}
              <p>
                <strong>Cadre d'utilisation :</strong>{" "}
                {selectedApp.usageContext}
              </p>
              <p>
                <strong>Service de maintenance :</strong>{" "}
                {selectedApp.maintenanceService}
              </p>
              {role === "admin" && (
                <p>
                  <strong>Enregistré par :</strong>{" "}
                  {selectedApp.createdBy
                    ? `${selectedApp.createdBy.lastname} ${selectedApp.createdBy.middlename} ${selectedApp.createdBy.firstname}`
                    : "Non precisé"}
                </p>
              )}
              <button
                onClick={closePopup}
                className="mt-4 w-1/4 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Modifier */}
      {popupType === "edit" && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-3/4 overflow-y-auto max-h-[90vh] max-sm:w-5/6">
            <h2 className="text-lg text-app-blue font-bold mb-4">
              Modifier l'application
            </h2>
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-[15px]"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Champ 1 : Type d'application */}
                <div className="max-md:flex max-md:flex-col max-md:justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Type d'application *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="block w-full border rounded text-base sm:text-smpx-4 py-2"
                    required
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="Application web">Application Web</option>
                    <option value="Application mobile">
                      Application Mobile
                    </option>
                    <option value="Application de bureau">
                      Application de bureau
                    </option>
                  </select>
                </div>

                {/* Champ 2 : Nom / Lien de l'application */}
                <div className="max-md:flex max-md:flex-col max-md:justify-between">
                  <label className="block text-gray-700 text-md font-bold mb-2">
                    Nom ou Lien de l'application *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full border rounded text-base sm:text-smpx-4 py-2"
                    placeholder="Exemple : www.exemple.com"
                    required
                  />
                </div>

                {/* Champ 3 : Description */}
                <div className="col-span-2 max-md:flex max-md:flex-col max-md:justify-between">
                  <label className="block text-gray-700 text-md font-bold mb-2">
                    Description de l'application *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full border rounded text-base sm:text-smpx-4 py-2"
                    placeholder="Donnez une description détaillée de l'application"
                    rows="2"
                    required
                  ></textarea>
                </div>

                {/* Champ 4 : Registre */}
                <div className="max-md:flex max-md:flex-col max-md:justify-between">
                  <label className="block text-gray-700 text-md font-bold mb-2">
                    Dans quel registre l'app est utilisée ?
                  </label>
                  <input
                    type="text"
                    name="registry"
                    value={formData.registry}
                    onChange={handleChange}
                    className="block w-full border rounded text-base sm:text-smpx-4 py-2"
                    placeholder="Exemple : Gestion des ressources humaines"
                  />
                </div>

                {/* Champ 5 : Service ayant développé l'application */}
                <div className="max-md:flex max-md:flex-col max-md:justify-between">
                  <label className="block text-gray-700 text-md font-bold mb-2">
                    Service ayant Développé l'application *
                  </label>
                  <select
                    name="developmentService"
                    value={formData.developmentService}
                    onChange={handleChange}
                    className="block w-full border rounded text-base sm:text-smpx-4 py-2"
                    required
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="Interne">Interne</option>
                    <option value="Prestataire externe">
                      Prestataire externe
                    </option>
                  </select>
                </div>

                {/* Champ 6 : Source de Financement */}
                <div className="max-md:flex max-md:flex-col max-md:justify-between">
                  <label className="block text-gray-700 text-md font-bold mb-2">
                    Source de Financement *
                  </label>
                  <select
                    name="financingSource"
                    value={formData.financingSource}
                    onChange={handleChange}
                    className="block w-full border rounded text-base sm:text-smpx-4 py-2"
                    required
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="Budget interne">Budget Interne</option>
                    <option value="Partenaire">Partenaire</option>
                    <option value="Subvention">Subvention</option>
                  </select>
                </div>

                {/* Champ 7 : Précisez le nom du partenaire */}
                <div className="max-md:flex max-md:flex-col max-md:justify-between">
                  <label className="block text-gray-700 text-md font-bold mb-2">
                    Précisez le nom du partenaire
                  </label>
                  <input
                    type="text"
                    name="partnerName"
                    value={formData.partnerName}
                    onChange={handleChange}
                    className="block w-full border rounded text-base sm:text-smpx-4 py-2"
                    placeholder="Exemple : Banque Mondiale"
                  />
                </div>

                {/* Champ 8 : Cadre d'utilisation */}
                <div className="max-md:flex max-md:flex-col max-md:justify-between">
                  <label className="block text-gray-700 text-md font-bold mb-2">
                    Cadre d'utilisation *
                  </label>
                  <select
                    name="usageContext"
                    value={formData.usageContext}
                    onChange={handleChange}
                    className="block w-full border rounded text-base sm:text-smpx-4 py-2"
                    required
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="Public">Public</option>
                    <option value="Cabinet">Cabinet</option>
                    <option value="Secretariat">Secrétariat Général</option>
                  </select>
                </div>

                {/* Champ 9 : Service assurant la maintenance */}
                <div className="max-md:flex max-md:flex-col max-md:justify-between">
                  <label className="block text-gray-700 text-md font-bold mb-2">
                    Service assurant la maintenance *
                  </label>
                  <select
                    name="maintenanceService"
                    value={formData.maintenanceService}
                    onChange={handleChange}
                    className="block w-full border rounded text-base sm:text-smpx-4 py-2"
                    required
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="Interne">Interne</option>
                    <option value="Prestataire externe">
                      Prestataire externe
                    </option>
                  </select>
                </div>

                <div className="col-span-2 text-right mt-4">
                  <button
                    onClick={closePopup}
                    className="mt-4 mr-4 bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Fermer
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Popup Supprimer */}
      {popupType === "delete" && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm max-sm:w-5/6">
            <h2 className="text-lg font-bold mb-4">Confirmer la suppression</h2>
            <p className="text-md">
              Êtes-vous sûr de vouloir supprimer{" "}
              <strong>{selectedApp.name}</strong> ?
            </p>
            <div className="mt-4 flex justify-end gap-2 text-sm">
              <button
                onClick={() => handleDelete(selectedApp._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Supprimer
              </button>
              <button
                onClick={closePopup}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
