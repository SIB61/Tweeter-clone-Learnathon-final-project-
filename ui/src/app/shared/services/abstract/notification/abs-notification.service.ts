import { Injectable } from '@angular/core';
import { NotificationModel } from '@shared/models/notification.model';
import { NotificationService } from '@shared/services/concrete/notification/notification.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root',useClass:NotificationService })
export abstract class AbsNotificationService {
  newNotification$ : Observable<NotificationModel>
  notificationAlartCount$ : Observable<number>
  abstract resetNotificationAlartCount(): void
  abstract getNotifications(pageNumber:number,pageSize:number): Observable<NotificationModel[]>;
  abstract createConnection(): void
  abstract stopConnecton(): void
}
