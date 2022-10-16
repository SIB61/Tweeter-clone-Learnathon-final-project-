import { TimeagoClock } from 'ngx-timeago';
import { Observable, interval } from 'rxjs';

export class MyClock extends TimeagoClock {
  tick(_: number): Observable<number> {
    return interval(1*60*60*1000);
  }
}
