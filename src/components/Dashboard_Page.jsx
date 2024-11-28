import logo from "../assets/Logo.svg";
import logout from "../assets/LogoutWhite.svg";
import Counter_Card from "../components/Counter_Card";
import Project_Chart from "./Project_Chart";
import Pie_Chart from "./Pie_Chart";
import axios from "axios";
import { dashboardEndpoints } from "../utils/apis";
import { useEffect, useState } from "react";
import headerbg from "../assets/Header-bg.svg";
import { useNavigate } from "react-router-dom";

const { COUNTERS_API } = dashboardEndpoints;

const Dashboard_Page = () => {
  const TOKEN = localStorage.getItem("token");
  const BEARER_TOKEN = JSON.parse(TOKEN);
  const navigate = useNavigate();

  const [cardData, setCardData] = useState({
    totalProjects: 0,
    closed: 0,
    running: 0,
    cancelled: 0,
    closureDelay: 0,
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const response = await axios.get(COUNTERS_API, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });

        console.log(response);
        setCardData(response.data);
      } catch (error) {
        if (error.code === "ERR_BAD_REQUEST") {
          localStorage.clear();
          navigate("/");
        }
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchCounters();
  }, []);

  return (
    <div className="w-full flex flex-col p-3 ">
      <div className="flex w-full items-center p-7 absolute sm:static -top-5 z-30">
        <img
          src={headerbg}
          className="absolute sm:hidden top-5 left-0 -translate-x-3 w-full "
        />
        <h2 className="w-1/2 text-white text-2xl font-semibold z-50">
          Dashboard
        </h2>
        <img src={logo} className="w-16 flex max-sm:hidden" />
        <div
          className="flex sm:hidden ml-auto cursor-pointer z-50"
          onClick={handleLogout}
        >
          <img src={logout} className="w-6 " />
        </div>
      </div>

      <div className=" w-full gap-x-4 sm:gap-x-0 sm:gap-y-8 flex mt-16 sm:mt-1  sm:flex-wrap justify-around overflow-x-scroll hidden-scroll">
        <Counter_Card title="Total Projects" count={cardData.totalProjects} />
        <Counter_Card title="Closed" count={cardData.closed} />
        <Counter_Card title="Running" count={cardData.running} />
        <Counter_Card title="Closure Delay" count={cardData.closureDelay} />
        <Counter_Card title="Cancelled" count={cardData.cancelled} />
      </div>
      <div className="w-full flex flex-row ">
        <div className="mt-4 sm:mt-8 md:w-1/2 flex flex-col gap-y-3">
          <p className="font-medium sm:font-bold">
            Department wise - Total Vs Closed
          </p>
          <div className="w-full h-full drop-shadow-[3px_2px_14px_rgba(173,216,230,0.6)] sm:drop-shadow-[2px_12px_10px_rgba(0,0,0,0.2)]">
            <Project_Chart />
          </div>
        </div>
        <div className="mt-4 sm:mt-8 md:w-1/2 flex flex-col gap-y-3">
          <p className="font-medium sm:font-bold">Department wise - Total</p>
          <div className="w-full h-full drop-shadow-[3px_2px_14px_rgba(173,216,230,0.6)] sm:drop-shadow-[2px_12px_10px_rgba(0,0,0,0.2)]">
            <Pie_Chart />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard_Page;
