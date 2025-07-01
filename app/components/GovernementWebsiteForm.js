export const GovernmentWebsiteForm = ({ formData, handleChange, handleSubmit }) => (
  <form
    onSubmit={handleSubmit}
    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
  >
    <h2 className="text-gray-700 text-lg font-bold mb-4">
      Site Web Gouvernemental
    </h2>
    <div className="grid grid-cols-2 gap-4">
      {/* Champ 1 : Avez-vous un site web Gouvernemental ? */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Avez-vous un site web Gouvernemental ? *
        </label>
        <select
          name="hasGovernmentWebsite"
          value={formData.hasGovernmentWebsite}
          onChange={handleChange}
          className="block w-full border rounded px-4 py-2"
          required
        >
          <option value="">-- Sélectionner --</option>
          <option value="oui">Oui</option>
          <option value="non">Non</option>
        </select>
      </div>

      {/* Champ 2 : Votre site est-il dans le domaine gouv.cd ? */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Votre site web est-il dans le domaine (.gouv.cd) ? *
        </label>
        <select
          name="isInGovDomain"
          value={formData.isInGovDomain}
          onChange={handleChange}
          className="block w-full border rounded px-4 py-2"
          required
        >
          <option value="">-- Sélectionner --</option>
          <option value="oui">Oui</option>
          <option value="non">Non</option>
        </select>
      </div>

      {/* Champ 3 : Entrer le lien du site */}
      <div className="col-span-2">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Entrer le lien du site *
        </label>
        <input
          type="url"
          name="websiteLink"
          value={formData.websiteLink}
          onChange={handleChange}
          className="block w-full border rounded px-4 py-2"
          placeholder="Exemple : https://www.ministere.gouv.cd"
          required
        />
      </div>
    </div>

    <button
      type="submit"
      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded mt-4"
    >
      Soumettre
    </button>
  </form>
);
