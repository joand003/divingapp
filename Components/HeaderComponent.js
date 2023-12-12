"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserObject,
  setUserObject,
} from "../lib/redux/slices/userObject/userObjectSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import '../app/globals.css'

const HeaderComponent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userObject = useSelector(selectUserObject);

  useEffect(() => {
    async function fetchData() {
      const user = await axios.get("/api/getUserInfo");

      dispatch(
        setUserObject({ username: user.data.username, email: user.data.email })
      );
    }
    fetchData();
  }, []);

  const handleLogout = () => {
    axios.post("/api/logout");
    dispatch(setUserObject({ username: "", email: "" }));
    router.push("/");
  };

  return (
    <nav className="bg-gray-800 text-white lg:h-12 sm:h-9 flex justify-end items-center">
      <div className="hidden sm:block">
      {userObject.username ? (
        <span className="px-6 hidden sm:block">Welcome {userObject.username}</span>
      ) : (
        ""
      )}
      </div>
      <div className="hidden sm:block">
      <div className="px-4 hover:bg-gray-300 lg:h-12 sm:h-9 items-center flex">
        <Link className="no-underline hiddden sm:block" href="/">
          Home
        </Link>
      </div>
      </div>
      <div className="px-4 hover:bg-gray-300 lg:h-12 sm:h-9 items-center flex">
        <Link className="no-underline" href="/diveCalculator">
          Dive Calculator
        </Link>
      </div>
      <div className="px-4 hover:bg-gray-300 lg:h-12 sm:h-9 items-center flex">
        <Link className="no-underline" href="/meetTracker">
          Meet Tracker
        </Link>
      </div>

      {userObject.username ? (
        <div className="hover:bg-gray-300 h-12 items-center flex">
          <button className="hover:bg-gray-300 lg:h-12 sm:h-9 items-center flex bg-gray-800 text-white px-4 m-0 w-auto" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="px-4 hover:bg-gray-300 lg:h-12 sm:h-9 items-center flex">
          <Link className="no-underline" href="/login">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default HeaderComponent;
