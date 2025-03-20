"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useVerifyEmail } from "@/app/hooks/useVerify";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const {isPending, mutate} = useVerifyEmail()
  const handleVerify = async () => {
   mutate(otp)
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6 text-start">
        <h2 className="text-xl font-bold mb-2">Verify Your Email</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Enter the OTP sent to your email.
        </p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="input input-bordered w-full mb-4 text-center"
        />
        <button
          onClick={handleVerify}
          disabled={isPending}
          className={`btn btn-primary w-full mb-2 ${
            isPending ? "btn-disabled" : ""
          }`}
        >
          {isPending ? "Verifying..." : "Verify"}
        </button>
        {/* <div className="text-sm text-center mt-3 text-blue-500 cursor-pointer hover:underline">
          {loadisPendinging ? "Resending..." : "Resend OTP"}
        </div> */}
      </div>
    </div>
  );
};

export default VerifyEmail;
