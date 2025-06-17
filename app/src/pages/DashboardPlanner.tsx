import { useState } from 'react';

export default function DashboardPlanner() {
  const [bodaSeleccionada, setBodaSeleccionada] = useState('Boda 1');
  const tareas = ['Llamar florista', 'Confirmar menú', 'Revisar música', 'Reunión con novios', 'Enviar recordatorios'];

  return (
    <div className="dashboard-planner">
      <select value={bodaSeleccionada} onChange={e => setBodaSeleccionada(e.target.value)}>
        <option>Boda 1</option>
        <option>Boda 2</option>
      </select>
      <h2>Bienvenido Planner</h2>
      <div className="tarjetas">
        <div>Tareas asignadas</div>
        <div>Proveedores</div>
        <div>Momentos especiales</div>
      </div>
      <h3>Próximas tareas</h3>
      <ul>
        {tareas.slice(0,5).map(t => <li key={t}>{t}</li>)}
      </ul>
    </div>
  );
}
