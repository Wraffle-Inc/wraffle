const NotificationTypeList = [
  'EVENT_EXPIRE',
  'EVENT_DONE',
  'AUTH_ALERT',
  'MARKETING',
] as const;

type NotificationType = (typeof NotificationTypeList)[number];

const TargetTypeList = ['RAFFLE', 'EVENT', 'PRODUCT'] as const;

type TargetType = (typeof TargetTypeList)[number];

const ScopeList = ['ALL', 'INDIVIDUAL'] as const;

type ScopeType = (typeof ScopeList)[number];

export interface Notification {
  id: number;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDeleted: boolean;
  isRead: boolean;
  userId: number;
  title: string;
  content: string;
  imageUrl: string;
  targetId: number;
  targetType: TargetType;
  type: NotificationType;
  scope: ScopeType;
}
