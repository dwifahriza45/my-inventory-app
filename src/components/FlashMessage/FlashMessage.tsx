import { FiX } from "react-icons/fi";

type FlashMessageProps = {
  type?: "success" | "error" | "info";
  message: string;
  onClose?: () => void;
};

const styles = {
  success: "bg-green-50 text-green-700 border-green-200",
  error: "bg-red-50 text-red-700 border-red-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
};

const FlashMessage = ({ type = "info", message, onClose }: FlashMessageProps) => {
  return (
    <div className={`relative rounded-lg border px-4 py-3 text-sm ${styles[type]}`}>
      {message}

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 opacity-60 hover:opacity-100"
        >
          <FiX size={16} />
        </button>
      )}
    </div>
  );
};

<<<<<<< HEAD
export default FlashMessage;
=======
export default FlashMessage;
>>>>>>> d949834111886c2f77b3c8a3b02298ea0e9180d3
