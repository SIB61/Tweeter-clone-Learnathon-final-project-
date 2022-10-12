import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbsHttpService } from '@core/services/abstract/http/abs-http.service';
import { ApiEndpoints } from '@shared/enums/api-endpoint.enum';
import { TweetModel } from '@shared/models/tweet.model';
import { AbsTimelineService } from '@shared/services/abstract/tweet/abs-timeline.service';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimeLineService implements AbsTimelineService {
  constructor(private httpService: AbsHttpService) {}

  getTimeline(pageNumber: number): Observable<TweetModel[]> {
    return this.httpService
      .get(
        ApiEndpoints.TIMELINE,
        new HttpParams().append('PageNumber', pageNumber).append('PageSize', 5)
      )
      .pipe(
        map((value) => {
          console.warn(value);
          return value.data.map((val: any) => {
            return val;
          });
        })
      );
  }
}
