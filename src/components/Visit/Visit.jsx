import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoapart from "../../assets/apartkeka.ico";
import { formatNroDoc } from "../../helpers/formatNroDoc.js";
import { URLBASE } from "../../config/config.js";
import "./visit.css";
import { validateDates } from "../../helpers/validateDates.js";

export const Visit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { first_name, last_name, nro_doc } = location.state || {};

  const focusRef = useRef();
  const [visitInfo, setVisitInfo] = useState({
    codeAlarm: "",
    dateIN: "",
    hourIN: "",
    dateOUT: "",
    hourOUT: "",
  });

  const [errorCodeAlarm, seterrorCodeAlarm] = useState("");
  const [errorDateIN, seterrorDateIN] = useState("");
  const [errorhourIN, seterrorhourIN] = useState("");
  const [errorDateOUT, seterrorDateOUT] = useState("");
  const [errorhourOUT, seterrorhourOUT] = useState("");
  const [validateDifHour, setValidateDifHour] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitInfo({
      ...visitInfo,
      [name]: value,
    });
  };

  const handleFocus = (e) => {
    const { name } = e.target;

    // Limpiar mensajes de error cuando se hace foco en el input
    switch (name) {
      case "codeAlarm":
        seterrorCodeAlarm("");
      case "dateIN":
        seterrorDateIN("");
        break;
      case "hourIN":
        seterrorhourIN("");
        break;
      case "dateOUT":
        seterrorDateOUT("");
        break;
      case "hourOUT":
        seterrorhourOUT("");
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { dateIN, hourIN, dateOUT, hourOUT, codeAlarm } = visitInfo;

    if (!dateIN || !hourIN || !dateOUT || !hourOUT) {
      console.log(codeAlarm.length)
      if (codeAlarm.length != 4) seterrorCodeAlarm("Ingrese un código de 4 dígitos");
      if (!dateIN) seterrorDateIN("Ingreso no válido");
      if (!hourIN) seterrorhourIN("Ingreso no válido");
      if (!dateOUT) seterrorDateOUT("Ingreso no válido");
      if (!hourOUT) seterrorhourOUT("Ingreso no válido");
      return;
    }

    const msgValidateDates = validateDates(dateIN, hourIN, dateOUT, hourOUT);
    if(msgValidateDates.length > 0) {
      setValidateDifHour(msgValidateDates);
      return;
    } else {
      setValidateDifHour("");
    }

    const combinedDateTimeIN = new Date(
      `${visitInfo.dateIN}T${visitInfo.hourIN}:00`
    );
    const combinedDateTimeOUT = new Date(
      `${visitInfo.dateOUT}T${visitInfo.hourOUT}:00`
    );
    const url = `${URLBASE}/api/visit/`;
    const objMethod = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nro_doc: nro_doc,
        codeAlarm: visitInfo.codeAlarm,
        dateIN: combinedDateTimeIN,
        dateOut: combinedDateTimeOUT,
      }),
    };

    try {
      const response = await fetch(url, objMethod);
      const data = await response.json();
      const message =
        data.code == "404"
          ? `Período no disponible!!`
          : `Hospedaje creado con éxito!!`;
      navigate("/message-confirm", { state: { msg: message } });
    } catch (error) {
      navigate("/message-confirm", { state: { msg: "ERROR !!" } });
    }
  };

  useEffect(() => {
    if (focusRef.current) focusRef.current.focus();
  }, []);

  return (
    <>
      <div className="text-center mt-3 mb-3">
        <img className="center" src={logoapart} alt="Logo Apart KeKa" />
      </div>

      <h2 className="text-center mb-2">Datos del Visitante</h2>
      <p className="text-center mb-1 huesped-style">
        {first_name} {last_name}
      </p>
      <p className="text-center mb-2 huesped-style">
        DNI: {nro_doc ? formatNroDoc(nro_doc) : "No disponible"}
      </p>

      <form onSubmit={handleSubmit} className="visit-form">
        <div className="mb-2 codealarm">
          <label htmlFor="codeAlarm" className="form-label">
            Alarma:
          </label>
          <input
            type="Number"
            name="codeAlarm"
            id="codeAlarm"
            value={visitInfo.codeAlarm}
            onChange={handleChange}
            onFocus={handleFocus}
            className="form-control input-style"
            ref={focusRef}
          />
          {errorDateIN && <span className="error">{errorCodeAlarm}</span>}
        </div>
        <div className="input-group">
          <div className="mb-3">
            <label htmlFor="dateIN" className="form-label">
              Fecha de Ingreso:
            </label>
            <input
              type="date"
              name="dateIN"
              id="dateIN"
              value={visitInfo.dateIN}
              onChange={handleChange}
              onFocus={handleFocus}
              className="form-control input-style"
            />
            {errorDateIN && <span className="error">{errorDateIN}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="hourIN" className="form-label">
              Hora de Ingreso:
            </label>
            <input
              type="time"
              name="hourIN"
              id="hourIN"
              value={visitInfo.hourIN}
              onChange={handleChange}
              onFocus={handleFocus}
              className="form-control input-style"
            />
            {errorhourIN && <span className="error">{errorhourIN}</span>}
          </div>
        </div>

        <div className="input-group">
          <div className="mb-3">
            <label htmlFor="dateOUT" className="form-label">
              Fecha de Salida:
            </label>
            <input
              type="date"
              name="dateOUT"
              id="dateOUT"
              value={visitInfo.dateOUT}
              onChange={handleChange}
              onFocus={handleFocus}
              className="form-control input-style"
            />
            {errorDateOUT && <span className="error">{errorDateOUT}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="hourOUT" className="form-label">
              Hora de Salida:
            </label>
            <input
              type="time"
              name="hourOUT"
              id="hourOUT"
              value={visitInfo.hourOUT}
              onChange={handleChange}
              onFocus={handleFocus}
              className="form-control input-style"
            />
            {errorhourOUT && <span className="error">{errorhourOUT}</span>}
          </div>
        </div>
        <div className="text-center mb-1 mt-1">
          {validateDifHour && <span className="difhoras">{validateDifHour}</span>}
        </div>
        <div className="text-center mb-2">
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </div>
      </form>
    </>
  );
};
