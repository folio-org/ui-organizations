import { organization } from './organization';

export const organizationAuditEvent = {
  id: '3635ff84-ede6-4786-95e7-00a4801115ba',
  action: 'Edit',
  organizationId: '6e5bb3d1-cba7-47a8-87c2-eb9f3b1598fc',
  userId: 'dd88964f-22f2-5579-898f-86920b2c1d71',
  eventDate: '2024-11-14T08:48:48.340+00:00',
  actionDate: '2024-11-14T08:48:48.335+00:00',
  organizationSnapshot: {
    map: { ...organization },
    empty: false,
  },
};
