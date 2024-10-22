import { useNavigate } from "react-router-dom";
import "./option.css";

export const Option = ({ name, opt }) => {
  const navigate = useNavigate();

  const handleOptionClick = (opt) => {
    if (opt == "1") {
      navigate("/new-guest");
    } else if (opt == "2") {
      navigate("/new-visit");
    } else if (opt == "3") {
      navigate("/id-form");
    }
  };

  return (
    <>
      <button
        className="btn btn-primary fixed-button mb-4 mx-3 custom-height"
        onClick={() => handleOptionClick(opt)}
      >
        {name}
      </button>
    </>
  );
};
