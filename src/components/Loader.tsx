import loader from "../assets/loader.gif";

const Loader = () => {
  return (
    <div className="popup">
      <div className="popup-content spinner1">
        <img src={loader} alt="" />
      </div>
    </div>
  );
};

export default Loader;