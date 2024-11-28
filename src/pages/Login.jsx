import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";
import hidepass from "../assets/hide-password.svg";
import loginbg from "../assets/loginbg.svg";
import oval from "../assets/Oval.svg";
import { endpoints } from "../utils/apis";

const { LOGIN_API } = endpoints;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passEmpty, setPassEmpty] = useState(false);
  const [invalidData, setInvalidData] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setEmailEmpty(false);
    setPassEmpty(false);
    setInvalidData(false);
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        LOGIN_API,
        { email, password },
        { withCredentials: true }
      );

      console.log(response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
      return response;
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      return error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email === "") {
      setEmailEmpty(true);
    }
    if (formData.password === "") {
      setPassEmpty(true);
      return;
    }

    const res = await login(email, password);
    console.log(res);
    if (!res.response?.data.success) {
      setInvalidData(true);
    }
  };

  return (
    <section
      className={`w-full h-screen relative md:bg-[#F3F5F7] overflow-x-hidden`}
    >
      <img
        src={loginbg}
        className="w-full h-2/5 md:h-3/5 object-cover object-left-bottom"
      />
      <img src={oval} className="hidden-bg absolute z-10 -top-5 left-16" />
      <div className="w-full md:w-[26rem] flex flex-col md:text-center md:absolute top-10 left-1/2 md:-translate-x-1/2 gap-6">
        <div className="flex flex-col items-center justify-center gap-4 absolute md:static z-20 top-28 left-24 sm:left-64">
          <img src={logo} alt="logo" />
          <p className="text-white">Online Project Management</p>
        </div>
        <div className=" bg-white rounded-md px-4 md:px-10 py-12 md:drop-shadow-[4px_2px_14px_rgba(173,216,230,0.6)]">
          <h4 className="text-[22px] text-[#3F3F3F] font-normal mb-10">
            Login to get started
          </h4>

          <form
            className="flex flex-col gap-8 relative"
            onSubmit={handleSubmit}
          >
            <label>
              <p
                className={`mb-1 text-[0.875rem]  text-left ${
                  emailEmpty ? "text-red-500" : "text-[#979797]"
                }`}
              >
                Email
              </p>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleOnChange}
                className={`w-full rounded-[0.5rem] p-[12px] border-[1px] border-[#979797] ${
                  emailEmpty
                    ? "outline-red-500 outline-1 border-red-500 border-2"
                    : "focus:outline-sky-300"
                }  text-black`}
              />
            </label>
            <p
              className={`${
                emailEmpty ? "flex" : "hidden"
              } text-[0.9rem] text-red-500 absolute top-20`}
            >
              Email is required
            </p>

            <label className="relative">
              <p
                className={`mb-1 text-[0.875rem] text-left ${
                  passEmpty ? "text-red-500" : "text-[#979797]"
                }`}
              >
                Password
              </p>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                className={`w-full rounded-[0.5rem] p-[12px] border-[1px] border-[#979797] ${
                  passEmpty
                    ? "outline-red-500 outline-1 border-red-500 border-2"
                    : "focus:outline-sky-300"
                } text-black`}
              />
              <img
                src={hidepass}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-10 z-[10] cursor-pointer"
              ></img>
            </label>
            <p
              className={`${
                passEmpty ? "flex" : "hidden"
              } text-[0.9rem] text-red-500 absolute top-48`}
            >
              Password is required
            </p>
            <p className="-mt-6 ml-auto max-w-max text-xs text-[#367CBD] font-medium cursor-pointer">
              Forgot password?
            </p>

            <p
              className={`-mt-4 text-red-400 font-medium text-sm ${
                invalidData ? "visible sm:hidden" : "invisible sm:hidden"
              }`}
            >
              Invalid credentials
            </p>

            <button
              type="submit"
              className="w-full sm:w-1/2 self-center -mt-4 md:-mt-2 rounded-[20px] bg-[#035FB2] outline-none py-[8px] px-[12px] font-medium text-white"
            >
              Login
            </button>
          </form>
        </div>
        <p
          className={`-mt-10 md:mt-0 text-red-400 self-center font-medium text-sm ${
            invalidData ? "sm:flex hidden" : "hidden"
          }`}
        >
          Invalid credentials
        </p>
      </div>
    </section>
  );
};

export default Login;
