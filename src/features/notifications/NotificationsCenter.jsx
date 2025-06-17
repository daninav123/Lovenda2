import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markAsRead } from './notificationsSlice';
import './NotificationsCenter.css';

export default function NotificationsCenter() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const filtered = notifications.filter((n) =>
    filter === 'unread' ? !n.read : true
  );

  const handleMarkAsRead = (id) => {
    dispatch(markAsRead(id));
  };

  return (
    <div className="notifications-center">
      <button className="icon" onClick={() => setOpen(!open)}>
        🔔
      </button>
      {open && (
        <div className="panel">
          <div className="filters">
            <button onClick={() => setFilter('all')}>Todas</button>
            <button onClick={() => setFilter('unread')}>No leídas</button>
          </div>
          <ul>
            {filtered.map((n) => (
              <li key={n.id} className={n.read ? 'read' : ''}>
                <h4>{n.title}</h4>
                <p>{n.body}</p>
                <small>{new Date(n.datetime).toLocaleString()}</small>
                {!n.read && (
                  <>
                    <button onClick={() => handleMarkAsRead(n.id)}>Marcar como leída</button>
                    <button onClick={() => setOpen(false)}>Posponer</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
