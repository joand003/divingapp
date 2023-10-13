'use client'
import React, {useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import validateEmail from '../../functions/emailValidation'
import Link from 'next/link'

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handleUserName = (e) => {
    setUsername(e.target.value);
  } 

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handlePasswordConfirmation = (e) => {
    setPasswordConfirmation(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    let isUserNameTaken;
    let isEmailTaken;

    if (username === "") {
      setUsernameError("Username is required");
    } else {
      setUsernameError("");
    }
    if (username !== "" && username.length < 3) {
      setUsernameError("Username must be at least 3 characters");
    }
    if (username !== "" && username.length > 2) {
      try {
      isUserNameTaken = await axios.post("/api/userNameTaken", { username });
      } catch (err) {
        setUsernameError(err.response.data.error);
      }
    }
    if (isUserNameTaken){
      if (isUserNameTaken.data.error) {
        setUsernameError(isUserNameTaken.data.error);
      } else {
        setUsernameError("");
      }
    }
    if (email && validateEmail(email)) {
      try {
      isEmailTaken = await axios.post("/api/emailTaken", { email });
      } catch (err) {
        setEmailError(err.response.data.error);
      }
    } else {
      setEmailError("Email is not a valid email address");
    }
    if (isEmailTaken) {
      if (isEmailTaken.data.error) {
        setEmailError(isEmailTaken.data.error);
      } else {
        setEmailError("");
      }
    }
    
    if (password === "") {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
    if (passwordConfirmation === "") {
      setPasswordConfirmationError("Password confirmation is required");
    } else {
      setPasswordConfirmationError("");
    }
    if (password !== passwordConfirmation && passwordConfirmation !== "") {
      setPasswordMatchError("Passwords do not match");
    } else {
      setPasswordMatchError("");
    }
    
    if (username && password && email && passwordConfirmation && password === passwordConfirmation && !isUserNameTaken.data.error && usernameError === "" && emailError === "" && passwordError === "" && passwordConfirmationError === "" && passwordMatchError === "") {
      try {
        await axios.post("/api/signup", { username, password, email });
        router.push('/');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <main>
      <div className="flex flex-col text-center justify-center items-center py-6">
        <h1 className="pb-4">Signup</h1>
        <form>
          <div className="flex flex-row align-middle items-center pb-3">
          <label className="pr-2"  htmlFor="username">Username</label>
          <input placeholder='Enter Username'  className="" type="text" id="username" name="username" onChange={handleUserName}/>
          <p>{usernameError}</p>
          </div>
          <div className="flex flex-row align-middle items-center pb-3">
          <label className="pr-11"  htmlFor="email">Email</label>
          <input placeholder='Enter Email' className="" type="email" id="email" name="email" onChange={handleEmail}/>
          <p>{emailError}</p>
          </div>
          <div className="flex flex-row align-middle items-center pb-3">
          <label className="pr-3"  htmlFor="password">Password</label>
          <input placeholder='Enter Password' className="" type="password" id="password" name="password" onChange={handlePassword}/>
          <p>{passwordError}</p>
          </div>
          <div className="flex flex-row align-middle items-center pb-3">
          <label className="pr-3"  htmlFor="passwordConfirmation">Password</label>
          <input placeholder='Confirm Password' className="" type="password" id="passwordConfirmation" name="passwordConfirmation" onChange={handlePasswordConfirmation}/>
          <p>{passwordConfirmationError}</p>
          <p>{passwordMatchError}</p>
          </div>

          <button className="bg-gray-500" type="submit" onClick={handleSubmit}>
            Login
          </button>

        </form>

        <p className="pt-3">
        Already registered? <Link className="underline text-purple-500" href="/login">Login</Link>
      </p>
      </div>
    </main>
  );
}

