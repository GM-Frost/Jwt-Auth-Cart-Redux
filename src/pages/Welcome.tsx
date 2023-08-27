import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../redux/service/AuthApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks/hooks";

import { setToken } from "../redux/features/AuthSlice";

interface IFormInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};

const Welcome = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showRegister, setShowRegister] = useState(false);

  const [formValue, setFormValue] = useState(initialState);
  const { firstname, lastname, email, password } = formValue;

  // REDUX STARTS

  const [
    registerUser,
    { data: registerResponse, isSuccess: registrationSuccess },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    { data: loginResponse, isSuccess: loginSuccess, isError: loginError },
  ] = useLoginUserMutation();

  //REDUX ENDS

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (showRegister) {
      if (
        formValue.firstname === "" ||
        formValue.lastname === "" ||
        formValue.email === "" ||
        formValue.password === ""
      ) {
        toast.error("Please Enter all required fields");
        return;
      } else {
        await registerUser(formValue);
      }
    }

    if (!showRegister) {
      if (formValue.email === "" || formValue.password === "") {
        toast.error("Please enter Email and Password");
        return;
      } else {
        await loginUser({ email, password });
      }
    }
  };

  useEffect(() => {
    if (registrationSuccess && registerResponse) {
      toast.success("User Registered Successfully");
      // dispatch(
      //   setUser({
      //     token: registerResponse.token,
      //   })
      // );
    }
  }, [registrationSuccess]);

  useEffect(() => {
    if (loginSuccess && loginResponse) {
      toast.success("Login Successfully");
      dispatch(
        setToken({
          token: loginResponse.token,
          userDetails: {
            firstname: loginResponse.firstname,
            lastname: loginResponse.lastname,
            email: loginResponse.email,
          },
        })
      );
      navigate("/");
    }
  }, [loginSuccess]);

  return (
    <>
      <Toaster />
      <div className="h-screen flex items-center justify-center">
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="justify-center">
            <h1 className="text-center mb-8 text-3xl">
              {!showRegister ? "Login" : "Register"}
            </h1>
            <div className="flex justify-center mb-7">
              {!showRegister
                ? "Sign in to your account"
                : "Create a new account"}
            </div>
          </div>
          {showRegister && (
            <>
              <div className="flex flex-wrap -mx-3 mb-6 ">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    First Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Jane"
                    name="firstname"
                    value={firstname}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    Last Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="Doe"
                    name="lastname"
                    value={lastname}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email"
                type="email"
                placeholder="john@example.com"
                name="email"
                value={email}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="password"
                placeholder="******************"
                name="password"
                value={password}
                onChange={handleFormChange}
              />
              <p className="text-gray-600 text-xs italic">
                Make it as long and as crazy as you'd like
              </p>
            </div>
          </div>

          {!showRegister ? (
            <>
              <div className="flex justify-center">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              <p className="mt-2 text-secondary">
                Dont have an Account?{" "}
                <span
                  onClick={() => setShowRegister(true)}
                  className="text-primary cursor-pointer"
                >
                  Register Here
                </span>
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
              <p className="mt-2 text-secondary">
                Already have Account?{" "}
                <span
                  onClick={() => setShowRegister(false)}
                  className="text-primary cursor-pointer"
                >
                  Login Here
                </span>
              </p>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Welcome;
