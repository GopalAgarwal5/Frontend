import logout from "../assets/Logout.svg";
import project from "../assets/Project-list.svg";
import project_active from "../assets/Project-list-active.svg";
import dashboard from "../assets/Dashboard.svg";
import dashboard_active from "../assets/Dashboard-active.svg";
import create from "../assets/create-project.svg";
import create_active from "../assets/create-project-active.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const [active, setActive] = useState({
    dashboard: false,
    project: false,
    create: false,
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (path.includes("dashboard")) {
      setActive({ dashboard: true });
    } else if (path.includes("project_list")) {
      setActive({ project: true });
    } else if (path.includes("create_project")) {
      setActive({ create: true });
    }
  }, [location]);

  return (
    <div className="bg-white rounded-t-3xl sm:rounded-none sm:h-screen w-full sm:w-[4rem] flex items-center sm:flex-col pt-3 sm:py-4 relative sm:static drop-shadow-[3px_2px_14px_rgba(173,216,230,0.6)] h-full">
      <div className="flex sm:flex-col gap-x-24 sm:gap-10 sm:items-center mb-auto sm:h-2/3 sm:place-content-end  w-full ">
        <div
          className="flex flex-col-reverse sm:flex-row w-full h-9 gap-2 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <div
            className={`bg-[#025AAB] w-full sm:w-[5px] rounded-t-lg sm:rounded-r-lg h-full ${
              active.dashboard ? "visible" : "invisible"
            }`}
          ></div>
          <img
            src={active.dashboard ? dashboard_active : dashboard}
            className="w-8 px-1 mx-auto sm:ml-auto sm:mr-4"
          />
        </div>
        <div
          className="flex sm:hidden flex-col-reverse sm:flex-row w-full h-9 gap-2 cursor-pointer"
          onClick={() => navigate("/create_project")}
        >
          <div
            className={`bg-[#025AAB] w-full rounded-t-lg h-full ${
              active.create ? "visible" : "invisible"
            }`}
          ></div>
          <img
            src={active.create ? create_active : create}
            className="w-7 px-1 mx-auto "
          />
        </div>
        <div
          className="flex sm:hidden flex-col-reverse sm:flex-row w-full h-9 gap-2 cursor-pointer"
          onClick={() => navigate("/project_list")}
        >
          <div
            className={`bg-[#025AAB] w-full  rounded-t-lg h-full ${
              active.project ? "visible" : "invisible"
            }`}
          ></div>
          <img
            src={active.project ? project_active : project}
            className="w-7 px-1 self-center"
          />
        </div>
        <div
          className="hidden sm:flex w-full h-9 gap-2 cursor-pointer"
          onClick={() => navigate("/project_list")}
        >
          <div
            className={`bg-[#025AAB] w-full sm:w-[5px] rounded-t-lg sm:rounded-r-lg h-full ${
              active.project ? "flex" : "hidden"
            }`}
          ></div>
          <img
            src={active.project ? project_active : project}
            className="w-8 px-1 sm:ml-auto sm:mr-4"
          />
        </div>
        <div className="hidden sm:flex w-2/3 h-[1px] bg-[#96A1A9]"></div>
        <div
          className="hidden sm:flex w-full h-9 gap-2 cursor-pointer"
          onClick={() => navigate("/create_project")}
        >
          <div
            className={`bg-[#025AAB] w-full sm:w-[5px] rounded-t-lg sm:rounded-r-lg h-full ${
              active.create ? "flex" : "hidden"
            }`}
          ></div>
          <img
            src={active.create ? create_active : create}
            className="w-8 px-1 mx-auto sm:ml-auto sm:mr-4"
          />
        </div>
      </div>
      <div
        className="hidden sm:flex h-1/3 place-content-end mx-auto cursor-pointer"
        onClick={handleLogout}
      >
        <img src={logout} className="w-6" />
      </div>
    </div>
  );
};
export default Sidebar;
