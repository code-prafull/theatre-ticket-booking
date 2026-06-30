// File Path: pages/Payment.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/shared/Navbar";
import PaymentCard from "../components/payment/PaymentCard";
import { createOrder, verifyPayment } from "../services/paymentApi";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!state) {
    return (
      <div className="min-h-screen w-full flex flex-col justify-between bg-[#0D0D11] text-white font-sans antialiased">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <h1 className="text-center text-gray-400 text-lg font-semibold">No Payment Data Found</h1>
        </div>
      </div>
    );
  }

  const { booking, show } = state;

  const handlePay = async () => {
    try {
      setIsProcessing(true);
      toast.loading("Initiating Encrypted Gateway Secure Tunnel...", { id: "payment_loader" });

      // 1. Fetch Dummy Order config from your updated controller
      const { data } = await createOrder(booking._id);
      
      if (!data?.success) {
        toast.error("Gateway handshake synchronization timed out.", { id: "payment_loader" });
        setIsProcessing(false);
        return;
      }

      // Simulation delay for high-end look and corporate feel
      setTimeout(async () => {
        try {
          toast.loading("Verifying transaction hash validation...", { id: "payment_loader" });

          // 2. Direct hit verify payment to update database status to Paid
          await verifyPayment({ bookingId: booking._id });

          toast.success("Payment Successful! Generating Movie Ticket... 🎬", { id: "payment_loader" });
          
          setTimeout(() => {
            navigate(`/ticket/${booking._id}`);
          }, 1000);

        } catch (verifyErr) {
          toast.error("Ledger status commit verification failure.", { id: "payment_loader" });
          setIsProcessing(false);
        }
      }, 2000); // 2 seconds high-end loader appearance

    } catch (error) {
      console.log(error);
      toast.error("Transaction layer mapping aborted.", { id: "payment_loader" });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#07070A] text-white font-sans antialiased pb-[140px] lg:pb-0 select-none">
      <Navbar />

      <div className="w-full flex-1 flex justify-center items-center p-4 sm:p-8">
        <div className="bg-[#111116]/90 w-full max-w-[450px] rounded-3xl border border-white/[0.05] p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-[#4B42E1]/10 rounded-full blur-[50px] pointer-events-none" />

          {isProcessing ? (
            /* 🔥 ULTRA SMART PROCESSING DUMMY SCREEN SCREEN LAYOUT */
            <div className="w-full py-12 flex flex-col items-center justify-center text-center">
              <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-[#4B42E1]/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-[#4B42E1] border-r-[#4B42E1] rounded-full animate-spin"></div>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#4B42E1" strokeWidth="2.5" className="animate-pulse">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h2 className="text-xl font-black text-white tracking-tight animate-pulse">Processing Payment</h2>
              <p className="text-xs text-gray-500 mt-2 max-w-[280px]">
                Securing transactional ledger tokens inside localized sandbox controller matrix.
              </p>
            </div>
          ) : (
            /* STANDARD SECURE PAYMENT SCREEN SCREEN LAYOUT */
            <>
              <div className="w-full text-left mb-6 border-b border-white/5 pb-4">
                <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4B42E1" strokeWidth="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  Sandbox Gateway Portal
                </h1>
                <p className="text-[11px] text-gray-400 mt-0.5 font-medium tracking-tight">
                  Bypassing real-time merchant endpoints into simulated local validation nodes.
                </p>
              </div>

              <div className="w-full bg-white/[0.02] rounded-2xl p-4 mb-6 border border-white/5 text-left">
                <span className="text-[9px] font-black font-mono text-[#4B42E1] uppercase tracking-widest block mb-0.5">Booking Verification Summary</span>
                <h3 className="text-sm font-black text-gray-200 truncate">{show?.movie?.title || "Movie Session Asset"}</h3>
                <p className="text-xs text-gray-400 mt-0.5 truncate">🏟️ {show?.theatre?.name || "Cinema Venue Arena"}</p>
              </div>

              <div className="w-full">
                <PaymentCard amount={booking.totalAmount} onPay={handlePay} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;