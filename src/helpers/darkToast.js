import toast from "react-hot-toast";
function darkToast(text, icon, position) {
  toast(
    <span className="toast-text-size text-start text-sm-start">{text}</span>,
    {
      icon: icon,
      style: {
        borderRadius: "8px",
        background: "rgba(0,0,0,0.8)",
        color: "#ecf0f1",
      },
      position: position ? position : "bottom-center",
    }
  );
}

export default darkToast;

/*
Example Usage

darkToast(
  darkToast(
      <span>{res.data.desc}</span>,
      <TiUserAdd className="color-white fs-5" />,
      "bottom-center"
    );
*/
