import { useState } from "react";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleVerify = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Email verified successfully");
      router.push("/dashboard");
    } catch (error) {
      alert("Invalid OTP. Please try again.");
    }
    setLoading(false);
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("New OTP sent to your email");
    } catch (error) {
      alert("Failed to resend OTP. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Verify Your Email</h2>
        <p className="text-gray-600 mb-4">Enter the OTP sent to your email.</p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="input input-bordered w-full mb-4 text-center"
        />
        <button
          onClick={handleVerify}
          disabled={loading}
          className={`btn btn-primary w-full mb-2 ${
            loading ? "btn-disabled" : ""
          }`}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
        <button
          onClick={handleResendOtp}
          disabled={loading}
          className={`btn btn-outline w-full ${loading ? "btn-disabled" : ""}`}
        >
          {loading ? "Resending..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
