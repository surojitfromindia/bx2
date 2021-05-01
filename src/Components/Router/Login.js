import React, { useState } from "react";
import PropTypes from "prop-types";

async function login(cred) {
  return fetch("https://bill2exp.herokuapp.com/user/login", {
    method: "post",
    body: JSON.stringify(cred),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((doc) => doc)
    .catch((err) => {});
}

export default function Login({ setToken }) {
  const [user, setUser] = useState();
  const [pass, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tokenJson = await login({
      email: user,
      password: pass,
    });
    if (tokenJson?.token) setToken(tokenJson);
    else {
      alert("Either user or password is incorrect!");
    }
  };
  return (
    <div
      className={
        "flex items-center min-h-screen bg-gray-100 dark:bg-coolGray-900"
      }
    >
      <div className={"container mx-auto "}>
        <div className={"max-w-sm mx-auto my-5  dark:bg-transparent p-2"}>
          <div className={"text-center"}>
            <h1
              className={
                "my-3 text-lg font-semibold text-gray-700 dark:text-lightBlue-400 "
              }
            >
              Login to Bi(lx2)s
            </h1>
            <p className={"text-sm text-gray-600 dark:text-lightBlue-400"}>
              Enter your email and credentials
            </p>
          </div>
          <div className={"m-7"}>
            <form onSubmit={handleSubmit}>
              <div className={"mb-6"}>
                <label
                  htmlFor={"email"}
                  className={
                    "block mb-2 text-sm text-gray-600 dark:text-lightBlue-400"
                  }
                >
                  Email
                </label>
                <input
                  autoComplete={"username"}
                  id={"email"}
                  type="email"
                  className={
                    "w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-coolGray-600 dark:focus:ring-lightBlue-600 dark:focus:border-lightBlue-600"
                  }
                  required={true}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
              <div className={"mb-6"}>
                <label
                  className={
                    "block mb-2 text-sm text-gray-600 dark:text-lightBlue-400"
                  }
                  htmlFor={"password"}
                >
                  Password
                </label>
                <input
                  autoComplete={"current-password"}
                  id={"password"}
                  type="password"
                  className={
                    "w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-coolGray-600 dark:focus:ring-lightBlue-600 dark:focus:border-lightBlue-600"
                  }
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={"mb-6"}>
                <button
                  type="submit"
                  className={
                    "w-full tracking-widest px-3 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 hover:bg-indigo-700 focus:outline-none dark:hover:bg-lightBlue-800 dark:bg-lightBlue-600 dark:focus:bg-lightBlue-700"
                  }
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
