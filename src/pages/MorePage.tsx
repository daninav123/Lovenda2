import React from 'react';

const tileData = [
  { key: 'guests', title: 'Invitados', description: 'Gestiona tu lista de invitados', icon: '👥' },
  { key: 'vendors', title: 'Proveedores', description: 'Administra proveedores y reuniones', icon: '🏢' },
  { key: 'protocol', title: 'Protocolo', description: 'Organiza el protocolo y momentos', icon: '📝' },
  { key: 'profile', title: 'Perfil', description: 'Configuración de tu cuenta y boda', icon: '⚙️' },
];

export const MorePage: React.FC = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
    {tileData.map(tile => (
      <div key={tile.key} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem' }}>{tile.icon}</div>
        <h3>{tile.title}</h3>
        <p>{tile.description}</p>
      </div>
    ))}
  </div>
);

export default MorePage;
