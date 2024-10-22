import { useEffect, useState } from "react";
import { URLBASE } from "../../config/config.js";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/userContext";
import "./login.css";

export const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async(e) => {
    e.preventDefault();
    const url = `${URLBASE}/api/user/login`;
    const objMethod = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: username,
        password: password
      })
    };

    try {
        const response = await fetch(url, objMethod);
        const data = await response.json();
        if(data.code !== "404") {
            console.log('navigate a menú');
            setUser(data);
            navigate('/');
        } else {
            navigate('/message-confirm', { state: { msg: "CREDENCIALES NO VÁLIDAS!!" } });
        }
        return;
       
      } catch (error) {
        navigate('/message-confirm', { state: { msg: "ERROR !!" } });
      }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleLogin}
        className="login-form" // Clases de Bootstrap para el ancho
        style={{ maxWidth: "500px" }} // Establece un ancho máximo si es necesario
      >
        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};
