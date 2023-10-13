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
    <nav className="">
      {userObject.username ? (
        <span className="px-6">Welcome {userObject.username}</span>
      ) : (
        ""
      )}
      <div className="navLink">
        <Link className="no-underline" href="/">
          Home
        </Link>
      </div>
      <div className="navLink">
        <Link className="no-underline" href="/diveCalculator">
          Dive Calculator
        </Link>
      </div>
      <div className="navLink">
        <Link className="no-underline" href="/meetTracker">
          Meet Tracker
        </Link>
      </div>

      {userObject.username ? (
        <div className="hover:bg-gray-300 h-12 items-center flex">
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="navLink">
          <Link className="no-underline" href="/login">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default HeaderComponent;
