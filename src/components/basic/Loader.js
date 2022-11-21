import "./loader.css";
const Spinner = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <img
          src={process.env.REACT_APP_PUBLIC_FOLDER + "/svg/just-cat.svg"}
          alt="Cat"
          width="50"
          height="50"
        />
        <span>SociableCat</span>
      </div>
    </div>
  );
};

export default Spinner;
