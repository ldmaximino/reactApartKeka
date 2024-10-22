import { Link, useLocation } from "react-router-dom";
import logoapart from '../../assets/apartkeka.ico';
import './message.css';

export const Message = () => {
    const location = useLocation();
    const { msg } = location.state || {};
 
  return (
    <>
      <p className="message-p">{msg}</p>
      <div className="text-center mt-4 mb-4">
        <Link to="/">
          <img className="center" src={logoapart} alt="Logo Apart KeKa" />
        </Link>
      </div>
    </>
  );
};
