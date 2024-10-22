import { useEffect, useState } from "react";
import { Option } from "../Options/Option";
import { Login } from "../Login/Login";
import logoapart from "../../assets/apartkeka.ico";
import { useUser } from "../Context/userContext";
import "./menu.css";
import { BiLogOut } from "react-icons/bi";

export const Menu = () => {
  const { user, setUser } = useUser();
  const [userRole, setUserRole] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const asignRole = (user) => {
    setUserRole(user.role);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser("");
    setUserRole("user"); 
  };

  useEffect(() => {
    (user) ? asignRole(user) : setUserRole('user');
  }, [user])

  return (
    <>
      {showLogin 
        ? <Login />
        : 
        <>
          <div className="d-flex justify-content-center align-items-center mt-4 mb-4 position-relative">
            <img src={logoapart} alt="Logo Apart KeKa" className="responsive-logo" />
            <div className="position-absolute" style={{ top: 0, right: "1rem", display: 'flex', alignItems: 'center' }}>
              {user && ( 
                <button
                  className="btn btn-link text-danger"
                  onClick={handleLogout} 
                  
                >
                  <BiLogOut className="fs-4" style={{ verticalAlign: 'middle', marginTop: '-5px' }} /> {/* Ajuste de posición */}
                </button>
              )}
              <p
                className="mb-0 mt-4" 
                style={{
                  color: "rgba(255, 215, 0, 0.7)",
                  cursor: "pointer",
                  display: 'flex',
                  alignItems: 'center' // Alineación vertical del texto
                }}
                onClick={() => !user && setShowLogin(true)} 
              >
                {user ? user.userName : "Iniciar Sesión"} 
              </p>
            </div>
          </div>

          <section className="d-flex flex-column align-items-center vh-100">
            <div className="custom-width d-flex flex-column">
              {userRole === "admin" && <Option opt="1" name="Nuevo Huésped" />}
              {userRole === "admin" && <Option opt="2" name="Nueva Cita" />}
              <Option opt="3" name="Código Alarma" />
            </div>
          </section>
        </>
      }
    </>
  );
};
