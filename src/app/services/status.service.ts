import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { EMPTY, fromEvent, interval, merge, Subject } from 'rxjs';
import { debounceTime, filter, map, mapTo, startWith, switchMap, tap } from 'rxjs/operators';
import { BASE_URL } from '../app.config';
import { ConfigurationInterface } from 'interfaces';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  // collapsed flag
  isCollapsed = false;
  // loading flag
  isLoading = false;
  // flink configuration
  configuration: ConfigurationInterface;
  // refresh stream
  refresh$ = new Subject<boolean>().asObservable();
  // manual refresh stream
  private manual$ = new Subject<boolean>();
  // only refresh when visibility
  private focus$ = fromEvent(window, 'visibilitychange').pipe(map(e => !(e.target as Document).hidden));

  manualRefresh() {
    this.manual$.next(true);
  }

  /** init flink config before booting **/
  boot(router: Router): Promise<ConfigurationInterface> {
    this.isLoading = true;
    return this.httpClient.get<ConfigurationInterface>(`${BASE_URL}/config`).pipe(tap((data) => {
      this.configuration = data;
      const navigationEnd$ = router.events.pipe(filter(item => (item instanceof NavigationEnd)), mapTo(true));
      const interval$ = interval(this.configuration[ 'refresh-interval' ]).pipe(mapTo(true), startWith(true));
      this.refresh$ = merge(this.focus$, this.manual$, navigationEnd$).pipe(
        startWith(true),
        debounceTime(300),
        switchMap(active => active ? interval$ : EMPTY)
      );
      this.isLoading = false;
    })).toPromise();
  }

  constructor(private httpClient: HttpClient) {
  }
}
