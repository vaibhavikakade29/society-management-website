export interface Notification {
  id: number;

  title: string;
  message: string;

  type: 'NOTICE' | 'EVENT' | 'MAINTENANCE' | 'COMPLAINT' | 'VISITOR' | 'REGISTRATION' | 'SYSTEM';

  senderRole: 'ADMIN' | 'RESIDENT';
  receiverRole: 'ADMIN' | 'RESIDENT' | 'ALL';

  userId?: number;

  createdAt: string;

  read: boolean;
}