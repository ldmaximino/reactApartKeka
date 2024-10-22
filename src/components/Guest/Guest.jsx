import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoapart from '../../assets/apartkeka.ico';
import { Formulario } from '../Formulario/Formulario';
import { URLBASE } from "../../config/config.js";
import './guest.css';

export const Guest = () => {
  const navigate = useNavigate();
  const focusRef = useRef();
  const [guestInfo, setGuestInfo] = useState({
    first_name: '',
    last_name: '',
    dni: '',
  });
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    errors: null,
  });
  const [inputError, setInputError] = useState('');

  const validaGuestInput = (guestInfo) => {
    if(guestInfo.first_name.length < 3) {
      setInputError("Debe ingresar un nombre válido");
      return;
    }
    if(guestInfo.last_name.length < 3) {
      setInputError("Debe ingresar un apellido válido");
      return;
    }
    if(guestInfo.dni.length < 7 || guestInfo.dni.length > 8) {
      setInputError("El DNI debe tener 7 u 8 dígitos");
      return;
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const error = validaGuestInput(guestInfo);
    if (error) {
      setInputError(error);
      return;
    }
    setInputError('');
     const url = `${URLBASE}/api/guest/`;
    const objMethod = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: guestInfo.first_name,
        last_name: guestInfo.last_name,
        nro_doc: guestInfo.dni
      })
    };

    try {
      const response = await fetch(url, objMethod);
      const data = await response.json();
      const message = (data.code == "404") 
          ? `El huésped con dni ${guestInfo.dni} ya existe!!`
          : `Huésped ${data.data.first_name} ${data.data.last_name} creado con éxito!!`;
      setState({ data, isLoading: false, errors: null });
      navigate('/message-confirm', { state: { msg: message } });
    } catch (error) {
      setState({ data: null, isLoading: false, errors: error });
      navigate('/message-confirm', { state: { msg: "ERROR !!" } });
    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setGuestInfo({
      ...guestInfo,
      [name]: value,
    })
  };

  const handleVolver = () => {
    navigate("/");
  }

  useEffect(() => {
    if(focusRef.current) focusRef.current.focus();
  }, [])

  return (
    <>
      <div className="text-center mt-4 mb-4">
        <img className="center" src={logoapart} alt="Logo Apart KeKa" />
      </div>

      <Formulario 
        guestInfo={guestInfo}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleVolver={handleVolver}
        inputError={inputError}
        focusRef={focusRef}
      />
    </>
  );
};
