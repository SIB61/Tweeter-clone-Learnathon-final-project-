import { Injectable } from '@angular/core';
import { TweetModel } from '@shared/models/tweet.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class AbsTimelineService {
  abstract getTimeline(pageNumber: number): Observable<TweetModel[]>;
}
