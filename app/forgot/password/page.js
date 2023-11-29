"use client";
import React, {useState} from 'react'
import axios from 'axios';

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiResponse("");
    const response = await axios.post("/api/requestPasswordReset", {email})
    setApiResponse(response.data.message)
  }
  return (
    <div className='flex flex-col text-center mt-16 justify-center items-center'>
      <h1 className='mb-6'>Password Reset</h1>
      <form>
        <div className="flex flex-row align-middle items-center py-3 justify-center">
          <label  className="pr-2" htmlFor="email">Email: </label>
          <input
            className="w-64"
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-center">
          <p className='text-red-700'>{apiResponse}</p>
        </div>
        <button className="" onClick={handleSubmit}>
          Request Password Reset
        </button>
      </form>
    </div>
  )
}

export default PasswordRecovery