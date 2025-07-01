import React from "react";

const Footer = () => {
  return (
    <div className="pt-1 px-8 bg-white text-[#707070] font-normal max-h-10 text-sm flex flex-col justify-center ">
      <div className="my-10 max-sm:my-4 flex justify-between ">
        <p className="max-lg:w-2/6">
          © 2023 BRAINSOFT SARL. Tous droits réservés
        </p>
        <div className="flex max-sm:flex max-sm:flex-col max-sm:text-right ">
          <p className="max-sm:my-2 md:mx-8 cursor-pointer">
            Condition d'utilisation
          </p>
          <span className=" max-sm:text-app-dark-green max-sm:text-[1px]">
            |
          </span>
          <p className="max-sm:my-2 md:mx-8 cursor-pointer">
            Politique de confidentialité
          </p>
          <span className=" max-sm:text-app-dark-green max-sm:text-[1px]">
            |
          </span>
          <p className="max-sm:my-2 md:ml-8 cursor-pointer">Mentions légales</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
