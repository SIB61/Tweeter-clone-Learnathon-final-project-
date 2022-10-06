import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakPointService {
  breakpoint$: Observable<any>;
  constructor(breakPointObserver: BreakpointObserver) {
    this.breakpoint$ = breakPointObserver
      .observe([
        Breakpoints.Large,
        Breakpoints.Medium,
        Breakpoints.Small,
        Breakpoints.XSmall,
      ])
      .pipe(
        map((breakpoint) => {
          if (breakpoint.breakpoints[Breakpoints.Large])
            return Breakpoints.Large;
          else if (breakpoint.breakpoints[Breakpoints.Medium])
            return Breakpoints.Medium;
          else if (
            breakpoint.breakpoints[Breakpoints.Small] ||
            breakpoint.breakpoints[Breakpoints.XSmall]
          )
            return Breakpoints.Small;
          return Breakpoints.Large;
        })
      );
  }
}
