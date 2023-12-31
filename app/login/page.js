"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleUserName = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "") {
      setUsernameError("Username is required");
    }
    if (password === "") {
      setPasswordError("Password is required");
    }

    if (username && password) {
      try {
        await axios.post("/api/login", { username, password });
        router.push("/");
      } catch (err) {
        setPasswordError(err.response.data.error)
      }
    }
  };

  return (
    <div className="flex flex-col center-text items-center pt-10">
      <h1 className="pb-3">Login</h1>
      <form>
        <div className="flex flex-row align-middle items-center pb-3">
          <label  className="pr-2" htmlFor="username">Username: </label>
          <input
            className="registrationInput"
            type="text"
            id="username"
            name="username"
            onChange={handleUserName}
          />
          <p>{usernameError}</p>
        </div>
        <div className="flex flex-row align-middle items-center">
          <label className="pr-3" htmlFor="password">Password: </label>
          <input
            className="registrationInput"
            type="password"
            id="password"
            name="password"
            onChange={handlePassword}
          />
         
        </div>
        <p className="pl-2 text-red-700 text-center pt-2">{passwordError}</p>
        <div className="flex justify-center py-3">
        <button className="bg-gray-500" type="submit" onClick={handleSubmit}>
          Login
        </button>
        </div>
      </form>
      <p>
        Not registered? <Link className="underline text-purple-500" href="/signup">Signup</Link>
      </p>
      <p>Forgot <Link className="underline text-purple-500" href="/forgot/username">username</Link> or <Link className="underline text-purple-500" href="/forgot/password">password</Link>?</p>
    </div>
  );
}
