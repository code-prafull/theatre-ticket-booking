// File Path: components/shared/Modal.jsx
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    // Backdrop overlay overlay centering components smoothly with backdrop blur
    <div className="fixed inset-0 w-full h-full z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 select-none">
      
      {/* 1. DARK BLURRY BACKDROP CLICK ACTION EXIT */}
      <div 
        onClick={onClose}
        className="absolute inset-0 w-full h-full bg-black/70 backdrop-blur-sm transition-opacity duration-300" 
      />

      {/* 2. DYNAMIC RESPONSIVE MODAL SHELL (Scrollable & Responsive Content Box) */}
      <div className="relative w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] bg-[#16161C] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-10">
        
        {/* Persistent Floating Close Trigger on top corner right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 w-8 h-8 rounded-xl flex items-center justify-center border border-white/5 transition-all active:scale-90 z-30"
          title="Close Window"
        >
          ✕
        </button>

        {/* INTERNAL SCROLLABLE VIEWPORT CONTAINER CHAMBER */}
        <div className="w-full flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {children}
        </div>

      </div>

    </div>
  );
};

export default Modal;