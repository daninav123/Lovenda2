import React from 'react';

const ProtocolPage: React.FC = () => (
  <div>
    <section>
      <h3>Momentos Especiales</h3>
      <textarea rows={4} style={{ width: '100%' }} placeholder="Describe aquí los momentos especiales" />
    </section>
    <section>
      <h3>Timing</h3>
      <div style={{ borderLeft: '2px solid #ccc', paddingLeft: '1rem' }}>
        <div draggable style={{ marginBottom: '0.5rem' }}>09:00 Preparativos</div>
        <div draggable style={{ marginBottom: '0.5rem' }}>12:00 Ceremonia</div>
        <div draggable>14:00 Banquete</div>
      </div>
    </section>
    <section>
      <h3>Checklist de Ensayos</h3>
      <ul>
        <li><input type="checkbox" /> Ceremonia</li>
        <li><input type="checkbox" /> Entrada novios</li>
        <li><input type="checkbox" /> Baile</li>
      </ul>
    </section>
  </div>
);

export default ProtocolPage;
