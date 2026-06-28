const Modal = ({
  open,
  children,
  onClose,
}) => {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">

      <div className="bg-white rounded-lg p-6 relative w-[500px]">

        <button
          onClick={onClose}
          className="absolute right-4 top-4"
        >
          ✕

        </button>

        {children}

      </div>

    </div>
  );
};

export default Modal;