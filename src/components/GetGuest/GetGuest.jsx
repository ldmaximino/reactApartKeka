import { Link, useNavigate, useParams } from "react-router-dom";
import { URLBASE } from "../../config/config";
import { useFetch } from "../../hooks/useFetch";
import { FaSpinner } from "react-icons/fa";
import logoapart from "../../assets/apartkeka.ico";
import "./GetGuest.css";

export const GetGuest = () => {
  const navigate = useNavigate();
  const { searchby, nameParam } = useParams();
  const url =
    searchby === "nombre"
      ? `${URLBASE}/api/guest/getbyname?nameFind=${nameParam}`
      : `${URLBASE}/api/guest/getbynrodoc?nrodoc=${nameParam}`;

  const objMethod = { method: "GET" };
  const getFetch = useFetch(url, objMethod);
  const { data, isLoading, errors } = getFetch;
  
  // Función para manejar el clic del botón
  const handleButtonClick = (guest) => {
    if(guest) navigate("/addvisit", { state: { first_name: guest.first_name, last_name: guest.last_name, nro_doc: guest.nro_doc } });
  };
  
  // Manejo de datos dependiendo del tipo de búsqueda
  const guests = searchby === "nombre" ? data : [data]; // Convierte el objeto a un array

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

  if(Object.keys(data).length === 0 || data.code == "404") {
    return (
        <>
          <div className="text-center mt-4 mb-4">
            <p className="noexist-title">No se encontró ningún huésped!!</p>
            <Link to="/">
              <img className="center" src={logoapart} alt="Logo Apart KeKa" />
            </Link>
          </div>
        </>
      );
  }

  return (
    <div className="guest-list-container">
      <div className="text-center mt-4 mb-4">
        <img className="center" src={logoapart} alt="Logo Apart KeKa" />
      </div>

      <table className="guest-list">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest, index) => (
            <tr key={guest.nro_doc || index}>
              <td>{guest.first_name}</td>
              <td>{guest.last_name}</td>
              <td>{guest.nro_doc}</td>
              <td>
                <button
                  className="guest-button"
                  onClick={() => handleButtonClick(guest)}
                >
                  Agendar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
