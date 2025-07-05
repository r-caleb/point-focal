"use client";
import { useEffect, useState } from "react";
import { Input } from "../components/inputs";
import Modification from "../components/popups/Modification";
import { FiMail, FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { MdCheckBox, MdOutlineCropSquare, MdOutlineDns } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { editProfil } from "@/redux/userSlice/userActions";
import { getMe } from "@/redux/authSlice/authActions";
import ModificationRefresh from "../components/popups/ModificationRefresh";

const Radio = ({ label, getChecked, checked, value }) => {
  return (
    <div
      className="flex items-center gap-1 mr-2"
      onClick={() => getChecked(value)}
    >
      {checked === value ? (
        <MdCheckBox size={32} className="text-app-blue" />
      ) : (
        <MdOutlineCropSquare size={32} className=" text-[#707070]" />
      )}
      {label}
    </div>
  );
};

export default function Profile() {
  const [input, setInput] = useState({});
  const [domain, setDomain] = useState("");
  const [errors, setError] = useState({});
  const [successPopup, setHideEdit] = useState(true);
  const dispatch = useDispatch();
  const { userUpdate, success } = useSelector((state) => state.user);
  let storageUpdate = {};

  useEffect(() => {
    setInput(
      typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("focal-user")) &&
        JSON.parse(localStorage.getItem("focal-user"))
    );
    if (userUpdate?.message == "Profil mis à jour avec succès") {
      setHideEdit(false);
    }
  }, [userUpdate]);

  if (userUpdate?.message == "Profil mis à jour avec succès") {
    storageUpdate = { ...input, ...userUpdate };
    localStorage.setItem("focal-user", JSON.stringify(storageUpdate));
  }

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
    domain: input?.domain,
  };
  console.log("domain", domain);

  console.log("i", input);

  const handleProfil = () => {
    if (!input?.domain) {
      setError({
        ...errors,
        domain: "Veuillez faire un choix (OUI/NON)",
      });
    } else if (!input?.domain && domain === "oui") {
      setError({
        ...errors,
        domain: "Veuillez remplir l'url de votre domaine",
      });
    } else {
      dispatch(editProfil({ ...dataSent }));
    }
  };
  console.log(errors);

  return (
    <div className="bg-white p-4">
      <h5 className="font-semibold text-[#6c6c6c] text-lg p-2">Mon compte</h5>
      <p className="text-[13px] p-2">
        Mettre à jour les informations de mon compte utilisateur
      </p>
      <div className="flex w-full gap-4 max-lg:flex-col  p-2">
        <Input
          Icon={<FiUser size={13} color="#707070" />}
          placeholder={"Prenom"}
          name={"firstname"}
          value={input?.firstname}
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
      <div className="flex w-full gap-4 max-lg:flex-col p-2 pb-4">
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
            onChange={(e) => setInput({ ...input, gender: e.target.value })}
            value={input?.gender}
            className={
              "w-full h-full p-2 outline-none rounded-full bg-transparent text-[15px] font-medium text-app-dark"
            }
          >
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
        </div>
      </div>
      <hr />
      <div className="flex w-full gap-4 max-lg:flex-col px-2 py-4">
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
      <div className="flex w-full gap-5 max-lg:flex-col px-2 pb-4">
        <Input
          Icon={<AiOutlineSafetyCertificate size={13} color="#707070" />}
          placeholder={"Fonction (Grade)"}
          name={"fonction"}
          value={input?.fonction}
          customClass={"w-full"}
          doOnInput={(text) => setInput({ ...input, fonction: text })}
        />
        <Input
          Icon={<FiMapPin size={13} color="#707070" />}
          placeholder={"Adresse (lieu de travail)"}
          name={"address"}
          value={input?.address}
          customClass={"w-full"}
          doOnInput={(text) => setInput({ ...input, address: text })}
        />
      </div>
      <hr />
      <div className="flex items-center text-[15px] gap-4 py-4 p-2">
        <p>Aviez-vous un nom de domaine pour votre site web ?</p>
        <Radio
          getChecked={setDomain}
          checked={domain}
          value={"oui"}
          label={"Oui"}
        />
        <Radio
          getChecked={setDomain}
          checked={domain}
          value={"non"}
          label={"Non"}
        />
        <p className="text-[13px] text-red-600">{!domain && errors?.domain}</p>
      </div>

      <div className="flex w-full gap-5 max-lg:flex-col px-2  min-h-[60px]">
        {(domain == "oui" || (domain && domain !== "non")) && (
          <div className="pb-4">
            <p>Si oui, saisissez le nom de domaine</p>
            <Input
              Icon={<MdOutlineDns size={13} color="#707070" />}
              placeholder={"Domaine (exemple: pt-numerique.gouv.cd)"}
              name={"domain"}
              value={input?.domain}
              customClass={"w-full"}
              doOnInput={(text) => setInput({ ...input, domain: text })}
              messageIfError={errors?.domain}
            />
          </div>
        )}
        <div className="w-full"> </div>
      </div>

      <hr />
      <div className="flex justify-end gap-4 py-4 max-sm:flex-wrap">
        <div className="py-2">
          <span className="text-[15px] text-center text-app-green bg-white border border-[#b8b8b8] hover:bg-app-filter-blue rounded-md px-8 py-2 cursor-pointer">
            Annuler
          </span>
        </div>
        <div className="py-2">
          <span
            className="text-[15px] text-center text-white bg-app-blue rounded-md px-8 py-2 cursor-pointer"
            onClick={handleProfil}
          >
            Enregistrer les changements
          </span>
        </div>
      </div>
      <ModificationRefresh show={successPopup} onHide={setHideEdit} />
    </div>
  );
}
