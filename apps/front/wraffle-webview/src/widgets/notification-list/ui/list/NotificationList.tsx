'use client';

import {useHandleNotifications} from '../../hook';
import {NotificationItem} from '../item/NotificationItem';
import {InfiniteScroll} from '@/shared/ui';

export const NotificationList = () => {
  const {notificationData, hasNextNotification, onFetchNextNotifications} =
    useHandleNotifications({
      params: {itemsPerPage: 10},
    });
  return (
    <div className='flex flex-col divide-y divide-[#E0E0E0]'>
      <InfiniteScroll
        onEnd={onFetchNextNotifications}
        disabled={!hasNextNotification}
      >
        {notificationData.map(notification => (
          <NotificationItem
            id={notification.id}
            key={notification.id}
            title={notification.title}
            description={notification.content}
            date={notification.createdAt}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};
