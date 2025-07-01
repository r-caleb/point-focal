"use client";
import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { HiLockClosed } from "react-icons/hi";
import { GrCheckbox, GrMail } from "react-icons/gr";
import { TbLogin2 } from "react-icons/tb";

import { Input } from "./inputs";
import Link from "next/link";
import { userLogin } from "@/redux/authSlice/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, _setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const [errors, setErrors] = useState({});
  const { token, userInfo, error } = useSelector((state) => state.auth);

  const togglePassword = () => {
    if (showPassword) _setShowPassword(false);
    else _setShowPassword(true);
  };

  const validate = () => {
    let err = {};

    if (!username) {
      err.username = "L'identifiant est obligatoire";
    }

    if (!password) {
      err.password = "Le mot de passe est obligatoire";
    }
    if (username && password) {
      dispatch(userLogin({ username, password }));
    }

    return err;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    let errs = validate();
    setErrors(errs);
    setTimeout(() => {
      if (errors || error) {
        setIsSubmitting(false);
      }
    }, 1000);
  };
  useEffect(() => {
    if (!userInfo) return;
    if (token) {
      if (userInfo?.role == "admin") {
        router.push("/dashboard");
      } else if (
        userInfo?.role == "cabinet" ||
        userInfo?.role == "secretariat"
      ) {
        router.push("/dashboard/web-apps");
      }
    }
  }, [token, dispatch]);

  return (
    <form
      onSubmit={handleSubmit}
      method="POST"
      className="flex flex-col gap-y-6"
    >
      <Input
        type={"text"}
        placeholder={"Identifiant"}
        Icon={<GrMail size={15} color="#707070" />}
        name={"email"}
        customClass={""}
        doOnInput={(text) => setUsername(text)}
        messageIfError={errors.username}
      />
      <Input
        Icon={<HiLockClosed size={15} color="#707070" />}
        type={showPassword ? "text" : "password"}
        name={"password"}
        placeholder={"Mot de passe"}
        doOnInput={(text) => setPassword(text)}
        customClass={""}
        messageIfError={errors.password}
        customElements={
          showPassword ? (
            <AiFillEyeInvisible
              size={18}
              color="#707070"
              onClick={togglePassword}
              className="cursor-pointer"
            />
          ) : (
            <AiFillEye
              size={18}
              color="#707070"
              onClick={togglePassword}
              className="cursor-pointer"
            />
          )
        }
      />
      {error ? (
        <p className="text-[12.5px] text-red-600 text-left h-2 -my-2">
          Nom d'utilisateur ou mot de passe incorrect
        </p>
      ) : (
        <p className="text-xs text-red-600 text-left h-2 -my-2"></p>
      )}
      <div className="flex justify-between max-sm:gap-20">
        <div className="flex items-center gap-2.5 max-sm:gap-1">
          <GrCheckbox color="#707070" />
          <span className="text-[13px]">Se souvenir de moi</span>
        </div>
        <Link href="/forgot-password" className=" underline text-[13px]">
          Mot de passe oublié ?
        </Link>
      </div>
      <div>
        <button
          disabled={isSubmitting && "true"}
          style={{
            width: "100%",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
          type="submit"
          className="bg-app-dark-blue text-white text-md p-2 flex justify-center items-center gap-x-1 rounded-lg"
        >
          <TbLogin2 size={20} />
          {isSubmitting ? "Patientez..." : "S'identifier"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
