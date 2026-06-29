// File Path: pages/Payment.jsx
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/shared/Navbar";
import PaymentCard from "../components/payment/PaymentCard";
import { createOrder, verifyPayment } from "../services/paymentApi";

const loadRazorpaySdk = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate(); // Navigation fix update kiya context crash rokne ke liye

  if (!state) {
    return (
      <div className="min-h-screen w-full flex flex-col justify-between bg-white lg:bg-[#0D0D11] text-black font-sans antialiased">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <h1 className="text-center text-gray-500 lg:text-gray-400 text-lg font-semibold">
            No Payment Data Found
          </h1>
        </div>
        <div className="lg:hidden w-full h-[64px]">
          <Navbar />
        </div>
      </div>
    );
  }

  const { booking, show } = state;

  const handlePay = async () => {
    try {
      const sdkLoaded = await loadRazorpaySdk();
      if (!sdkLoaded) {
        toast.error("Razorpay SDK failed to load. Check internet and retry.");
        return;
      }

      const { data } = await createOrder(booking._id);
      if (!data?.order?.id || !data?.key) {
        toast.error("Payment gateway config missing. Please contact support.");
        return;
      }

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Movie Ticket Booking",
        description: "Movie Booking Terminal",
        order_id: data.order.id,
        handler: async function (response) {
          await verifyPayment({
            bookingId: booking._id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          toast.success("Payment Successful"); // Alert popup ko user experience ke liye upgrade kiya toast se
          navigate(`/ticket/${booking._id}`);
        },
        theme: {
          color: "#5B50E6", // Brand theme layout Indigo color match kiya figma ke according
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Payment Initialization Failed");
    }
  };

  return (
    // Base layout environment context
    <div className="min-h-screen w-full flex flex-col justify-between bg-white lg:bg-[#0D0D11] text-black font-sans antialiased pb-[140px] lg:pb-0">
      <Navbar />

      {/* CORE WORKSPACE GATEWAY PANEL */}
      <div className="w-full flex-1 flex justify-center items-center p-4 sm:p-8 lg:p-12">
        
        {/* Payment Shell Board */}
        <div className="bg-white lg:bg-[#15151A] w-full max-w-[440px] md:max-w-[480px] rounded-3xl lg:border lg:border-white/5 p-6 sm:p-8 shadow-xl lg:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col relative overflow-hidden">
          
          {/* Section Headers branding alignment */}
          <div className="w-full text-left mb-6 border-b border-gray-100 lg:border-white/5 pb-4">
            <h1 className="text-2xl font-extrabold text-black lg:text-white tracking-tight flex items-center gap-2">
              {/* Shield Secure SVG representation */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B50E6" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Secure Payment
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Gateway execution protocol encryption protocol.
            </p>
          </div>

          {/* Ticket Information Mini Card Meta description item row */}
          <div className="w-full bg-gray-50 lg:bg-white/5 rounded-2xl p-4 mb-6 border border-gray-100 lg:border-white/5 text-left">
            <span className="text-[10px] font-extrabold text-gray-400 lg:text-gray-500 uppercase tracking-widest block mb-1">
              Booking Details
            </span>
            <h3 className="text-sm font-bold text-black lg:text-gray-200 truncate">
              {show?.movie?.title || "Movie Session Selection"}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 truncate">
              {show?.theatre?.name || "Cinema Center Hub"}
            </p>
          </div>

          {/* PRIMARY CARD PROCESS MODULE COMPONENT */}
          <div className="w-full">
            <PaymentCard
              amount={booking.totalAmount}
              onPay={handlePay}
            />
          </div>

        </div>
      </div>

      {/* MOBILE PERSISTENT CODES ATTACHMENTS FOOTER MENU */}
      <div className="lg:hidden w-full fixed bottom-0 left-0 z-50 h-[64px]">
        <Navbar />
      </div>

    </div>
  );
};

export default Payment;