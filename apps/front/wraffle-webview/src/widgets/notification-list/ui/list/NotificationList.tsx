'use client';

import {useHandleNotifications} from '../../hook';
import {NotificationItem} from '../item/NotificationItem';

export const NotificationList = () => {
  const {notificationData} = useHandleNotifications({params: {}});
  return (
    <div className='flex flex-col divide-y divide-[#E0E0E0]'>
      {notificationData.map(notification => (
        <NotificationItem
          id={notification.id}
          key={notification.id}
          title={notification.title}
          description={notification.content}
          date={notification.createdAt}
        />
      ))}
    </div>
  );
};
