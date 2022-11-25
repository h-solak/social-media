import toast from "react-hot-toast";
import { VscError } from "react-icons/vsc";

function errorToast(text, position) {
  toast(<span className="toast-text-size bounce">{text}</span>, {
    icon: <VscError className="text-danger fs-5 bounce" />,
    style: {
      borderRadius: "8px",
      background: "rgba(0,0,0,0.8)",
      color: "#ecf0f1",
    },
    position: position ? position : "bottom-center",
  });
}

export default errorToast;
