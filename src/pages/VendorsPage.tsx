import React, { useState } from 'react';

const VendorsPage: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <div>
      <h3>Proveedores</h3>
      <div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Búsqueda IA" />
        <button>Buscar</button>
        <button>Eliminar Selección</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Contacto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Proveedor 1</td>
            <td>Catering</td>
            <td>info@example.com</td>
          </tr>
        </tbody>
      </table>
      <div id="modals" />
    </div>
  );
};

export default VendorsPage;
