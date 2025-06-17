import React, { useState } from 'react';

const GuestsPage: React.FC = () => {
  const [tab, setTab] = useState<'manage' | 'seating'>('manage');

  const renderManage = () => (
    <div>
      <h3>Gestión de Invitados</h3>
      <div>
        <button>Importar CSV</button>
        <button>Exportar CSV</button>
        <button>Eliminar Selección</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Confirmación</th>
            <th>Grupo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Invitado 1</td>
            <td>Pendiente</td>
            <td>Familia</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderSeating = () => (
    <div>
      <h3>Seating Plan</h3>
      <svg width="600" height="400" style={{ border: '1px solid #ccc' }}>
        <text x="50%" y="50%" textAnchor="middle">Arrastra avatares aquí</text>
      </svg>
    </div>
  );

  return (
    <div>
      <div>
        <button onClick={() => setTab('manage')}>Gestión de Invitados</button>
        <button onClick={() => setTab('seating')}>Seating Plan</button>
      </div>
      {tab === 'manage' ? renderManage() : renderSeating()}
    </div>
  );
};

export default GuestsPage;
