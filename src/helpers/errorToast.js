import toast from "react-hot-toast";
import { MdErrorOutline } from "react-icons/md";

function errorToast(text, position) {
  toast(<span className="toast-text-size">{text}</span>, {
    icon: <MdErrorOutline className="text-danger fs-5" />,
    style: {
      borderRadius: "8px",
      background: "rgba(0,0,0,0.8)",
      color: "#ecf0f1",
    },
    position: position ? position : "bottom-center",
  });
}

export default errorToast;
