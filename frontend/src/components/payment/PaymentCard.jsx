// File Path: components/payment/PaymentCard.jsx
const PaymentCard = ({
  amount,
  onPay,
}) => {
  return (
    // Premium Payment Receipt Box Layer (No MUI components, 100% clean custom responsive grid)
    <div className="w-full bg-transparent text-left select-none font-sans">
      
      {/* Visual Badge Card Container with pricing data layout */}
      <div className="w-full bg-gray-50 lg:bg-white/5 border border-gray-100 lg:border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
        
        {/* SVG Credit/Debit Secure Cards representation indicator */}
        <div className="w-12 h-12 rounded-full bg-[#5B50E6]/10 lg:bg-purple-500/10 flex items-center justify-center mb-3">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#5B50E6" 
            strokeWidth="2.5"
            className="lg:stroke-purple-400"
          >
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        </div>

        {/* Amount Section Typography Meta */}
        <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest block">
          Total Chargeable Amount
        </span>
        
        {/* Dynamic Big Pricing Text */}
        <h2 className="text-3xl sm:text-4xl font-black text-black lg:text-white tracking-tight mt-2 mb-1">
          ₹{amount || "0"}
        </h2>
        
        <p className="text-[10px] font-medium text-gray-400 max-w-[200px] leading-tight">
          Payments are handled via secure payment gateway processing systems.
        </p>

      </div>

      {/* INTEGRATED CALL ACTION BUTTON LAYER */}
      <div className="mt-6">
        <button
          type="button"
          onClick={onPay}
          className="w-full bg-[#5B50E6] hover:bg-[#493fd3] text-white font-bold text-sm py-4 px-6 rounded-xl transition-all shadow-[0_6px_20px_rgba(91,80,230,0.25)] hover:shadow-[0_10px_25px_rgba(91,80,230,0.4)] active:scale-[0.98] duration-200"
        >
          Pay Securely Now
        </button>
      </div>

    </div>
  );
};

export default PaymentCard;