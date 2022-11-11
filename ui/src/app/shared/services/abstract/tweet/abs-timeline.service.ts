import { Injectable } from '@angular/core';
import { TweetModel } from '@shared/models/tweet.model';
import { TimeLineService } from '@shared/services/concrete/tweet/timeline.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root',useClass:TimeLineService })
export abstract class AbsTimelineService {
  abstract getTimeline(pageNumber: number,pageSize: number): Observable<TweetModel[]>;
}
