import React, { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function LogInPage() {
  let { loginUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    try {
      await loginUser(username, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-max flex flex-wrap flex-col rounded-3xl self-center dark:bg-gray-90">
      <form
        className=" min-w-3xl bg-lime-500 dark:bg-gray-900 dark:text-primary border-t-sky-800 p-10 rounded-3xl font-bold text-lg tracking-widest"
        onSubmit={handleSubmit}
      >
        <div className="rounded-md border-md bg-green-700 dark:bg-gray-600 m-6 p-2">
          <label className="dark:text-green-300 text-white mr-8 float-left" htmlFor="username">Username</label>
          <input
            className="p-1 rounded-lg mr-8"
            type="text"
            name="username"
            placeholder="Your username here"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="rounded-md border-md bg-green-700 dark:bg-gray-600 m-6 p-2">
          <label className="dark:text-green-300 text-white mr-8 float-left" htmlFor="password">Password</label>
          <input
            className="p-1 rounded-lg mr-8"
            type="password"
            name="password"
            placeholder="Password here"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button
          disabled={username === "" || password === ""}
          className="m-4 w-40 shadow-sm shadow-black bg-primary text-gray-200 dark:bg-black rounded-xl p-2 text-lg hover:bg-purple-800 hover:text-gray-200 hover:cursor-pointer dark:text-green-300 dark:shadow-sm dark:shadow-gray-950 dark:hover:bg-purple-950"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
