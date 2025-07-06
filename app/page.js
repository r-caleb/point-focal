import { AiOutlineLoading3Quarters } from "react-icons/ai";
import LoginForm from "./components/LoginForm";

export default function Home() {
  return (
    <div>
      <main className="flex w-screen h-screen">
        <div
          className="w-2/5 bg-no-repeat bg-cover bg-bottom max-sm:hidden"
          style={divStyle}
        ></div>
        <div className="flex flex-col items-center justify-center w-3/5 max-sm:w-full max-sm:overflow-hidden">
          <AiOutlineLoading3Quarters
            className="text-app-dark-blue mb-3"
            size={20}
          />
          <div className="text-center mb-6">
            <h1 className={"font-semibold text-3xl mb-2"}>Connectez-vous</h1>
            <p className="font-medium text-md">
              Bienvenue, veuillez vous connecter
            </p>
          </div>
          <div className="justify-center items-center">
            <LoginForm />
          </div>
        </div>
      </main>
    </div>
  );
}

const divStyle = {
  backgroundImage: `url(/images/bg_left_xr.jpg)`,
};
