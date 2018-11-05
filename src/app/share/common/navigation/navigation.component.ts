import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector   : 'flink-navigation',
  templateUrl: './navigation.component.html',
  styleUrls  : [ './navigation.component.less' ]
})
export class NavigationComponent implements OnInit, OnDestroy {
  @Input() listOfNavigation: Array<{ path: string, title: string }> = [];
  navIndex = 0;
  destroy$ = new Subject();

  navigateTo(path) {
    this.router.navigate([ path ], { relativeTo: this.activatedRoute }).then();
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.firstChild.data.pipe(
      takeUntil(this.destroy$),
      map((data) => data.path)
    ).subscribe(data => {
      this.navIndex = this.listOfNavigation.map(nav => nav.path).indexOf(data);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
