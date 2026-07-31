import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../api";

function VerifyOtp() {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const signupData = JSON.parse(localStorage.getItem("signupData"));

    const email = signupData?.email || "";

    const handleVerify = async () => {
        try {
            await verifyOtp(email, otp);

            alert("Account created successfully!");

            localStorage.removeItem("signupData");

            navigate("/login");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold mb-4">
                    Verify Email
                </h1>

                <p className="mb-6">
                    Enter the OTP sent to your email.
                </p>

                <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border rounded-lg p-3 mb-4"
                />

                <button
                onClick={handleVerify}
                    className="w-full bg-black text-white py-3 rounded-lg"
                >
                    Verify OTP
                </button>
            </div>
        </div>
    );
}

export default VerifyOtp;