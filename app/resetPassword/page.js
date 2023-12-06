"use client";
import React, {useState} from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import validateEmail from "@/functions/emailValidation";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPW, setConfirmPW] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState("");
    const [allFieldsError, setAllFieldsError] = useState("");
    const [apiResponse, setApiResponse] = useState("");

    const params = useSearchParams();
    const token = params.get("token");

    const handleResetPW = async (e) => {
        e.preventDefault();
        if (password !== confirmPW) {
            setPasswordMatchError("Passwords do not match");
        } else {
            setPasswordMatchError("");
        }
        if (!validateEmail(email)) {
            setEmailError("Invalid email");
        } else {
            setEmailError("");
        }
        if (!email || !password || !confirmPW) {
            setAllFieldsError("All fields are required");
            return;
        } else {
            setAllFieldsError("");
        }
        if (passwordMatchError || emailError || allFieldsError) {
            return;
        }

        setApiResponse("");
        const response = await axios.post("/api/passwordReset", {
            email,
            password,
            token,
        });
        setApiResponse(response.data.message);
    };

    return (
        <div className="flex flex-col justify-center text-center items-center">
            <h1 className="my-8">Reset Password</h1>
            <div className="w-max flex flex-col">
                <p className="text-red-700">{allFieldsError}</p>
                <form className="flex flex-col items-start">
                    <div className="flex flex-row items-center py-3 justify-center">
                        <label className="pr-2" htmlFor="email">
                            Email:{" "}
                        </label>
                        <input
                            className="w-64"
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <p className="text-red-700">{emailError}</p>
                    <div className="flex flex-row align-middle items-center py-3 justify-center">
                        <label className="pr-2" htmlFor="password">
                            New Password:{" "}
                        </label>
                        <input
                            className="w-64"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <p className="text-red-700">{passwordMatchError}</p>
                    <div className="flex flex-row align-middle items-center py-3 justify-center">
                        <label className="pr-2" htmlFor="confirmPassword">
                            Confirm Password:{" "}
                        </label>
                        <input
                            className="w-64"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPW}
                            onChange={(e) => setConfirmPW(e.target.value)}
                        />
                    </div>
                </form>
                <button className="" onClick={handleResetPW}>
                        Reset Password
                    </button>
            </div>
        </div>
    );
}
