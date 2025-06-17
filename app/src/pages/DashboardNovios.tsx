export default function DashboardNovios() {
  const nombrePareja = 'Ana & Juan';
  return (
    <div className="dashboard-novios">
      <h2>Bienvenidos {nombrePareja}</h2>
      <div className="progreso">
        <div>Progreso de la boda: <span style={{ color: 'green' }}>●</span></div>
      </div>
      <div className="tarjetas">
        <div>Invitados</div>
        <div>Presupuesto</div>
        <div>Proveedores</div>
        <div>Tareas</div>
      </div>
      <div className="galeria">
        <h3>Ideas</h3>
        <div className="imagenes">
          <div>Idea 1</div>
          <div>Idea 2</div>
          <div>Idea 3</div>
        </div>
      </div>
      <div className="noticias">
        <h3>Noticias</h3>
        <p>Contenido dummy de noticias.</p>
      </div>
    </div>
  );
}
