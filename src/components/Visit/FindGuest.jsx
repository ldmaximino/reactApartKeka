import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logoapart from "../../assets/apartkeka.ico";
import "./visit.css";

export const FindGuest = () => {
  const [findName, setFindName] = useState("");
  const [nameError, setNameError] = useState("");
  const [findDNI, setFindDNI] = useState("");
  const [DNIError, setDNIError] = useState("");
  const [searchBy, setSearchBy] = useState("nombre");
  const [placeHolder, setPlaceHolder] = useState("Ingresá el nombre a buscar");
  const navigate = useNavigate();
  const focusRef = useRef();

  const handleInputChangeName = (e) => {
    const value = e.target.value;
    setFindName(value)
  };
  
  const handleInputChangeDNI = (e) => {
    const value = e.target.value;
    // Solo permite números
    if (/^\d*$/.test(value)) {
      setFindDNI(value);
      setDNIError("");
    } else {
      setDNIError("Solo se permiten números");
    }
  };

  const handleInputFocus = () => {
    searchBy === "nombre" ? setNameError("") : setDNIError("");
  };

  const handleSearchByChange = (value) => {
    setSearchBy(value);
    value === "dni"
      ? setPlaceHolder("Ingresá el DNI a buscar")
      : setPlaceHolder("Ingresá el nombre a buscar");
  };

  const handleVolver = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue =
      searchBy === "nombre"
        ? findName.length < 3
          ? setNameError("El nombre debe tener más de 2 caracteres")
          : setNameError("") || findName
        : findDNI.length < 7 || findDNI.length > 8
        ? setDNIError("El DNI debe tener entre 7 y 8 dígitos")
        : setDNIError("") || findDNI;

    if (searchValue) navigate(`/getguest/${searchBy}/${searchValue}`);
  };

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  return (
    <div className="container">
      <div className="text-center mt-4 mb-4">
        <img className="center" src={logoapart} alt="Logo Apart KeKa" />
      </div>

      <form onSubmit={handleSubmit} className="container-form">
        {/* Radio buttons para seleccionar búsqueda */}
        <div className="radio-buttons mb-3">
          <label>
            <input
              type="radio"
              value="nombre"
              checked={searchBy === "nombre"}
              onChange={() => handleSearchByChange("nombre")}
            />
            Por Nombre
          </label>
          <label className="ms-3">
            {" "}
            {/* Espacio entre los botones */}
            <input
              type="radio"
              value="dni"
              checked={searchBy === "dni"}
              onChange={() => handleSearchByChange("dni")}
            />
            Por DNI
          </label>
        </div>

        {/* Input de búsqueda */}
        <input
          ref={focusRef}
          type="text"
          className="input-find-guest me-2"
          placeholder={placeHolder}
          value={searchBy === "nombre" ? findName : findDNI}
          onChange={(searchBy === "nombre") ? handleInputChangeName : handleInputChangeDNI }
          onFocus={handleInputFocus}
        />
        <span>{searchBy === "nombre" ? nameError : DNIError}</span>
        <button
          type="submit"
          className="btn btn-primary btn-find-guest mt-4 me-2"
        >
          Buscar
        </button>
        <button
          className="btn btn-primary btn-volver mt-4 me-2"
          onClick={handleVolver}
        >
          Volver
        </button>
      </form>
    </div>
  );
};
