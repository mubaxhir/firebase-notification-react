import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase-config';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import NotificationList from './components/NotificationList';
import SendNotificationButton from './components/SendNotificationButton';

interface Notification {
  id: string;
  message: string;
  read: boolean;
}

const App: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'notifications'));
      const notificationsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Notification[];
      setNotifications(notificationsList);
    } catch (error) {
      console.error("Error fetching notifications: ", error);
    }
    setLoading(false);
  };

  const sendNotification = async (message: string) => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, 'notifications', user.uid), { message, read: false }, { merge: true });
        fetchNotifications();
      } else {
        console.warn('User not signed in');
      }
    } catch (error) {
      console.error("Error sending notification: ", error);
    }
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    try {
      await setDoc(doc(db, 'notifications', id), { read: true }, { merge: true });
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read: ", error);
    }
  };

  useEffect(() => {
    signInAnonymously(auth)
      .then(() => {
        console.log('User signed in anonymously');
        fetchNotifications();
      })
      .catch(error => console.error('Error signing in anonymously: ', error));
  }, []);

  return (
    <div>
      <h1>Notification System</h1>
      <SendNotificationButton sendNotification={sendNotification} />
      {loading && <p>Loading...</p>}
      <NotificationList notifications={notifications} markAsRead={markAsRead} />
    </div>
  );
};

export default App;
