import { Option } from '../Options/Option';
import logoapart from '../../assets/apartkeka.ico';
import './menu.css';

export const Menu = () => {
  return (
    <>    
        <div className="text-center mt-4 mb-4">
            <img className="center" src={logoapart} alt="Logo Apart KeKa" />
        </div>
        {/*<section className="d-flex flex-column vh-100">*/}
        <section className="d-flex flex-column align-items-center vh-100">
          <div className="custom-width d-flex flex-column">
            <Option opt="1" name="Nuevo Huésped" />
            <Option opt="2" name="Nueva Cita" />
            <Option opt="3" name="Código Alarma" />
          </div>
        </section>
    </>
  )
}
