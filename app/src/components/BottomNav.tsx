import { NavLink } from 'react-router-dom';
import './BottomNav.css';

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/">Inicio</NavLink>
      <NavLink to="/tareas">Tareas</NavLink>
      <NavLink to="/finanzas">Finanzas</NavLink>
      <NavLink to="/mas">Más</NavLink>
    </nav>
  );
}
