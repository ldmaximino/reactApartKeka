import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import logoapart from "../../assets/apartkeka.ico";
import { FaSpinner } from "react-icons/fa";
import { useFetch } from "../../hooks/useFetch";
import "./codeAlarm.css";

export const CodeAlarm = () => {
  const { idNumber } = useParams();
  const url = `https://apiapartkeka.onrender.com/api/visit/getalarm?number=${idNumber}`;
  const getFetch = useFetch(url);

  const { data, isLoading, errors } = getFetch;

  if (isLoading) {
    return (
      <div className="loading-container">
        <img src={logoapart} alt="Logo Apart" className="loading-background" />
        <FaSpinner className="loading-icon" />
      </div>
    );
  }

  if (errors) {
    return (
      <>
        <div className="text-center mt-4 mb-4">
          <p className="error-title">ERROR !!</p>
          <Link to="/">
            <img className="center" src={logoapart} alt="Logo Apart KeKa" />
          </Link>
        </div>
      </>
    );
  }

  if(data.code == "404") {
    return (
        <>
          <div className="text-center mt-4 mb-4">
            <p className="noexist-title">El DNI no registra un alojamiento activo!!</p>
            <Link to="/">
              <img className="center" src={logoapart} alt="Logo Apart KeKa" />
            </Link>
          </div>
        </>
      );
  }

  return (
    <div className="code-alarm-container">
      <h1 className="code-alarm-title">Código Alarma</h1>{" "}
      <div className="code-alarm-number">{data?.codeAlarm || "0000"}</div>
      <div className="text-center mt-4 mb-4">
        <Link to="/">
          <img className="center" src={logoapart} alt="Logo Apart KeKa" />
        </Link>
      </div>
    </div>
  );
};
