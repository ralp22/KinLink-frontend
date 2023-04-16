import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  let navigate = useNavigate();
  const BASE_URL = "http://localhost:8000";
  const GoToLogin = () => {
    navigate("/login");
  };

  const RegisterUser = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/`, data);
      console.log(response);
      return response;
    } catch (error) {
      console.error(error)
    }
  };
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    console.log(formValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await RegisterUser({
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      is_staff: "False",
      is_superuser: "False",
    });
    setFormValues({
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
    console.log("Registering user...");
    GoToLogin();
  };

  return (
    <div className="flex flex-wrap flex-col self-center dark:bg-black-900 dark:text-green-400">
        <form
          
          className="bg-green-600 font-bold flex flex-col p-28 rounded-xl max-w-screen-md dark:bg-primary shadow-md shadow-green-800 dark:shadow-gray-950"
          
          onSubmit={handleSubmit}
        >
        
          <div className="dark:bg-black bg-white rounded-lg p-2 m-1">

            <label className="mr-40" htmlFor="username">
              Username
            </label>

            <input
              className="dark:text-green-800 bg-gray-200 dark:bg-gray-400 placeholder:text-green-950 placeholder:text-opacity-50 rounded-lg p-1 float-right mr-4"
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="What do we call you?"
              value={formValues.username}
              required
            />

          </div>

          <div className="dark:bg-black bg-white rounded-lg p-2 m-1">

            <label className="mr-40" htmlFor="email">
              Email
            </label>

            <input
              className="dark:text-green-800 bg-gray-200 dark:bg-gray-400 placeholder:text-green-950 placeholder:text-opacity-50 rounded-lg p-1 float-right mr-4"
              onChange={handleChange}
              name="email"
              type="text"
              placeholder="What's your email?"
              value={formValues.email}
              required
            />

          </div>

          <div className="dark:bg-black bg-white rounded-lg p-2 m-1">

            <label className=" mr-40" htmlFor="username">
              Password
            </label>

            <input
              className="dark:text-green-800 bg-gray-200 dark:bg-gray-400 placeholder:text-green-950 placeholder:text-opacity-50 rounded-lg p-1 float-right mr-4"
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Select a password"
              value={formValues.password}
              required
            />

          </div>

          <div className="dark:bg-black bg-white rounded-lg p-2 m-1">

            <label className="mr-40 h-min" htmlFor="confirmpassword">
              Confirm password
            </label>

            <input
              className="dark:text-green-800 bg-gray-200 dark:bg-gray-400 placeholder:text-green-950 placeholder:text-opacity-50 rounded-lg p-1 float-right mr-4 top-0"
              onChange={handleChange}
              name="confirmpassword"
              type="password"
              placeholder="Re-enter password"
              value={formValues.confirmpassword}
              required
            />

          </div>

          <button
            className="bg-primary dark:bg-purple-950 dark:text-gray-100 text-white self-center m-8 border-2 rounded-full w-max p-4 shadow-sm shadow-green-950"
            type="submit"
            disabled={
              !formValues.username ||
              (!formValues.password &&
                formValues.confirmpassword === formValues.password)
            }
          >
            One of Us! ONE OF US!!
          </button>

        </form>

    </div>
  );
}
