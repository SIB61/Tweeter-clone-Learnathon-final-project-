import { Injectable } from '@angular/core';
import { NotificationModel } from '@shared/models/notification.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class AbsNotificationService {
  abstract getNotifications(): Observable<NotificationModel[]>;
}
