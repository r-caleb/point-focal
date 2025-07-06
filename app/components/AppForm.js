export const AppForm = ({
  formData,
  handleChange,
  handleSubmit,
  showForm,
  setShow,
}) => (
  <form
    onSubmit={handleSubmit}
    className="bg-white shadow-md rounded px-8 max-md:px-2 pt-6 pb-8 mb-4 text-[15px]"
  >
    <div className="grid grid-cols-2 gap-4">
      {/* Champ 1 : Type d'application */}
      <div className="max-md:flex max-md:flex-col max-md:justify-between">
        <label className="block text-gray-700 text-[15px] font-bold mb-2">
          Type d'application *
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="block w-full border rounded text-base sm:text-sm px-4 py-2"
          required
        >
          <option value="">-- Sélectionner --</option>
          <option value="Application web">Application Web</option>
          <option value="Application mobile">Application Mobile</option>
          <option value="Application de bureau">Application de bureau</option>
        </select>
      </div>

      {/* Champ 2 : Nom / Lien de l'application */}
      <div className="max-md:flex max-md:flex-col max-md:justify-between">
        <label className="block text-gray-700 text-[15px] font-bold mb-2">
          Nom ou Lien de l'application *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full border rounded text-base sm:text-sm px-4 py-2"
          placeholder="Exemple : www.exemple.com"
          required
        />
      </div>

      {/* Champ 3 : Description */}
      <div className="col-span-2">
        <label className="block text-gray-700 text-[15px] font-bold mb-2">
          Description de l'application *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="block w-full border rounded text-base sm:text-sm px-4 py-2"
          placeholder="Donnez une description détaillée de l'application"
          rows="3"
          required
        ></textarea>
      </div>

      {/* Champ 4 : Registre */}
      <div className="max-md:flex max-md:flex-col max-md:justify-between">
        <label className="block text-gray-700 text-[15px] font-bold mb-2">
          Dans quel registre l'app est utilisée ?
        </label>
        <input
          type="text"
          name="registry"
          value={formData.registry}
          onChange={handleChange}
          className="block w-full border rounded text-base sm:text-sm px-4 py-2"
          placeholder="Exemple : Gestion des ressources humaines"
        />
      </div>

      {/* Champ 5 : Service ayant développé l'application */}
      <div className="max-md:flex max-md:flex-col max-md:justify-between">
        <label className="block text-gray-700 text-[15px] font-bold mb-2">
          Service ayant Développé l'application *
        </label>
        <select
          name="developmentService"
          value={formData.developmentService}
          onChange={handleChange}
          className="block w-full border rounded text-base sm:text-sm px-4 py-2"
          required
        >
          <option value="">-- Sélectionner --</option>
          <option value="Interne">Interne</option>
          <option value="Prestataire externe">Prestataire externe</option>
        </select>
      </div>

      {/* Champ 6 : Source de Financement */}
      <div className="max-md:flex max-md:flex-col max-md:justify-between">
        <label className="block text-gray-700 text-[15px] font-bold mb-2">
          Source de Financement *
        </label>
        <select
          name="financingSource"
          value={formData.financingSource}
          onChange={handleChange}
          className="block w-full border rounded text-base sm:text-sm px-4 py-2"
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
        <label className="block text-gray-700 text-[15px] font-bold mb-2">
          Précisez le nom du partenaire
        </label>
        <input
          type="text"
          name="partnerName"
          value={formData.partnerName}
          onChange={handleChange}
          className="block w-full border rounded text-base sm:text-sm px-4 py-2"
          placeholder="Exemple : Banque Mondiale"
        />
      </div>

      {/* Champ 8 : Cadre d'utilisation */}
      <div className="max-md:flex max-md:flex-col max-md:justify-between">
        <label className="block text-gray-700 text-[15px] font-bold mb-2">
          Cadre d'utilisation *
        </label>
        <select
          name="usageContext"
          value={formData.usageContext}
          onChange={handleChange}
          className="block w-full border rounded text-base sm:text-sm px-4 py-2"
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
        <label className="block text-gray-700 text-[15px] font-bold mb-2">
          Service assurant la maintenance *
        </label>
        <select
          name="maintenanceService"
          value={formData.maintenanceService}
          onChange={handleChange}
          className="block w-full border rounded text-base sm:text-sm px-4 py-2"
          required
        >
          <option value="">-- Sélectionner --</option>
          <option value="Interne">Interne</option>
          <option value="Prestataire externe">Prestataire externe</option>
        </select>
      </div>
    </div>
    <div className="flex gap-2">
      <button
        type="submit"
        className="bg-app-blue hover:bg-app-dark-blue text-white px-6 py-2 rounded mt-4"
      >
        Soumettre
      </button>{" "}
      {showForm && (
        <p
          onClick={() => setShow(false)}
          className="text-app-dark-blue border-2 border-app-dark-blue hover:bg-app-filter-blue px-6 py-2 mt-4 rounded-md cursor-pointer"
        >
          Voir la liste
        </p>
      )}
    </div>
  </form>
);
