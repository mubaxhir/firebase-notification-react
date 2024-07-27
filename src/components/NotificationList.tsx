import React from 'react';

interface Notification {
  id: string;
  message: string;
  read: boolean;
}

interface NotificationListProps {
  notifications: Notification[];
  markAsRead: (id: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, markAsRead }) => (
  <div>
    <h2>Notifications:</h2>
    <ul>
      {notifications.map(({ id, message, read }) => (
        <li key={id}>
          {message} {read ? '(Read)' : '(Unread)'}
          {!read && <button onClick={() => markAsRead(id)}>Mark as Read</button>}
        </li>
      ))}
    </ul>
  </div>
);

export default NotificationList;
