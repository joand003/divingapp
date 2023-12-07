"use client";
import React, {useState} from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiResponse("");
    setProcessing(true);
    try {
      await axios.post("/api/requestPasswordReset", {email})
      setApiResponse("Email sent to reset password")
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      setApiResponse(err.response.data.message)
      setProcessing(false);
    }
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
            disabled={processing}
          />
        </div>
        <div className="flex flex-row justify-center">
          <p className='text-red-700'>{apiResponse}</p>
        </div>
        <button className="" onClick={handleSubmit} disabled={processing}>
          Request Password Reset
        </button>
      </form>
    </div>
  )
}

export default PasswordRecovery