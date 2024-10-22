import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoapart from "../../assets/apartkeka.ico";
import "./idform.css";

export const IdForm = ({ onSubmit }) => {
  const [idNumber, setIdNumber] = useState("");
  const [dniError, setDniError] = useState("");
  const navigate = useNavigate();
  const focusRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idNumber.length < 7 || idNumber.length > 8) {
      setDniError("El DNI debe tener 7 u 8 dígitos");
      return;
    }
    setDniError("");
    if (idNumber) {
      navigate(`/code-alarm/${idNumber}`);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    // Solo permite números
    if (/^\d*$/.test(value)) {
      setIdNumber(value);
      setDniError("");
    } else {
      setDniError("Solo se permiten números");
    }
  };

  const handleVolver = () => {
    navigate("/");
  };

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  return (
    <div className="container">
      <div className="text-center mt-4 mb-4">
        <img className="center" src={logoapart} alt="Logo Apart KeKa" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="text-center mt-4 idForm-container"
      >
        <h2 className="idForm-title">Ingrese su DNI</h2>
        <input
          ref={focusRef}
          type="number"
          id="idNumber"
          value={idNumber}
          onChange={handleChange}
          required
          className="form-control my-3 idNumber"
        />
        <span>{dniError}</span>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary btn-enviar me-2">
            Enviar
          </button>
          <button className="btn btn-primary btn-enviar" onClick={handleVolver}>
            Volver
          </button>
        </div>
      </form>
    </div>
  );
};
