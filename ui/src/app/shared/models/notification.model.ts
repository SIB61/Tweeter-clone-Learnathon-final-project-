export interface NotificationModel {
  userId: string;
  postId: string;
  fullName: string;
  notificationType: string;
}



export interface PNotification {
  pageNumber: number
  pageSize: number
  totalPages: number
  totalRecords: number
  data: UNotification[]
  succeeded: boolean
  errors: any
  message: any
}

export interface UNotification {
  id: string
  createdAt: string
  to: string
  from: string
  fullName: string
  postId?: string
  type: string
  isRead: boolean
}
