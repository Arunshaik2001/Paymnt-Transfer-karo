import AppName from "@/components/AppName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";

export default function AppBar() {
  return (
    <>
      <div className="flex justify-between items-center px-10 pt-5 pb-5 border border-b-gray-300">
        <AppName />
        <div className="flex flex-row items-center">
          <button
            type="button"
            onClick={() => {
              signOut({
                callbackUrl: "/login",
              });
            }}
            className="shadow-lg text-venmoBlue bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 border border-dotted border-venmoBlue"
          >
            SignOut
          </button>
          <div className="w-2 ml-3">
            <FontAwesomeIcon icon={faUser} size="2x" />
          </div>
        </div>
      </div>
    </>
  );
}
