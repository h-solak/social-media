import { VscError } from "react-icons/vsc";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const authToast = ({ title, desc }) => {
  const navigate = useNavigate();
  toast(
    (t) => (
      <div className="d-flex flex-column">
        <b>{err.response.data?.errTitle}</b>
        <span>{err.response.data?.desc}</span>
        <button
          className="flex-center bg-"
          // onClick={() => toast.dismiss(t.id)},
          onClick={() => navigate("/")}
        >
          x
        </button>
      </div>
    ),
    {
      icon: <VscError className="text-danger fs-5 bounce" />,
      style: {
        borderRadius: "8px",
        background: "rgba(0,0,0,0.8)",
        color: "#ecf0f1",
      },
      position: "bottom-center",
    }
  );
  return <></>;
};

export default authToast;
