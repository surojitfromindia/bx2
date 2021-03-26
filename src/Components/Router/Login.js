import React, { useState } from "react";
import PropTypes from "prop-types";

async function login(cred) {
  return fetch("https://gl7be.sse.codesandbox.io/user/login", {
    method: "post",
    body: JSON.stringify(cred),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
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
      password: pass
    });
    if (tokenJson?.token) setToken(tokenJson);
    else {
      alert("Wrong!");
    }
  };
  return (
    <div
      className={"flex items-center min-h-screen bg-gray-50 dark:bg-gray-900"}
    >
      <div className={"container mx-auto "}>
        <div
          className={"max-w-sm mx-auto my-10 bg-white p-5 rounded-md shadow-sm"}
        >
          <div className={"text-center"}>
            <h1
              className={
                "my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200"
              }
            >
              Login to Bi(lx2)s
            </h1>
            <p className={"text-gray-600 dark:text-gray-400"}>
              Enter your email and credentials
            </p>
          </div>
          <div className={"m-7"}>
            <form onSubmit={handleSubmit}>
              <div className={"mb-6"}>
                <label
                  htmlFor={"email"}
                  className={
                    "block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  }
                >
                  Email
                </label>
                <input
                  id={"email"}
                  type="text"
                  className={
                    "w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  }
                  required={true}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
              <div className={"mb-6"}>
                <label
                  className={
                    "block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  }
                  htmlFor={"password"}
                >
                  Password
                </label>
                <input
                  id={"password"}
                  type="password"
                  className={
                    "w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  }
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={"mb-6"}>
                <button
                  type="submit"
                  className={
                    "w-full px-3 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
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
  setToken: PropTypes.func.isRequired
};
