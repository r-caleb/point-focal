"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MdHome } from "react-icons/md";
import { Input } from "../../components/inputs";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { AppForm } from "@/app/components/AppForm";
import { ApplicationList } from "@/app/components/ApplicationList";
import { addApplication, getApplications } from "@/redux/appSlice/appActions";
import SuccessPopup from "@/app/components/popups/SuccessPopup";
import { resetMessage } from "@/redux/appSlice/appSlice";
import NoApp from "@/app/components/NoApp";

export default function Apps() {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState("");
  const [applications, setApplications] = useState([]);
  const [successPopup, setHide] = useState(true);
  const [showForm, setShow] = useState(false);

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
    ministry: "",
  });

  const dispatch = useDispatch();
  const { allApps, appInfo, error } = useSelector((state) => state.app);

  useEffect(() => {
    setUser(
      typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("focal-user")) &&
        JSON.parse(localStorage.getItem("focal-user"))
    );
    dispatch(getApplications());
    if (user?.role !== "admin") {
      setSearchQuery(user?.ministry?.smallName);
    }
  }, [dispatch, appInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.ministry = user?.ministry?.smallName;
    formData.createdBy = user?.id;
    dispatch(addApplication(formData));
  };

  useEffect(() => {
    if (appInfo?.message == "Application ajoutée avec succès") {
      setHide(false);
      dispatch(resetMessage());
      setShow(false);
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
        ministry: "",
      });
    }
  }, [dispatch, appInfo]);

  const handleDelete = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  const filteredApplications = allApps?.filter(
    (app) => app.createdBy._id == user.id
  );

  return (
    <section className="flex bg-[#f9f9f9] dark:bg-[#1E293B] pb-2 text-app-dark h-screen">
      <div className="flex flex-col gap-2 w-full">
        <div className="bg-white dark:bg-[#27364a] text-sm w-full p-2.5 flex  items-center justify-between border border-b">
          <div className="flex items-center gap-2 dark:text-[#cccccc]">
            <div className="bg-app-filter-blue rounded-lg p-1">
              <MdHome size={15} className="text-app-blue" />
            </div>
            <p>Dashboard</p>
          </div>
          {user?.role == "admin" && (
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
          )}
        </div>
        {/*  <div className="px-3.5 flex items-center gap-4">
          <div className="container mx-auto px-4 py-6">
            <GovernmentWebsiteForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />  
          </div>
        </div> */}
        <div className="px-3.5 max-md:px-0 flex  gap-4 min-h-[75vh]">
          <div className="container mx-auto p-2">
            {/* Formulaire */}
            {showForm && (
              <AppForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                showForm={showForm}
                setShow={setShow}
              />
            )}
            <SuccessPopup show={successPopup} onHide={setHide} />

            {/* Liste des applications */}
            {!showForm && (
              <ApplicationList
                role={user?.role}
                applications={filteredApplications}
                apps={allApps}
                showForm={showForm}
                setShow={setShow}
              />
            )}
            {!showForm &&
              ((user?.role === "admin" && allApps?.length === 0) ||
                (user?.role !== "admin" &&
                  filteredApplications?.length === 0)) && <NoApp />}
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
}
