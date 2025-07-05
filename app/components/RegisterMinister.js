"use client";
import React, { useState, useEffect } from "react";
import { Input } from "./inputs";
import { FiSave } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import SuccessPopup from "./popups/SuccessPopup";
import { addMnistry } from "@/redux/ministrySlice/ministryActions";
import { resetMessage } from "@/redux/ministrySlice/ministrySlice";

const RegisterMinister = () => {
  const [name, setName] = useState();
  const [smallName, setSmallName] = useState();
  const dispatch = useDispatch();
  const [successPopup, setHideEdit] = useState(true);
  const [errors, setErrors] = useState({});
  const { ministryInfo, error } = useSelector((state) => state.ministry);
  const validate = () => {
    let err = {};

    if (!name) {
      err.name = "Champ obligatoire";
    }

    if (!smallName) {
      err.smallName = "Champ obligatoire";
    }
    if (name && smallName) {
      dispatch(addMnistry({ name, smallName }));
    }

    return err;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let errs = validate();
    setErrors(errs);
  };
  useEffect(() => {
    if (ministryInfo?.message == "Ministère créé avec succès") {
      setHideEdit(false);
      dispatch(resetMessage());
      setName("");
      setSmallName("");
    }
  }, [ministryInfo]);

  return (
    <form
      onSubmit={handleSubmit}
      method="POST"
      className="flex gap-8 max-sm:flex-col max-sm:gap-4 max-sm:w-full"
    >
      <Input
        type={"text"}
        placeholder={"Ministère"}
        name={"name"}
        value={name}
        customClass={""}
        doOnInput={(text) => setName(text)}
        messageIfError={errors.name}
      />
      <Input
        type={"text"}
        placeholder={"Nom Simplifié"}
        name={"name"}
        value={smallName}
        customClass={""}
        doOnInput={(text) => setSmallName(text)}
        messageIfError={errors.smallName}
      />
      <div>
        <button
          style={{
            width: "100%",
          }}
          type="submit"
          className="bg-app-blue text-white text-sm py-2 px-6 flex justify-center items-center gap-x-1 rounded-lg"
        >
          <FiSave size={17} />
          Enregitrer
        </button>
      </div>
      <SuccessPopup show={successPopup} onHide={setHideEdit} />
    </form>
  );
};

export default RegisterMinister;
