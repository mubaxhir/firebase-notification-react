import React from 'react';
import styles from './SendNotificationButton.module.css'; // Import CSS module

interface SendNotificationButtonProps {
  sendNotification: (message: string) => void;
}

const SendNotificationButton: React.FC<SendNotificationButtonProps> = ({ sendNotification }) => {
  const predefinedMessages = [
    'Notification 1: System Update',
    'Notification 2: New Feature Released',
    'Notification 3: Maintenance Alert'
  ];

  return (
    <div className={styles['send-notification-buttons']}>
      {predefinedMessages.map((message, index) => (
        <button
          key={index}
          className={styles['notification-button']}
          onClick={() => sendNotification(message)}
        >
          {message}
        </button>
      ))}
    </div>
  );
};

export default SendNotificationButton;
