import { useEffect, useState } from "react";
import logo from "../assets/Logo.svg";
import back from "../assets/back-arrow.svg";
import search from "../assets/searchIcon.svg";
import cross from "../assets/cross.svg";
import headerbg from "../assets/Header-bg.svg";
import logout from "../assets/LogoutWhite.svg";
import axios from "axios";
import { projectEndpoints } from "../utils/apis";

import { formatDate } from "./../utils/formatDate";

const { PROJECTS_LIST_API, STATUS_UPDATE_API } = projectEndpoints;

const usePagination = (items = [], page = 1, perPage = 10) => {
  const [activePage, setActivePage] = useState(page);
  const totalPages = Math.ceil(items.length / perPage);
  const offset = perPage * (activePage - 1);
  const paginatedItems = items.slice(offset, perPage * activePage);

  return {
    activePage,
    nextPage: () => setActivePage((p) => (p < totalPages ? p + 1 : p)),
    previousPage: () => setActivePage((p) => (p > 1 ? p - 1 : p)),
    goToPage: (page) => setActivePage(page),
    totalPages,
    totalItems: items.length,
    items: paginatedItems,
  };
};

const sortData = (items = [], criterion) => {
  return [...items].sort((a, b) => {
    if (a[criterion] < b[criterion]) return -1;
    if (a[criterion] > b[criterion]) return 1;
    return 0;
  });
};

const Project_List = () => {
  const TOKEN = localStorage.getItem("token");
  const BEARER_TOKEN = JSON.parse(TOKEN);
  const [searchTerm, setSearchTerm] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sortCriterion, setSortCriterion] = useState("");
  const filteredData = response?.filter((ele) => {
    if (searchTerm === "") return true;
    return ele.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortedData = sortData(filteredData, sortCriterion);
  const {
    activePage,
    nextPage,
    previousPage,
    goToPage,
    totalPages,
    totalItems,
    items,
  } = usePagination(sortedData);

  const calculatePageNumbers = () => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, activePage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = calculatePageNumbers();

  const handleStatusUpdate = async (projectId, newStatus) => {
    try {
      const response = await axios.put(
        STATUS_UPDATE_API,
        {
          id: projectId,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );
      console.log(response);
      if (response.data.status) {
        setResponse((prevResponse) =>
          prevResponse.map((project) =>
            project.id === projectId
              ? { ...project, status: newStatus }
              : project
          )
        );
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const fetchProjectList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(PROJECTS_LIST_API, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });
      // console.log(response);
      if (!response.data) {
        throw new Error("ERROR IN PROJECT LIST");
      }
      const reversedData = response.data.reverse();
      console.log(reversedData);
      setResponse(reversedData);
      setLoading(false);
    } catch (error) {
      console.log("GET PROJECT API ERROR............", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectList();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!response) {
    return <div>Error loading data...</div>;
  }

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
            Project Listing
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

      <div className="bg-white rounded-md w-[99%]  mt-12 sm:mt-0 self-center h-full  sm:drop-shadow-[4px_2px_14px_rgba(173,216,230,0.6)]">
        <div className="flex justify-between p-2 pr-5 sm:p-5 bg-[#F3F5F7] sm:bg-inherit">
          <div className=" inline-flex items-center gap-[0.813rem] border-b border-[#979797] w-3/5 sm:w-[16.125rem] relative">
            <img
              src={search}
              alt="search"
              className="absolute top-1/2 transform -translate-y-1/2 left-2"
            />
            <input
              type="text"
              value={searchTerm}
              placeholder="Search"
              className="border-none outline-2 outline-black py-1 pr-3 pl-8 w-full h-full text-base font-normal bg-transparent"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
            <img
              src={cross}
              alt="cross"
              onClick={() => setSearchTerm("")}
              className={`absolute top-1/2 transform -translate-y-1/2 right-1 z-10 cursor-pointer ${
                searchTerm !== "" ? "flex" : "hidden"
              }`}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-x-1 w-1/5 sm:w-auto">
            <p className="text-[#A8B1B8]">Sort By:</p>
            <select
              name="heading"
              id="heading"
              value={sortCriterion}
              onChange={(e) => setSortCriterion(e.target.value)}
              className={`w-fit bg-inherit text-[#404040]`}
            >
              <option value="priority">Priority</option>
              <option value="category">Category</option>
              <option value="reason">Reason</option>
              <option value="division">Division</option>
              <option value="department">Department</option>
              <option value="location">Location</option>
            </select>
          </div>
        </div>

        <div className="w-full">
          <table className="w-full text-left border-separate border-spacing-y-2 sm:border-collapse bg-[#F3F5F7]">
            <thead className="bg-[#EBF5FF] h-10 max-[640px]:hidden">
              <tr>
                <th className="pl-4">Project Name</th>
                <th>Reason</th>
                <th className="sm:hidden">Type</th>
                <th>Division</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Department</th>
                <th>Location</th>
                <th>Status</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="max-[640px]:flex flex-col gap-y-5 ">
              {items
                .filter((ele) => {
                  {
                    /* console.log(ele) */
                  }
                  if (searchTerm === "") {
                    return ele;
                  } else if (
                    ele.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return ele;
                  }
                })
                .map((ele) => (
                  <tr
                    key={ele.id}
                    className="drop-shadow-[2px_4px_9px_rgba(173,216,230,0.6)] sm:drop-shadow-none sm:border-b text-sm h-4/5 sm:h-auto max-[640px]:flex flex-col rounded-xl bg-white relative space-y-1"
                  >
                    <td className="flex flex-col pl-4 pb-2 pt-3">
                      <p className="font-semibold text-base">{ele.name}</p>
                      <span className="flex gap-x-1">
                        <p className="text-[#747474] text-sm">
                          {formatDate(ele.startDate)}
                        </p>
                        <p className="text-[#747474] text-sm">to</p>
                        <p className="text-[#747474] text-sm">
                          {formatDate(ele.endDate)}
                        </p>
                      </span>
                    </td>
                    <td className="place-content-baseline ml-4 sm:ml-0">
                      <span className="text-[#A8B1B8] sm:hidden">Reason: </span>
                      {ele.reason}
                    </td>
                    <td className="place-content-baseline ml-4 sm:ml-0 sm:hidden">
                      <span className="text-[#A8B1B8] sm:hidden">Type: </span>
                      {ele.type}
                      <span className="text-[#A8B1B8] ml-3"> ● </span>
                      <span className="text-[#A8B1B8] sm:hidden">
                        Category:{" "}
                      </span>
                      {ele.category}
                    </td>
                    <td className="place-content-baseline ml-4 sm:ml-0">
                      <span className="text-[#A8B1B8] sm:hidden">Div: </span>
                      {ele.division}
                      <span className="text-[#A8B1B8] ml-3 sm:hidden"> ● </span>
                      <span className="text-[#A8B1B8] sm:hidden">Dept: </span>
                      {ele.department}
                    </td>
                    <td className="place-content-baseline ml-4 sm:ml-0 max-[640px]:hidden">
                      <span className="text-[#A8B1B8] sm:hidden">
                        Category:{" "}
                      </span>
                      {ele.category}
                    </td>
                    <td className="place-content-baseline ml-4 sm:ml-0 max-[640px]:hidden">
                      <span className="text-[#A8B1B8] sm:hidden">
                        Priority:{" "}
                      </span>
                      {ele.priority}
                    </td>
                    <td className="place-content-baseline ml-4 sm:ml-0 max-[640px]:hidden">
                      <span className="text-[#A8B1B8] sm:hidden">Dept: </span>
                      {ele.department}
                    </td>
                    <td className="place-content-baseline ml-4 sm:ml-0">
                      <span className="text-[#A8B1B8] sm:hidden">
                        Location:{" "}
                      </span>
                      {ele.location}
                    </td>
                    <td className="place-content-baseline ml-4 sm:ml-0 sm:hidden">
                      <span className="text-[#A8B1B8] sm:hidden">
                        Priority:{" "}
                      </span>
                      {ele.priority}
                    </td>
                    <td className="font-semibold place-content-baseline absolute sm:static right-3 top-3">
                      {ele.status}
                    </td>
                    <td className="place-content-baseline flex gap-x-5 self-center py-5 sm:hidden">
                      <button
                        onClick={() => handleStatusUpdate(ele.id, "Running")}
                        className="w-fit rounded-2xl bg-[#035FB2] px-4 py-1 text-sm font-extralight text-white"
                      >
                        Start
                      </button>

                      <button
                        onClick={() => handleStatusUpdate(ele.id, "Closed")}
                        className="w-fit rounded-2xl border border-[#035FB2] hover:bg-sky-500  hover:outline-sky-300 hover:outline-[3px] hover:outline hover:border-sky-500 hover:text-white  px-4 py-1 text-sm font-extralight text-[#035FB2]"
                      >
                        Close
                      </button>

                      <button
                        onClick={() => handleStatusUpdate(ele.id, "Cancelled")}
                        className="w-fit rounded-2xl border border-[#035FB2]  hover:bg-sky-500  hover:outline-sky-300 hover:outline-[3px] hover:outline hover:border-sky-500 hover:text-white px-4 py-1 text-sm font-extralight text-[#035FB2]"
                      >
                        Cancel
                      </button>
                    </td>
                    <td className="place-content-baseline max-[640px]:hidden ">
                      <button
                        onClick={() => handleStatusUpdate(ele.id, "Running")}
                        className="w-fit rounded-2xl bg-[#035FB2] px-4 py-1 text-sm font-extralight text-white"
                      >
                        Start
                      </button>
                    </td>
                    <td className="place-content-baseline  max-[640px]:hidden ">
                      <button
                        onClick={() => handleStatusUpdate(ele.id, "Closed")}
                        className="w-fit rounded-2xl border border-[#035FB2] hover:bg-sky-500  hover:outline-sky-300 hover:outline-[3px] hover:outline hover:border-sky-500 hover:text-white  px-4 py-1 text-sm font-extralight text-[#035FB2]"
                      >
                        Close
                      </button>
                    </td>
                    <td className="place-content-baseline  max-[640px]:hidden ">
                      <button
                        onClick={() => handleStatusUpdate(ele.id, "Cancelled")}
                        className="w-fit rounded-2xl border border-[#035FB2]  hover:bg-sky-500  hover:outline-sky-300 hover:outline-[3px] hover:outline hover:border-sky-500 hover:text-white px-4 py-1 text-sm font-extralight text-[#035FB2]"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="sm:mx-auto justify-center bg-[#F3F5F7] sm:bg-white w-full sm:w-fit py-9 flex">
          <div className="border border-[#d8dadc] rounded-sm text-sky-600 text-sm ">
            <button
              onClick={previousPage}
              disabled={activePage <= 1}
              className="border-r border-inherit p-1 font-extralight text-[12px]"
            >
              {" "}
              {`<<`}{" "}
            </button>
            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-2 py-1 ${
                  activePage === page ? "font-bold bg-sky-600 text-white" : ""
                } border-r border-inherit font-extralight`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={nextPage}
              disabled={activePage >= totalPages}
              className="p-1 font-extralight text-[12px]"
            >
              {" "}
              {`>>`}{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Project_List;
