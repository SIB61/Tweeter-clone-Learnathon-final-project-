import { Injectable } from '@angular/core';
import { NotificationModel } from '@shared/models/notification.model';
import { AbsNotificationService } from '@shared/services/abstract/notification/abs-notification.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class NotificationService implements AbsNotificationService {
  getNotifications(): Observable<NotificationModel[]> {
    return of([]);
  }
}
