import { useState } from "react";
import logo from "../assets/Logo.svg";
import back from "../assets/back-arrow.svg";
import headerbg from "../assets/Header-bg.svg";
import axios from "axios";
import { projectEndpoints } from "../utils/apis";
import { useNavigate } from "react-router-dom";
import logout from "../assets/LogoutWhite.svg";

const { PROJECT_SAVE_API } = projectEndpoints;
const Create_Project = () => {
  const navigate = useNavigate();

  const TOKEN = localStorage.getItem("token");
  const BEARER_TOKEN = JSON.parse(TOKEN);
  const [emptyData, setEmptyData] = useState({
    name: false,
    smallEndDate: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    reason: "Business",
    type: "Internal",
    division: "Filters",
    category: "Quality A",
    priority: "High",
    department: "Strategy",
    startDate: "",
    endDate: "",
    location: "Pune",
    status: "Registered",
  });

  const {
    name,
    reason,
    type,
    division,
    category,
    priority,
    department,
    startDate,
    endDate,
    location,
    status,
  } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setEmptyData({
      name: false,
      smallEndDate: false,
    });
  };

  const createProject = async (
    name,
    reason,
    type,
    division,
    category,
    priority,
    department,
    startDate,
    endDate,
    location,
    status
  ) => {
    try {
      const response = await axios.post(
        PROJECT_SAVE_API,
        {
          name,
          reason,
          type,
          division,
          category,
          priority,
          department,
          startDate,
          endDate,
          location,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );
      console.log(response);
      if (!response) {
        throw new Error("**********this is error");
      }
      navigate("/project_list");
    } catch (error) {
      console.log("CREATE COURSE API ERROR............", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.name === "") {
      setEmptyData((prev) => ({ ...prev, name: true }));
    }
    if (
      formData.startDate >= formData.endDate ||
      formData.startDate === "" ||
      formData.endDate === ""
    ) {
      setEmptyData((prev) => ({ ...prev, smallEndDate: true }));
      return;
    }

    createProject(
      name,
      reason,
      type,
      division,
      category,
      priority,
      department,
      startDate,
      endDate,
      location,
      status
    );
  };

  return (
    <div className="w-full flex flex-col p-3">
      <div className="flex w-full items-center p-5 sm:p-7 fixed sm:static -top-3 z-50">
        <img
          src={headerbg}
          className="absolute sm:hidden top-3 left-0 -translate-x-3 w-full "
        />
        <div className="w-1/2 flex gap-x-6 items-center z-50">
          <img src={back} className="w-2" />
          <h2 className=" text-white text-base sm:text-xl font-semibold">
            Create Project
          </h2>
        </div>
        <img src={logo} className="w-16 flex max-sm:hidden" />
        <div
          className="flex sm:hidden ml-auto cursor-pointer z-50"
          onClick={handleLogout}
        >
          <img src={logout} className="w-6 " />
        </div>
      </div>

      <div className="bg-white rounded-md w-[99%] mt-16 sm:mt-0 self-center sm:h-screen p-5 drop-shadow-[4px_2px_14px_rgba(173,216,230,0.6)]">
        <form
          className="flex flex-col gap-y-9 sm:gap-y-16"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-y-3 sm:flex-row justify-between w-full">
            <input
              type="text"
              name="name"
              placeholder="Enter Project name"
              value={name}
              onChange={handleOnChange}
              className={`relative w-full sm:w-3/5 h-16 rounded-md px-3 py-2 border-[1px] border-[#979797] ${
                emptyData.name
                  ? "outline-red-400 outline-2 border-red-400 border-[2px]"
                  : "focus:outline-sky-300"
              }  text-[#404040]`}
            />
            <p
              className={`${
                emptyData.name ? "flex" : "hidden"
              } text-[0.9rem] text-red-400 absolute top-24`}
            >
              Project name required
            </p>

            <button
              type="submit"
              className="hidden sm:flex w-fit h-fit rounded-[20px] bg-[#035FB2] py-2 px-10 font-normal text-white"
            >
              Save Project
            </button>
          </div>

          <div className="flex flex-col w-full sm:grid grid-cols-3 gap-x-12 gap-y-6 sm:w-5/6">
            {/* Reason  */}
            <label className="max-w-[350px]">
              <p className={`mb-1 text-[0.875rem]  text-left text-[#979797]`}>
                Reason
              </p>
              <select
                name="reason"
                id="reason"
                // value={"Business"}
                onChange={handleOnChange}
                className={`w-full rounded-md p-4 border-[1px] border-[#979797] text-[#404040] focus:outline-sky-300`}
              >
                <option value="Business">For Business</option>
                <option value="Personal">For Personal</option>
                <option value="Dealership">For Dealership</option>
                <option value="Transport">For Transport</option>
              </select>
            </label>
            {/* Type  */}
            <label className="max-w-[350px]">
              <p className={`mb-1 text-[0.875rem]  text-left text-[#979797]`}>
                Type
              </p>
              <select
                name="type"
                id="type"
                // value={email}
                onChange={handleOnChange}
                className={`w-full rounded-md p-4 border-[1px] border-[#979797] text-[#404040] focus:outline-sky-300`}
              >
                <option value="Internal">Internal</option>
                <option value="External">External</option>
                <option value="Vendor">Vendor</option>
              </select>
            </label>
            {/* Division  */}
            <label className="max-w-[350px]">
              <p className={`mb-1 text-[0.875rem]  text-left text-[#979797]`}>
                Division
              </p>
              <select
                name="division"
                id="division"
                // value={email}
                onChange={handleOnChange}
                className={`w-full rounded-md p-4 border-[1px] border-[#979797] text-[#404040] focus:outline-sky-300`}
              >
                <option value="Filters">Filters</option>
                <option value="Compressor">Compressor</option>
                <option value="Pumps">Pumps</option>
                <option value="Glass">Glass</option>
              </select>
            </label>
            {/* Category  */}
            <label className="max-w-[350px]">
              <p className={`mb-1 text-[0.875rem]  text-left text-[#979797]`}>
                Category
              </p>
              <select
                name="category"
                id="category"
                // value={email}
                onChange={handleOnChange}
                className={`w-full rounded-md p-4 border-[1px] border-[#979797] text-[#404040] focus:outline-sky-300`}
              >
                <option value="Quality A">Quality A</option>
                <option value="Quality B">Quality B</option>
                <option value="Quality C">Quality C</option>
                <option value="Quality D">Quality D</option>
              </select>
            </label>
            {/* Priority  */}
            <label className="max-w-[350px]">
              <p className={`mb-1 text-[0.875rem]  text-left text-[#979797]`}>
                Priority
              </p>
              <select
                name="priority"
                id="priority"
                // value={email}
                onChange={handleOnChange}
                className={`w-full rounded-md p-4 border-[1px] border-[#979797] text-[#404040] focus:outline-sky-300`}
              >
                <option value="High" className="">
                  High
                </option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </label>
            {/* Department  */}
            <label className="max-w-[350px]">
              <p className={`mb-1 text-[0.875rem]  text-left text-[#979797]`}>
                Department
              </p>
              <select
                name="department"
                id="department"
                // value={email}
                onChange={handleOnChange}
                className={`w-full rounded-md p-4 border-[1px] border-[#979797] text-[#404040] focus:outline-sky-300`}
              >
                <option value="Strategy">Strategy</option>
                <option value="Finance">Finance</option>
                <option value="Quality">Quality</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Stores">Stores</option>
                <option value="HR">Human Resource</option>
              </select>
            </label>
            {/* start date  */}
            <label className="max-w-[350px]">
              <p className={`mb-1 text-[0.875rem]  text-left text-[#979797]`}>
                Start Date as per Project Plan
              </p>
              <input
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                name="startDate"
                id="startDate"
                placeholder="D Month, Yr"
                // value={email}
                onChange={handleOnChange}
                className={`w-full rounded-md p-[0.9rem] border-[1px] border-[#979797] text-[#404040] focus:outline-sky-300`}
              ></input>
            </label>
            {/* end date  */}
            <label className="max-w-[350px] relative">
              <p className={`mb-1 text-[0.875rem]  text-left text-[#979797]`}>
                End Date as per Project Plan
              </p>
              <input
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                name="endDate"
                id="endDate"
                placeholder="D Month, Yr"
                // value={email}
                onChange={handleOnChange}
                className={`w-full rounded-md p-[0.9rem] border-[1px] border-[#979797] text-[#404040] ${
                  emptyData.smallEndDate
                    ? "outline-red-400 outline-2 text-red-500 active"
                    : "focus:outline-sky-300"
                }`}
              ></input>
              <p
                className={`${
                  emptyData.smallEndDate ? "flex" : "hidden"
                } text-[0.9rem] text-red-500 absolute top-20 mt-1`}
              >
                End date is smaller than the start date
              </p>
            </label>
            {/* Location  */}
            <label className="max-w-[350px]">
              <p className={`mb-1 text-[0.875rem]  text-left text-[#979797]`}>
                Location
              </p>
              <select
                name="location"
                id="location"
                // value={email}
                onChange={handleOnChange}
                className={`w-full rounded-md p-4 border-[1px] border-[#979797] text-[#404040] focus:outline-sky-300`}
              >
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </select>
            </label>

            <div className=" text-[#898989] row-span-3 col-start-3 text-sm">
              Status:{" "}
              <span className="font-semibold text-black text-base">
                Registered
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="flex sm:hidden w-full h-fit rounded-[20px] bg-[#035FB2] py-2 px-24 font-normal text-white"
          >
            Save Project
          </button>
        </form>
      </div>
    </div>
  );
};
export default Create_Project;
