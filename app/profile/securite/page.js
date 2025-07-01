"use client";
import { useEffect, useState } from "react";
import { Input } from "../../components/inputs";
import { HiLockClosed } from "react-icons/hi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import PasswordPopup from "../../components/PasswordPopup";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "@/redux/userSlice/userActions";
import { resetMessage } from "@/redux/userSlice/userSlice";

export default function Security() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setPassword] = useState("");
  const [confirmNewPassword, setConfirmPassword] = useState("");
  const [showPassword, _setShowPassword] = useState(false);
  const [showPassword2, _setShowPassword2] = useState(false);
  const [showPassword3, _setShowPassword3] = useState(false);
  const [errors, setError] = useState({});
  const [successPopup, setHide] = useState(true);

  const togglePassword = () => {
    if (showPassword) _setShowPassword(false);
    else _setShowPassword(true);
  };
  const togglePassword2 = () => {
    if (showPassword2) _setShowPassword2(false);
    else _setShowPassword2(true);
  };
  const togglePassword3 = () => {
    if (showPassword3) _setShowPassword3(false);
    else _setShowPassword3(true);
  };

  const dispatch = useDispatch();
  const handlePassword = (e) => {
    e.preventDefault();
    if (oldPassword && newPassword && confirmNewPassword) {
      if (newPassword !== confirmNewPassword)
        setError((prev) => {
          return { confirm: "Les mots de passe ne correspondent pas" };
        });
      if (newPassword == oldPassword) {
        setError((prev) => {
          return {
            old: "L'actuel mot de passe et le nouveau sont identiques",
          };
        });
      } else if (
        newPassword !== oldPassword &&
        newPassword === confirmNewPassword
      ) {
        dispatch(
          changePassword({ oldPassword, newPassword, confirmNewPassword })
        );
      } else {
        console.log("error");
      }
    }
  };
  const { error, userUpdate } = useSelector((state) => state.user);
  useEffect(() => {
    if (userUpdate?.message == "Mot de passe mis à jour avec succès") {
      setHide(false);
      dispatch(resetMessage());
      setOldPassword("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [userUpdate, dispatch]);

  return (
    <div>
      <div className="bg-white p-4">
        <h5 className="font-semibold text-[#6c6c6c] text-lg">
          Modifier le mot de passe
        </h5>
        <p className="text-[13px]  py-2">
          Pour changer votre mot de passe, saisissez l'ancien et le nouveau mot
          de passe dans leurs champs respectifs.
        </p>
        <div className="flex w-full gap-10 max-md:flex-col pt-4 max-md:gap-2 my-4 px-4">
          <Input
            Icon={<HiLockClosed size={15} color="#707070" />}
            type={showPassword3 ? "text" : "password"}
            name={"password"}
            value={oldPassword}
            placeholder={"Actuel mot de passe"}
            doOnInput={(text) => setOldPassword(text)}
            messageIfError={error || errors?.old}
            customClass={""}
            customElements={
              showPassword3 ? (
                <AiFillEyeInvisible
                  size={18}
                  color="#3a72b8"
                  onClick={togglePassword3}
                />
              ) : (
                <AiFillEye
                  size={18}
                  color="#3a72b8"
                  onClick={togglePassword3}
                />
              )
            }
          />
          <div className="w-full"></div>
        </div>{" "}
        <form onSubmit={handlePassword}>
          <div className="flex w-full gap-10 max-md:flex-col max-md:gap-6 my-4 px-4">
            <Input
              Icon={<HiLockClosed size={15} color="#707070" />}
              type={showPassword ? "text" : "password"}
              name={"password"}
              value={newPassword}
              placeholder={"Nouveau mot de passe"}
              doOnInput={(text) => setPassword(text)}
              customClass={""}
              messageIfError={errors?.confirm}
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
            <Input
              Icon={<HiLockClosed size={15} color="#707070" />}
              type={showPassword2 ? "text" : "password"}
              name={"password"}
              value={confirmNewPassword}
              placeholder={"Confirmer mot de passe"}
              doOnInput={(text) => setConfirmPassword(text)}
              customClass={""}
              messageIfError={errors.confirm}
              customElements={
                showPassword2 ? (
                  <AiFillEyeInvisible
                    size={18}
                    color="#3a72b8"
                    onClick={togglePassword2}
                  />
                ) : (
                  <AiFillEye
                    size={18}
                    color="#3a72b8"
                    onClick={togglePassword2}
                  />
                )
              }
            />
          </div>
          <div className="flex items-end justify-end p-4">
            <button
              type="submit"
              className={
                "rounded-md text-white text-[15px] font-medium py-2 px-10 " +
                (!oldPassword.trim() ||
                !newPassword.trim() ||
                !confirmNewPassword.trim()
                  ? "bg-app-blue opacity-30"
                  : "bg-app-blue")
              }
              disabled={
                !oldPassword.trim() ||
                !newPassword.trim() ||
                !confirmNewPassword.trim()
              }
            >
              Modifier le mot de passe
            </button>
          </div>
        </form>
        <PasswordPopup show={successPopup} onHide={setHide} />
      </div>

      {/* <div className="bg-white p-4 mt-2">
        <h5 className="font-semibold text-[#6c6c6c] text-md my-2">
          Derniers Appareils
        </h5>
        <hr />
        <table className="table-auto w-full my-4">
          <thead className="text-left border-b text-[#6c6c6c]">
            <tr>
              <th>Navigateur</th>
              <th>Appareil</th>
              <th>Localisation</th>
              <th>Activité</th>
            </tr>
          </thead>
          <tbody className="text-xs text-[#b8b8b8]">
            <tr>
              <td>Chrome sur Windows</td>
              <td>HP Spectre 360</td>
              <td>Suisse</td>
              <td>10 juin, 2023 - 20:30</td>
            </tr>
            <tr>
              <td>Chrome sur Windows</td>
              <td>HP Spectre 360</td>
              <td>Suisse</td>
              <td>10 juin, 2023 - 20:30</td>
            </tr>
            <tr>
              <td>Chrome sur Windows</td>
              <td>HP Spectre 360</td>
              <td>Suisse</td>
              <td>10 juin, 2023 - 20:30</td>
            </tr>
            <tr>
              <td>Chrome sur Windows</td>
              <td>HP Spectre 360</td>
              <td>Suisse</td>
              <td>10 juin, 2023 - 20:30</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
}
