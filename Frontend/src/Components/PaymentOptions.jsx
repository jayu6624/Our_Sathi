import React, { useState, useEffect } from "react";
import {
  BadgeIndianRupee,
  ArrowLeft,
  Wallet,
  Banknote,
  CheckCircle2,
  Check,
} from "lucide-react";
import Ridecomplete from "./Ridecomplete";

function PaymentOptions({ amount }) {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const discountedAmount = (amount * 0.91).toFixed(2); // 9% discount for UPI

  const handlePayment = () => {
    if (selectedPayment) {
      setShowAnimation(true);

      // After animation completes, show the ride complete screen
      setTimeout(() => {
        setPaymentComplete(true);
      }, 2000);
    }
  };

  if (paymentComplete) {
    return <Ridecomplete />;
  }

  return (
    <div className="font-sans max-w-md mx-auto bg-white rounded-lg shadow-md relative">
      {/* Success Animation Overlay */}
      {showAnimation && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="payment-success-animation">
            <div className="success-checkmark">
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
              </div>
            </div>
            <p className="text-white text-xl font-bold mt-4 animate-fadeIn">
              Payment Successful!
            </p>
          </div>
        </div>
      )}

      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <ArrowLeft
            onClick={() => window.history.back()}
            className="w-6 h-6 mr-3 cursor-pointer text-gray-700 hover:text-black"
          />
          <h2 className="text-xl font-semibold">Payment Options</h2>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Total Fare</h3>
          <div className="flex items-center">
            <BadgeIndianRupee className="w-5 h-5 mr-1" />
            <span className="text-lg font-bold">₹{amount}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-md font-semibold mb-4">Select Payment Method</h3>

        {/* Cash Option */}
        <div
          className={`border rounded-lg p-4 mb-3 flex items-center cursor-pointer ${
            selectedPayment === "cash"
              ? "border-black bg-gray-50"
              : "border-gray-200"
          }`}
          onClick={() => setSelectedPayment("cash")}
        >
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
            <Banknote className="w-5 h-5 text-gray-700" />
          </div>
          <div className="flex-grow">
            <h4 className="font-semibold">Cash</h4>
            <p className="text-sm text-gray-500">Pay with cash to driver</p>
          </div>
          {selectedPayment === "cash" && (
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          )}
        </div>

        {/* UPI Option with Discount */}
        <div
          className={`border rounded-lg p-4 mb-3 flex items-center cursor-pointer ${
            selectedPayment === "upi"
              ? "border-black bg-gray-50"
              : "border-gray-200"
          }`}
          onClick={() => setSelectedPayment("upi")}
        >
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png"
              alt="UPI"
              className="w-6 h-6"
            />
          </div>
          <div className="flex-grow">
            <div className="flex items-center">
              <h4 className="font-semibold">UPI</h4>
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                9% OFF
              </span>
            </div>
            <div className="flex items-center">
              <p className="text-sm text-gray-500">Pay ₹{discountedAmount}</p>
              <p className="text-xs text-gray-400 line-through ml-2">
                ₹{amount}
              </p>
            </div>
          </div>
          {selectedPayment === "upi" && (
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          )}
        </div>

        {/* Wallet Option */}
        <div
          className={`border rounded-lg p-4 mb-5 flex items-center cursor-pointer ${
            selectedPayment === "wallet"
              ? "border-black bg-gray-50"
              : "border-gray-200"
          }`}
          onClick={() => setSelectedPayment("wallet")}
        >
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
            <Wallet className="w-5 h-5 text-gray-700" />
          </div>
          <div className="flex-grow">
            <h4 className="font-semibold">Wallet</h4>
            <p className="text-sm text-gray-500">Pay from your wallet</p>
          </div>
          {selectedPayment === "wallet" && (
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          )}
        </div>
      </div>

      {/* Pay Now Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handlePayment}
          disabled={!selectedPayment}
          className={`w-full py-3 font-bold rounded-lg transition-colors ${
            selectedPayment
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Let's Goo
        </button>
      </div>

      {/* CSS for the animation */}
      <style jsx>{`
        .payment-success-animation {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .success-checkmark {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          position: relative;
          animation: pulse 2s infinite;
        }

        .check-icon {
          width: 80px;
          height: 80px;
          position: relative;
          border-radius: 50%;
          box-sizing: content-box;
          background-color: #4caf50;
        }

        .icon-line {
          height: 5px;
          background-color: white;
          display: block;
          border-radius: 2px;
          position: absolute;
          z-index: 10;
        }

        .icon-line.line-tip {
          top: 46px;
          left: 14px;
          width: 25px;
          transform: rotate(45deg);
          animation: icon-line-tip 0.75s;
        }

        .icon-line.line-long {
          top: 38px;
          right: 8px;
          width: 47px;
          transform: rotate(-45deg);
          animation: icon-line-long 0.75s;
        }

        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
          }

          70% {
            transform: scale(1);
            box-shadow: 0 0 0 15px rgba(76, 175, 80, 0);
          }

          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
          }
        }

        @keyframes icon-line-tip {
          0% {
            width: 0;
            left: 1px;
            top: 19px;
          }
          54% {
            width: 0;
            left: 1px;
            top: 19px;
          }
          70% {
            width: 50px;
            left: -8px;
            top: 37px;
          }
          84% {
            width: 17px;
            left: 21px;
            top: 48px;
          }
          100% {
            width: 25px;
            left: 14px;
            top: 46px;
          }
        }

        @keyframes icon-line-long {
          0% {
            width: 0;
            right: 46px;
            top: 54px;
          }
          65% {
            width: 0;
            right: 46px;
            top: 54px;
          }
          84% {
            width: 55px;
            right: 0px;
            top: 35px;
          }
          100% {
            width: 47px;
            right: 8px;
            top: 38px;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-in forwards;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default PaymentOptions;
