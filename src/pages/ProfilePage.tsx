import React from 'react';

const ProfilePage: React.FC = () => (
  <div>
    <section>
      <h3>Avatar</h3>
      <img src="/avatar.png" alt="avatar" width={120} height={120} style={{ borderRadius: '50%' }} />
      <div>
        <button>Editar Avatar</button>
      </div>
    </section>
    <section>
      <h3>Datos de Cuenta</h3>
      <form>
        <div>
          <label>Nombre</label>
          <input type="text" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" />
        </div>
      </form>
    </section>
    <section>
      <h3>Colaboradores</h3>
      <button>Invitar Colaborador</button>
    </section>
    <section>
      <h3>Suscripción</h3>
      <button>Gestionar</button>
    </section>
    <section>
      <h3>Notificaciones</h3>
      <label><input type="checkbox" /> Recibir emails</label>
    </section>
    <section>
      <h3>Ajustes de Boda</h3>
      <textarea rows={3} style={{ width: '100%' }} />
    </section>
  </div>
);

export default ProfilePage;
