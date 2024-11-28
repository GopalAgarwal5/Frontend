import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
 
  return (
    <section className="flex flex-col-reverse sm:flex-row bg-[#F3F5F7] h-screen w-full">
      <div>

        <Sidebar />
      </div>

      <div className="header h-full w-full relative overflow-x-hidden">
        
        <Outlet />
      </div>
    </section>
  );
};
export default Dashboard;
